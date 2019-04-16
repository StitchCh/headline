<template>
  <li class="navigator-item-group">
    <div @click="handleClick" class="relative">
      <navigator-item slot="title" :icon="icon">
        <slot name="title"></slot>
      </navigator-item>
      <i class="c-rgb-5 icon" :class="{ rotate: extended }" style="transition: all 0.3s;position: absolute;right: 10px;top: 13px;">keyboard_arrow_down</i>
    </div>
    <transition name="collapse-y">
      <ul v-if="extended" :style="{ height, overflow: 'hidden' }">
        <slot></slot>
      </ul>
    </transition>
  </li>
</template>

<script>
  export default {
    name: 'navigator-item-group',
    props: {
      icon: String,
      defaultExtended: Boolean
    },
    data () {
      return {
        height: '',
        extended: false
      }
    },
    methods: {
      handleClick () {
        console.log('group')
        this.extended = !this.extended
        this.$emit('click')
      }
    },
    created () {
      if (this.defaultExtended) this.extended = this.defaultExtended
      let slots = this.$slots.default.filter(v => {
        return v.tag
      })
      this.height = `${ slots.length * 45 }px`
    }
  }
</script>

<style lang="less">
.navigator-item-group {box-sizing: border-box;cursor: pointer;
  .icon{font-size: 20px;margin-right: 15px;transition: all .2s}
  .rotate {transform: rotate(180deg)}

  .collapse-y-enter-active, .collapse-y-leave-active {
    transition: height .3s;
  }
  .collapse-y-enter, .collapse-y-leave-to {
    height: 0!important;
  }
  ul .navigator-item{padding-left: 40px;}
}
</style>
