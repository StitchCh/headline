<template>
  <ul class="btn-group flex" :style="{ 'border-color': color }">
    <slot :color="color"></slot>
  </ul>
</template>

<script>
export default {
  name: 'btn-group',
  props: {
    color: {
      type: String,
      default: '#008cff'
    }
  }
}
</script>

<style lang="less">
.btn-group {
  border: 1px solid;border-radius: 16px;
}
</style>
