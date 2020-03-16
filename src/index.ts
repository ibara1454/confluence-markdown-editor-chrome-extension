import editor from '@/pages/editor/index.html';
import path from 'path';
import config from 'config';
import Vue from 'vue';
import escape from 'lodash.escape';
import { Message, EditorState } from './model/types';
import { sendMessage } from './utils/extension';

// Id of toolbar
const toolbarId = 'toolbar';
// Id of iframe of Inner document
const iframeId = 'wysiwygTextarea_ifr';
// Class name of html-macro
const htmlMacro = 'wysiwyg-macro';

const state: EditorState = {
  text: '',
  style: '',
};

const styleScript = `
<script>
const main = document.getElementById('main-content');
const text = main.firstElementChild.innerText;
const iframe = document.createElement('iframe');
main.innerHTML = '';
main.appendChild(iframe);

const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/marked/0.8.0/marked.min.js";
document.body.appendChild(script);

script.onload = () => {
  iframe.contentDocument.body.innerHTML = marked(text);
  iframe.contentDocument.body.style = 'margin: 0; overflow-y: hidden;';
  iframe.style = 'width: 100%; border: 0;';
  iframe.style.height = iframe.contentDocument.body.offsetHeight + 'px';
};

</script>
`;

const template = `
<pre>{{ text }}</pre>
<table class="wysiwyg-macro" data-macro-name="html" data-macro-schema-version="1" style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;locale=ja_JP&amp;version=2); background-repeat: no-repeat;" data-macro-body-type="PLAIN_TEXT" data-mce-selected="1">
  <tbody>
    <tr>
      <td class="wysiwyg-macro-body">
        <pre>${escape(styleScript.trim())}</pre>
      </td>
    </tr>
  </tbody>
</table>
`;

/**
 * Setup markdown editor.
 */
function setupMarkdownEditor(): void {
  // Find the iframe of editor
  const rte = document.getElementById('rte');
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  const innerDocument = iframe?.contentDocument;
  const toolbar = document.getElementById(toolbarId);
  if (rte && innerDocument && toolbar) {
    // Remove toolbar
    toolbar.remove();
    // // Hide html macro element and other empty elements
    // hideByClass(innerDocument, htmlMacro);

    // Change the position of parent be difference from static, so that
    // the child with style `position: absolute` could works fine.
    rte.style.position = 'relative';
    const editorWrapper = document.createElement('iframe');
    editorWrapper.src = chrome.runtime.getURL(path.resolve(config.output, editor));
    editorWrapper.style.position = 'absolute';
    editorWrapper.style.top = '60px';
    editorWrapper.style.bottom = '0';
    editorWrapper.style.left = '0';
    editorWrapper.style.right = '0';
    editorWrapper.style.height = 'calc(100% - 60px)';
    rte.appendChild(editorWrapper);
    editorWrapper.focus();
  }
}

function getTextFieldValue(): string | undefined {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  const innerDocument = iframe?.contentDocument;
  const body = innerDocument?.body;
  const child = body?.firstElementChild as HTMLElement | null | undefined;
  if (child) {
    const tagName = child.tagName;
    if (tagName === 'PRE') {
      return child.innerText;
    }
  }
  return undefined;
}

function setupTextField(): void {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  const innerDocument = iframe?.contentDocument;
  if (innerDocument) {
    const body = innerDocument.body;
    const text = getTextFieldValue();
    if (text) {
      state.text = text;
    }
    // replace all child nodes with template
    // see https://stackoverflow.com/a/3955238
    body.innerHTML = template;

    const vue = new Vue({
      data: state,

      watch: {
        text(val: string): void {
          const message: Message = {
            event: 'ContentChanged',
            payload: { text: this.text },
          };
          sendMessage(message);
        },
      },
    });
    vue.$mount(body);
  }
}

/**
 * Setup application.
 */
function setup(): void {
  // TODO: enable markdown editor in a better way
  // TODO: (feat) auto enable markdown editor
  const enabled = window.confirm('Enable markdown editor?');
  if (enabled) {
    setupTextField();
    setupMarkdownEditor();
  }
}

/**
 * Check the given url is whether our target page or not.
 * @param url any url
 * @returns the given url is our target or not
 */
function isTargetPage(url: string): boolean {
  // The url pattern of editpage
  const EDITPAGE_PATTERN = /editpage\.action\?pageId=\d+$/;
  // The url pattern of createpage
  const CREATEPAGE_PATTERN = /createpage\.action/;
  // Determine the given url whether it is "editpage" or "createpage"
  return [EDITPAGE_PATTERN, CREATEPAGE_PATTERN].some((pattern) => pattern.exec(url));
}

/**
 * The entrypoint.
 *
 * Verify current url is whether an edit page (or created page), and
 * then setup the markdown editor.
 */
function main(): void {
  // TODO: evaluate current page whether it should be applied
  // Listen messages sent from from background
  chrome.runtime.onMessage.addListener((message: Message) => {
    if (message.event === 'PageChanged') {
      console.log('event:page changed');
      // Run setup if current page is editpage
      if (isTargetPage(window.location.href)) {
        setup();
      }
    } else if (message.event === 'ContentChanged') {
      const text = message.payload.text;
      state.text = text;
    } else if (message.event === 'EditorInit') {
        sendMessage({
          event: 'EditorInit',
          payload: { text: state.text },
        });
    }

    return true;
  });

  if (isTargetPage(window.location.href)) {
    setup();
  }
}

main();
