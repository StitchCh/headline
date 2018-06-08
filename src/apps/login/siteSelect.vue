<template>
<div class="abs c-f f-18 flex-center site-select">
  <div class="t-center site-ctn">
    <div>
      <div class="flex-center a site-item">
        <i class="icon f-18">language</i>
        <span>中文站点</span>
      </div>
      <div class="line"></div>
    </div>
    <div>
      <div class="flex-center a site-item">
        <i class="icon f-18">language</i>
        <span>俄文站点</span>
      </div>
      <div class="line"></div>
    </div>
    <div>
      <div class="flex-center a site-item">
        <i class="icon f-18">language</i>
        <span>测试站点</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'site-select'
}
</script>

<style lang="less">
.site-select{
  .site-ctn{width: 300px;}
  .site-item{padding: 15px;opacity: .8;transition: opacity .2s;
    &:hover{opacity: 1;}
  }
  .line{height: 1px;background: linear-gradient(to right, rgba(255,255,255, 0), rgba(255,255,255, 0.8), rgba(255,255,255, 0));}
  .icon{margin-right: 15px;color: rgba(255,255,255, 0.8);}
}
</style>
