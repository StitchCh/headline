<template>
<div class="relative list-view">
  <div class="abs scroll-y">
    <ul>
      <slot v-for="item in list" :item="item"></slot>
    </ul>
  </div>

  <div v-if="!list.length" class="abs flex-center"><no-data/></div>
  <div v-if="loading" class="abs flex-center"><loading size="30"/></div>
</div>
</template>

<script>
export default {
  name: 'list-view',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  }
}
</script>

<style lang="less">
.list-view{
  overflow: hidden;
  .loading-box{height: 50px;}
  li{border-bottom: 1px solid #eee;}
  li:last-child{border-color: transparent;}
}
</style>
