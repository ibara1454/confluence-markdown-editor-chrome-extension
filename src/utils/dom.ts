export function applyDisplayNone(element: HTMLElement): void {
  // eslint-disable-next-line no-param-reassign
  element.style.display = 'none';
}

export function hideById(doc: Document, id: string): void {
  const element = doc.getElementById(id);
  if (element) {
    applyDisplayNone(element);
  }
}

export function hideByClass(doc: Document, className: string): void {
  const elements = Array.prototype.slice.call(
    doc.getElementsByClassName(className),
  );
  elements.forEach(applyDisplayNone);
}

/**
 * Check that whether the given DOM element's child nodes is same as given pattern
 * or not.
 * @param element the DOM element you want to check
 * @param pattern the desired document structure described by flat array
 */
export function checkDomStructure(element: Element, pattern: string[]): boolean {
  function compare<T>(lhs: T[], rhs: T[]): boolean {
    if (lhs.length !== rhs.length) {
      return false;
    }
    // Check the equality for each element
    for (let i = 0; i < lhs.length; i += 1) {
      if (lhs[i] !== rhs[i]) {
        return false;
      }
    }
    return true;
  }

  // String array of child nodes
  const children = [...element.children].map((e) => e.tagName);

  return compare(
    children.map((s) => s.toLowerCase()),
    pattern.map((s) => s.toLowerCase()),
  );
  // const pattern2 = [
  //   'pre',
  //   'table',
  //   'p',
  // ];
}
