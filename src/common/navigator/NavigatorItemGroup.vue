<template>
  <li class="navigator-item-group">
    <div @click="handleClick" class="relative">
      <i class="icon" v-if="icon">{{icon}}</i>
      <slot name="title"></slot>
      <i class="c-rgb-5 icon" :class="{ rotate: extended }" style="transition: all 0.3s;position: absolute;right: 10px;top: 13px;">keyboard_arrow_down</i>
    </div>
    <transition name="collapse">
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
  .icon{font-size: 20px;margin-right: 15px;}
  .rotate {transform: rotate(180deg)}

  .collapse-enter-active, .collapse-leave-active {
    transition: height .3s;
  }
  .collapse-enter, .collapse-leave-to {
    height: 0!important;
  }
  ul .navigator-item{padding-left: 40px;}
}
</style>
