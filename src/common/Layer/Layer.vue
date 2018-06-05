<template>
<transition name="fade" mode="out-in">
<div class="layer" :class="{'layer-side': side, 'layer-transparent': transparent}">
  <div class="layer-mask" v-if="maskClick" @click="$emit('close')"></div>
  <div class="layer-ctn" :style="{ width }">
    <div v-if="title" class="layer-title">{{title}}</div>
    <slot v-else name="title"/>
    <slot/>
    <slot name="footer"/>
  </div>
</div>
</transition>
</template>

<script>
import './layer.css'

export default {
  name: 'layer',
  props: {
    title: {type: String, default: ''},
    width: { default: 'auto' },
    maskClick: Boolean,
    side: Boolean,
    transparent: Boolean
  },
  mounted () {
    // document.body.appendChild(this.$el)
  }
}
</script>

<style>
</style>
