<template>
<div class="abs bg-f flex app-article">
  <div class="af-right flex-col">
    <div class="af-topbar flex-v-center">
      <div class="flex-item search-bar"><i class="icon">search</i> <input type="text" placeholder="输入关键字、姓名并回车" class="flex-item okr-search-input"></div>
      <a href="javascript:;">全选</a>
      <a href="javascript:;">批量删除</a>
      <a href="javascript:;">全部时间</a>
      <a href="javascript:;">图片链接</a>
      <a href="javascript:;">本地上传</a>
    </div>
    <div class="flex-item box scroll-y">
      <div class="">
        <h4 class="">2018年06月06日</h4>
        <ul class="flex ulbox">
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
        </ul>
      </div>
      <div class="">
        <h4 class="">2018年06月08日</h4>
        <ul class="flex ulbox">
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
        </ul>
      </div>
      <div class="">
        <h4 class="">2018年06月08日</h4>
        <ul class="flex ulbox">
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
        </ul>
      </div>
      <div class="">
        <h4 class="">2018年06月08日</h4>
        <ul class="flex ulbox">
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
          <li>
            <img src="../../assets/img/logo.png"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar">33</div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
a{
  text-decoration: none;
}
.box{
  padding:20px;
  .ulbox{
    flex-direction: row;
    flex-wrap: wrap;
    li{
      height: 200px;
      margin-right: 10px;
    }
  }
}

</style>
