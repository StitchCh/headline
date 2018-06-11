<template>
<div class="media-preview flex">
  <div class="left-btn flex-center">
    <icon-btn small>keyboard_arrow_left</icon-btn>
  </div>
  <div class="mp-left">
    <slot></slot>
  </div>
  <div class="mp-right"></div>
  <div class="right-btn flex-center">
    <icon-btn small>keyboard_arrow_right</icon-btn>
  </div>
</div>
</template>

<script>
export default {
  name: 'media-preview'
}
</script>

<style lang="less">
.media-preview{
  height: 300px;background: #666;padding: 20px 0;
  .mp-left{flex: 1}
  .mp-right{flex: 2}
}
</style>
