<template>
  <div class="flex-item flex-col">
    <div class="flex-item scroll-y" style="background: #eee;">
      <div class="relative article-content c-6">
        <div class="flex-v-center product_top">
          <div class="flex-v-center a">
            <i class="icon">add_box</i><span style="padding-left: 4px;">添加商品</span>
          </div>
          <div>
            <input type="text" class="search_input">
            <btn>搜索</btn>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .search_input{
    height: 25px;
    width: 100px;
  }
  .product_top{
    justify-content: space-between;
  }
  .a:hover{
    color: #318fff;
  }
  .article-content{
    margin: 20px auto 0;
    max-width: 1000px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }
</style>
