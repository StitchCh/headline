<template>
  <li class="navigator-item relative flex-v-center" :class="{ active: isActive }" @click="handleClick">
    <i class="icon" v-if="icon">{{icon}}</i>
    <span :class="[ 'status',  status ]" v-if="status"></span>
    <slot></slot>
    <span class="number" v-if="number !== undefined">{{number}}</span>
  </li>
</template>

<script>
  export default {
    name: 'navigator-item',
    props: {
      index: String,
      icon: String,
      status: String,
      number: Number,
    },
    computed: {
      rootMenu () {
        let parent = this.$parent
        while (parent.$options.name !== 'af-left') {
          parent = parent.$parent
        }
        return parent
      },
      isActive () {
        return this.rootMenu.activeIndex === this.index
      }
    },
    methods: {
      handleClick () {
        if (this.index !== undefined) {
          this.rootMenu.setActiveIndex(this.index)
        }
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">
.navigator-item {height: 45px;border-bottom: 1px solid rgba(0, 0, 0, .05);box-sizing: border-box;padding: 10px 20px;cursor: pointer;transition: all .2s;
  &:hover {background: rgba(255, 255, 255, .5);}
  &.active {color: #549FFF;background: rgba(0, 0, 0, .06);}
  .icon {font-size: 20px;margin-right: 15px;transition: all .2s}
  .status {display: inline-block;width: 10px;height: 10px;border-radius: 5px;margin-right: 15px;}
  .number {position: absolute;right: 10px;padding: 4px 10px;background: #549FFF; border-radius: 12px;font-size: 12px;color: #fff;line-height: 1em;}
  .done {background: #4ab36b;}
  .warning {background: #f89972;}
  .error {background: #d74947;}
  .disabled {background: #b8a59a;}
}
</style>
