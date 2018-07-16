<template>
  <li class="btn-group-item flex-item" :style="{ color, 'border-left-color': color }">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'btn-group-item',
  computed: {
    color () {
      return this.$parent.color
    }
  }
}
</script>

<style lang="less">
.btn-group-item {padding: 5px 15px;
 &+.btn-group-item {border-left: 1px solid;}
}
</style>
