<template>
<div class="lang-switch relative f-14 a">
  <div class="flex-v-center" @click="bubbleShow=true">
    <i class="icon f-18">language</i>
    <span>切换语言</span>
  </div>
  <bubble v-if="bubbleShow" class="c-6" pos="bottom" align="end" @close="bubbleShow=false">
    <ul>
      <li class="flex-v-center">
        <span class="f-18 lan-ico">🇨🇳</span>
        <span class="flex-item">中文</span>
      </li>
      <li class="flex-v-center">
        <span class="f-18 lan-ico">🇷🇺</span>
        <span class="flex-item">Русский</span>
      </li>
      <li class="flex-v-center">
        <span class="f-18 lan-ico">🇬🇧</span>
        <span class="flex-item">English</span>
      </li>
    </ul>
  </bubble>
</div>
</template>

<script>
export default {
  name: 'lang-switch',
  data () {
    return {
      bubbleShow: false
    }
  }
}
</script>

<style lang="less">
.lang-switch{
  line-height: 1em;
  .icon{margin-right: 8px;}
  .lan-ico{margin-right: 10px;}
  ul{padding: 10px 0;}
  li{padding: 6px 12px;white-space: nowrap;}
  li:hover{background: #eee;}
}
</style>
