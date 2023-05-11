<script lang="ts">
  import {
    appendEl,
    chains,
    dragValues,
    insertElAt,
  } from "$lib/stores/dragstate";
  import Chain from "./chain.svelte";

  const chainDebounce = (ms) => {
    let t: number;
    return {
      run: (fn: () => void) =>
        (t = setTimeout(() => {
          fn();
        }, ms)),
      clear: () => clearTimeout(t),
    };
  };

  const cd0 = chainDebounce(100);

  function dragStart(e: CustomEvent<{ cidx: number; midx: number }>) {
    const { cidx, midx } = e.detail;
    dragValues.update((s) => ({
      ...s,
      dragging: true,
      start: { cidx, midx },
      drag: { cidx, midx },
    }));
    chains.update((s) => {
      const v = s[cidx].modules[midx];
      s[cidx].modules[midx] = { ...v, active: true };
      return s;
    });
  }

  async function dragEnter(e: CustomEvent<{ cidx: number; midx: number }>) {
    if (!$dragValues.dragging) return;

    const { cidx, midx } = e.detail;
    cd0.clear();
    if (e.detail.chain) {
      cd0.run(() => {
        appendEl(cidx);
      });
      return;
    }
    insertElAt(cidx, midx);
  }

  function dragEnd() {
    cd0.clear();
    $dragValues.dragging = false;
    chains.update((s) => {
      const v = s[$dragValues.drag.cidx].modules[$dragValues.drag.midx];
      s[$dragValues.drag.cidx].modules[$dragValues.drag.midx] = {
        ...v,
        active: false,
      };
      return s;
    });
  }
</script>

<svelte:window on:pointerup={dragEnd} />

<pre>
dragging: {$dragValues.dragging}
start - cidx: {$dragValues.start.cidx} cidx: {$dragValues.start.midx}
drag - cidx: {$dragValues.drag.cidx} cidx: {$dragValues.drag.midx}
enter - cidx: {$dragValues.enter.cidx} cidx: {$dragValues.enter.midx}
</pre>

<div class:grabbing={$dragValues.dragging}>
  {#each $chains as chain, i}
    <Chain
      modules={chain.modules}
      idx={i}
      on:dragstart={dragStart}
      on:dragenter={dragEnter}
    />
  {/each}
</div>

<style>
  .grabbing {
    cursor: grabbing;
  }
  div {
    display: flex;
    gap: 2px;
  }
</style>
