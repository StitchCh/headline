<template>
  <li class="select-card-option f-16" @click="$emit('click')">
    <div class="flex-v-center">
      <slot></slot>
      <div class="flex-item"></div>
      <i v-if="check" class="icon">check</i>
    </div>
  </li>
</template>

<script>
export default {
  name: 'select-card-option',
  props: {
    value: [Number, String]
  },
  computed: {
    check () {
      if (this.$parent.$parent.multiple) {
        return this.$parent.$parent.value.some(v => {
          return v === this.value
        })
      } else {
        return this.$parent.$parent.value === this.value
      }
    }
  }
}
</script>

<style lang="less">
  .select-card-option {padding-left: 20px;cursor: pointer;transition: background .2s;
    >div {padding: 12px 20px 12px 0;border-bottom: 1px solid #e1e1e1;line-height: 25px;}
    &:last-child>div{border-bottom: 0;}
    .icon{font-size: 20px;color: #008cff;}
    &:active {background: #e1e1e1;}
  }
</style>
