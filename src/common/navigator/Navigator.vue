<template>
  <div :class="['navigator-box', { 'border-left': align === 'right' }, { 'border-right': align === 'left' }]">
    <div class="navigator-title" :style="{'background-color': themeColor}">
      <slot name="title"></slot>
    </div>

    <ul>
      <li>123</li>
      <li>123</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'navigator',
    props: {
      align: {
        type: String,
        default: 'left'
      },
      themeColor: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less">
.border-left {border-left: 1px solid #e1e1e1;}
.border-right {border-right: 1px solid #e1e1e1;}
.navigator-box {width: 300px;height: 100%;display: inline-block;background: #fff;
  .navigator-title {height: 60px;border-bottom: 1px solid #e1e1e1;background: #f5f5f5;display: flex;padding-left: 20px;}
}
</style>
