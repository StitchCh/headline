<template>
<div class="layer confirm" :class="[className]">
  <div class="layer-ctn" :style="{ width }">
    <div class="layer-title" v-text="title"></div>
    <div class="layer-text" v-html="text.replace(/\n/g, '<br>')"></div>
    <div class="layer-btns">
      <btn flat @click="no">{{btns[0]}}</btn>
      <btn flat @click="yes" :style="{color}">{{btns[1]}}</btn>
    </div>
  </div>
</div>
</template>

<script>
import '../Layer/layer.css'

export default {
  name: 'confirm',
  created () {
    this.className = 'layer-in'
  },
  mounted () {
    setTimeout(() => {
      this.className = 'layer-on'
    }, 16)
  }
}
</script>

<style>
.confirm .layer-ctn{max-width: 400px;}
</style>
