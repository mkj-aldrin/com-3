<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const modules = [
    { name: "PTH" },
    { name: "LFO" },
    { name: "PRO" },
    { name: "BCH" },
  ];

  const dragDispatcher = createEventDispatcher();

  function dragStart(e: PointerEvent, name:string) {
    dragDispatcher("dragstart", {
      type: name,
      newEl: true,
      copy: true,
    });
  }
</script>

<menu>
  <ul>
    {#each modules as { name }, i}
      <li on:pointerdown={(e) => dragStart(e, name)}>
        <span>{name}</span>
      </li>
    {/each}
  </ul>
</menu>

<style>
  menu {
    position: fixed;
    padding: 8px;

    border-radius: 2px;
    border: 1px black solid;
    background-color: white;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  ul li {
    padding: 2px;
    border-radius: 2px;
    border: 1px black solid;
  }
</style>
