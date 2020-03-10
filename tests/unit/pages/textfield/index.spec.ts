import expect from 'expect';
import { JSDOM } from 'jsdom';
import main from '@/pages/textfield/index';

// Generate dummy DOM tree
const factory = (): Document => {
  // JSDOM options
  // Let JSDOM loading subresources
  // https://github.com/jsdom/jsdom/tree/b4b5a542380316a0d7296f7f41a5909bf5e097db#basic-options
  const options = { url: 'https://localhost', resources: 'usable' as 'usable' };
  const html = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>title</title>
    </head>
    <body id="com-atlassian-confluence">
      <div id="page">
        <div id="full-height-container">
          <div class="ia-splitter">
            <div id="main">
              <div id="content">
                <div id="main-content">
                  <!-- CONTENT DOM -->
                  <pre>
                    # H1
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`, options);

  return html.window.document;
};

describe('textfield / index', () => {
  it('replaced "#main-content" element by iframe', () => {
    const doc = factory();
    main(doc);
    // Ensure the origin 'main-content' element is replaced by iframe
    expect(doc.getElementById('main-content')).toBeNull();
    expect(doc.getElementById('content')?.childElementCount).toBe(1);
    expect(doc.getElementById('content')?.firstElementChild).toBeInstanceOf(HTMLIFrameElement);
  });
});
