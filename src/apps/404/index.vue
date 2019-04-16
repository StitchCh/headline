<template>
<div class="abs bg-6 app-404 c-f flex-center">
  <div class="t-center">
    <i class="icon">error_outline</i>
    <h1>404 找不到该页面</h1>
    <p>
      <a class="a" @click="$router.back()" style="margin-right:10px;">返回</a>
      <router-link to="/">前往首页</router-link>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'app-404'
}
</script>

<style lang="less">
.app-404{
  padding-bottom: 100px;
  .icon{font-size: 100px;opacity: .5;}
  a{text-decoration: none;color: #ccc;}
  a:hover{color: #fff;}
  h1{font-size: 40px;font-weight: 300;}
}
</style>
