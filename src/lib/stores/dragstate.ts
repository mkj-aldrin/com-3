import { get, writable } from "svelte/store";
export const dragValues = writable<{
  dragging: boolean;
  start: {
    cidx: null | number;
    midx: null | number;
  };
  drag: {
    cidx: null | number;
    midx: null | number;
  };
  enter: {
    cidx: null | number;
    midx: null | number;
  };
}>({
  dragging: false,
  start: {
    cidx: null,
    midx: null,
  },
  drag: {
    cidx: null,
    midx: null,
  },
  enter: {
    cidx: null,
    midx: null,
  },
});

export function insertElAt(cidx: number, midx: number) {
  const state = get(dragValues);
  chains.update((s) => {
    const dragEl = s[state.drag.cidx as number].modules.splice(
      state.drag.midx as number,
      1
    )[0];
    s[cidx].modules.splice(midx, 0, dragEl);
    dragValues.update((v) => ({ ...v, drag: { cidx, midx } }));
    return s;
  });
}

export function appendEl(cidx: number) {
  const state = get(dragValues);
  chains.update((s) => {
    const dragEl = s[state.drag.cidx].modules.splice(state.drag.midx, 1)[0];
    s[cidx].modules.push(dragEl);
    dragValues.update((v) => ({
      ...v,
      drag: { cidx, midx: s[cidx].modules.length - 1 },
    }));
    return s;
  });
}

let uid = 0;

export const chains = writable<{ modules: { type: string; id: number }[] }[]>([
  {
    modules: [
      { type: "PTH", id: uid++ },
      { type: "LFO", id: uid++ },
      { type: "PRO", id: uid++ },
    ],
  },
  {
    modules: [
      { type: "LFO", id: uid++ },
      { type: "BCH", id: uid++ },
    ],
  },
]);
