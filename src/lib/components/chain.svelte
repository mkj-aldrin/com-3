<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fly, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { createEventDispatcher } from "svelte";
  import Module from "./module.svelte";
  import ModuleMenu from "./ModuleMenu.svelte";

  export let idx: number;
  export let modules: { type: string; id: number }[] = [];

  const dragDispatcher = createEventDispatcher();

  function dragstart(e: CustomEvent<{}>) {
    dragDispatcher("dragstart", {
      ...e.detail,
      cidx: idx,
    });
  }

  function dragEnter(e: CustomEvent<{}>) {
    dragDispatcher("dragenter", {
      ...e.detail,
      cidx: idx,
    });
  }
  function chainEnter(e: PointerEvent) {
    dragDispatcher("dragenter", {
      chain: true,
      cidx: idx,
    });
  }
  function noop() {}
</script>

<div class="chain" on:pointerenter={chainEnter}>
  {#each modules as module, i (module.id)}
    <div
      animate:flip={{ duration: 100, easing: quintOut }}
      in:scale={{ duration: 200, start: 0.75, easing: quintOut }}
      out:noop={{}}
    >
      <Module
        {module}
        idx={i}
        on:dragstart={dragstart}
        on:dragenter={dragEnter}
      />
      <ModuleMenu />
    </div>
  {/each}
</div>

<style>
  .chain {
    padding: 2px;
    border: 1px black solid;
  }

  .chain {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 2px;
  }
</style>
