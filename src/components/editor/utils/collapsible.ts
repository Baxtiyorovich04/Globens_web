export function setDomHiddenUntilFound(dom: HTMLElement): void {
  // @ts-expect-error
  dom.hidden = "until-found"
}

export function domOnBeforeMatch(dom: HTMLElement, callback: () => void): void {
  // @ts-ignore
  dom.onbeforematch = callback
}
