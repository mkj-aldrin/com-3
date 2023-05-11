<script lang="ts">
  import { dragValues } from "$lib/stores/dragstate";
  import { createEventDispatcher } from "svelte";
  export let module: { type: string };
  export let idx: number;
  export let parameters: { value: number; name: string }[] = [
    { value: 0.1, name: "chance" },
    { value: 0.5, name: "amp" },
  ];

  const dragDispatcher = createEventDispatcher();

  function dragStart(e: PointerEvent) {
    if (e.target.tagName == "INPUT") return;
    dragDispatcher("dragstart", {
      midx: idx,
    });
  }

  function dragEnter() {
    dragDispatcher("dragenter", {
      midx: idx,
    });
  }
</script>

<div
  class="module"
  class:active={module.active}
  on:pointerdown={dragStart}
  on:pointerenter={dragEnter}
  class:grabbing={$dragValues.dragging}
>
  <span>{module.type}</span>
  <ul class="parameters">
    {#each parameters as { value, name }}
      <label>
        <span>{name}</span> :
        <input type="text" bind:value />
      </label>
    {/each}
  </ul>
</div>

<style>
  .grabbing * {
    cursor: grabbing;
  }

  .active {
    color: orange;
  }

  .module {
    position: relative;
    background-color: white;

    user-select: none;
    cursor: grab;

    padding: 2px;
    border: 1px currentColor solid;
    border-radius: 2px;
  }

  .parameters {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .parameters label {
    display: flex;
  }
  .parameters input {
    margin-inline-start: auto;
    width: 3ch;
    text-align: center;
    border: none;
    border-bottom-style: dashed;
    border-bottom-width: 1px;
  }
</style>
