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
  const child = doc.body?.firstElementChild;
  if (child && child.tagName === 'PRE') {
    const text = (child as HTMLElement).innerText;
    return {
      text,
      style: '',
    };
  }
  return undefined;
}
