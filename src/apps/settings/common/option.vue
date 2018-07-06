<template>
  <li class="setting-option f-16">
    <div class="flex-v-center">
      <slot></slot>
      <div class="flex-item"></div>
      <i v-if="check" class="icon">check</i>
    </div>
  </li>
</template>

<script>
export default {
  name: 'setting-option',
  props: {
    check: Boolean
  }
}
</script>

<style lang="less">
  .setting-option {padding-left: 20px;cursor: pointer;transition: background .2s;
    >div {padding: 12px 20px 12px 0;border-bottom: 1px solid #e1e1e1;line-height: 25px;}
    &:last-child>div{border-bottom: 0;}
    .icon{font-size: 20px;color: #008cff;}
    &:active {background: #e1e1e1;}
  }
</style>
