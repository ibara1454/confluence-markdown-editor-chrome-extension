/**
 * This interface indicates contents inside a confluence page.
 */
interface ConfluencePage {
  /**
   * The main field which contains the markdown text.
   */
  text: string;

  /**
   * Raw string of customized style for parsed markdown.
   */
  style: string;
}

export default ConfluencePage;

/**
 * Parse the given doc and convert it into ConfluencePage.
 * @param doc a Document.
 * @returns ConfluencePage or undefined if any error occured.
 */
export function parseConfluencePage(doc: Document): ConfluencePage | undefined {
  // Get contents from Confluence's html-macro
  const macro = doc.querySelector('.wysiwyg-macro-body > pre');

  if (macro && macro.textContent) {
    const domparser = new DOMParser();
    // Parse the text in macro by DOMParser
    const template = domparser.parseFromString(macro.textContent, 'text/html');

    const textDom = template.querySelector('#confluence-markdown-editor-markdown-text');
    const styleDom = template.querySelector('#confluence-markdown-editor-markdown-style');

    return {
      text: textDom?.textContent || '',
      style: styleDom?.textContent || '',
    };
  }
  return undefined;
}
