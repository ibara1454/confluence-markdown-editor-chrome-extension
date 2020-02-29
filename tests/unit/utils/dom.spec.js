import expect from 'expect';
import { JSDOM } from 'jsdom';

// Generate dummy DOM tree
const factory = () => {
  // JSDOM options
  // Let JSDOM loading subresources
  // https://github.com/jsdom/jsdom/tree/b4b5a542380316a0d7296f7f41a5909bf5e097db#basic-options
  const options = { url: 'https://localhost', resources: 'usable' };
  const innerDataURI = window.btoa(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>title</title>
    </head>
    <body id="tinymce">
      <!-- TEXT CONTENT HERE -->
    </body>
  </html>`); // CiAgPCFET0NUWVBFIGh0bWw+CiAgPGh0bWw+CiAgICA8aGVhZD4KICAgICAgPG1ldGEgY2hhcnNldD0iVVRGLTgiPgogICAgICA8dGl0bGU+dGl0bGU8L3RpdGxlPgogICAgPC9oZWFkPgogICAgPGJvZHkgaWQ9InRpbnltY2UiPgogICAgICA8IS0tIFRFWFQgQ09OVEVOVCBIRVJFIC0tPgogICAgPC9ib2R5PgogIDwvaHRtbD4=

  const outer = new JSDOM(`
  <html>
  <head>
  </head>
  <body>
    <div id="page">
      <div id="full-height-container">
        <div id="main">
          <div id="content">
            <form id="editpageform">
              <div id="toolbar"></div>
              <div id="wysiwyg">
                <div id="rte">
                  <textarea id="wysiwygTextarea"></textarea>
                  <iframe id="wysiwygTextarea_ifr" src="data:text/html;base64,${innerDataURI}"></iframe>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`, options);
  return outer.window.document;
};

describe('DOM', () => {
  it('Dummy test', (done) => {
    const html = factory();
    const iframe = html.getElementById('wysiwygTextarea_ifr');

    iframe.onload = () => {
      const doc = iframe.contentDocument;
      expect(doc.body).not.toBeNull();
      done();
    }
  });
});
