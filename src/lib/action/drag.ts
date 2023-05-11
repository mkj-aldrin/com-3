export function dragEmit(node: HTMLElement, opt: {}) {
  node.addEventListener("pointerdown", (e) => {
    node.dispatchEvent(
      new CustomEvent("dndstart", {
        bubbles: true,
        detail: {},
      })
    );
  });
}
export function dragRoot(node: HTMLElement, opt: {}) {
  node.addEventListener("dndstart", (e) => {
    console.log(e.target);
  });
}
