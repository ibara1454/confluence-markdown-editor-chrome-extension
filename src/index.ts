import Vue from 'vue';
import Editor from '@/pages/editor/App.vue';
import escape from 'lodash.escape';

// Id of iframe of Inner document
const iframeId = 'wysiwygTextarea_ifr';

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

function applyStyle(): void {
  const style = document.createElement('style');
  // Change the position of parent be difference from static, so that
  // the child with style `position: absolute` could works fine.
  style.innerText = `
  #rte {
    position: relative !important;
  }

  #confluence-markdown-editor {
    position: absolute !important;
    top: 80px !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: calc(100% - 90px) !important;
    border: 0 !important;
    margin: 0 !important;
  }

  #toolbar {
    display: block !important;
    height: 0 !important;
    overflow-x: hidden !important;
  }
  `;
  document.body.appendChild(style);
}

/**
 * Setup markdown editor.
 */
function setupMarkdownEditor(): void {
  // Find the iframe of editor
  const rte = document.getElementById('rte');
  if (rte) {
    const editorWrapper = document.createElement('div');
    rte.appendChild(editorWrapper);
    const vue = new Vue({
      render(h) {
        return h(Editor, {
          props: {
            text: state.text,
          },
          on: {
            // eslint-disable-next-line func-names
            'update:text': (value: string) => { state.text = value; },
          },
        });
      },
    });
    vue.$mount(editorWrapper);
  }
}

/**
 * Return the content of first element `<pre></pre>` of given document' body.
 * @param doc a Document.
 * @returns inner text of first element `<pre></pre>`.
 */
function getTextFieldValue(doc: Document): string | undefined {
  const child = doc.body?.firstElementChild;
  if (child && child.tagName === 'PRE') {
    return (child as HTMLElement).innerText;
  }
  return undefined;
}

function setupTextField(): void {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  const innerDocument = iframe?.contentDocument;
  if (innerDocument) {
    const body = innerDocument.body;
    const text = getTextFieldValue(innerDocument);
    if (text) {
      state.text = text;
    }
    // replace all child nodes with template
    // see https://stackoverflow.com/a/3955238
    body.innerHTML = template;

    const vue = new Vue({
      data: state,
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
    applyStyle();
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
  chrome.runtime.onMessage.addListener(() => {
    // Run setup if current page is editpage
    if (isTargetPage(window.location.href)) {
      setup();
    }
    return true;
  });

  if (isTargetPage(window.location.href)) {
    setup();
  }
}

main();
