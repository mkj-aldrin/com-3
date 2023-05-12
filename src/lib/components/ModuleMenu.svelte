<script lang="ts">
  function downHandler(e: PointerEvent) {
    console.log("down choose");
  }
</script>

<div on:pointerdown={downHandler}>chooce</div>

<style>
  div {
    background-color: orange;
  }
</style>
