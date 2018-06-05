<template>
  <li class="tab-item" @click="$emit('click')">
    <a class="flex-v-center" :hrefs="href"><slot></slot></a>
  </li>
</template>
<script>
export default {
  name: 'tab-item',
  props: {
    href: String
  }
}
</script>
<style>
  .tab .tab-item {
    overflow: hidden;
    height:100%;
    cursor:pointer;
  } 
  .tab .tab-item a {
    color: rgba(0,0,0,.54);
    text-align: center;
    height: 100%;
    text-align: center;
    padding:14px;
    display: block;
    text-decoration:none;
  }
  .tab .tab-item a:active {
    background:#f1f1f1;
  }
</style>
