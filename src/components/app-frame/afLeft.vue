<template>
<div class="af-left">
  af-left
</div>
</template>

<script>
export default {
  name: 'af-left',
  props: {
    color: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 200
    },
    title: {
      type: String,
      default: 'CCPT'
    }
  }
}
</script>

<style lang="less">
.af-left{width: 200px;border-right: 1px solid rgba(0, 0, 0, .1);background: #e2f1fa;
  //
}
</style>
