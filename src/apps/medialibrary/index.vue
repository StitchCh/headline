<template>
<div class="abs bg-f flex app-article medialibrary">
  <div class="af-right flex-col">
    <div class="af-topbar flex-v-center" style="height:30px;">
      <div class="flex-item search-bar c-6 f-14"><i class="icon">search</i> <input type="text" placeholder="搜索" class="flex-item okr-search-input" style="border:0;"></div>
      <a href="javascript:;" class="blue mr15">全选</a>
      <a href="javascript:;" class="blue f-14 mr15">批量删除</a>
      <a href="javascript:;" class="blue f-14 mr15">全部时间</a>
      <span class="line"></span>
      <div class="relative" style="display:inline-block;">
          <a @click="bubble1=!bubble1" class="blue f-14 mr15">图片链接</a>
          <bubble v-if="bubble1" @close="bubble1=false">
            <div style="width: 300px;height:100px;padding:15px;">
              <input-box v-model="input1" label="输入支持所有可访问的图片地址"/>
            </div>
          </bubble>
        </div>
      <a href="javascript:;" class="blue f-14 mr15">本地上传</a>
    </div>
    
    <div class="flex-item box scroll-y">
      <div>
        <h4>2018年06月06日</h4>
        <ul class="flex ulbox">
          <li>
            <img src="../../assets/img/logo.png" @click="layerShow = true"/>
            <div class="label">
              <input id="option" type="checkbox">
              <label for="option"></label>
            </div>
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
      <div>
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
      <div>
        <h4>2018年06月08日</h4>
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
      <div>
        <h4>2018年06月08日</h4>
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
    <div class="layer" v-if="layerShow">
      <div class="flex laybox">
        <div class="flex-col" style="width:600px; border-right:1px solid #eee;">
          <div class="flex-v-center" style="height:60px; border-bottom:1px solid #eee; padding:15px;">
            <a href="javascript:;" class="flex-item f-16 blue">标题</a>
            <icon-btn title="复制图片路径">edit</icon-btn>
            <icon-btn>edit</icon-btn>
            <icon-btn>edit</icon-btn>
            <icon-btn @click="$confirm('确认删除吗？')">delete</icon-btn>
          </div>
          <div class="flex-item flex-center" style="padding:50px;">
            <img src="../../assets/img/logo.png"/>
          </div>
        </div>
        <div class="flex-item " style="padding:20px; position:relative;">
          <icon-btn @click="layerShow = false" style="position:absolute; top:5px; right:5px;">close</icon-btn>
          <input-box v-model="input1" label="添加标签" style="padding-bottom:0; margin-top:15px;"/>
          <p>
            <tag>你好1</tag>
            <tag>你好2</tag>
          </p>
          <p style="margin-top:30px;">质量：</p>
          <p>尺寸：</p>
          <p>作者：</p>
          <p>日期：</p>
        </div>
      </div>
    </div>
    <div class="af-bottombar">共100张</div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      bubble1: false,
      input1: '',
      layerShow: false
    }
  }
}
</script>

<style lang="less">
a{
  text-decoration: none;
}
.medialibrary{
  .mr15{
    margin-right:15px;
  }
  .line{
    display:inline-block;
    height:30px;
    border-right:1px solid #ddd;
    margin-right:15px;
  }
  .bubble-ctn{
    box-shadow: 0 0px 12px rgba(0, 0, 0, 0.175);
  }
  .bubble{
    left:-165px!important;
  }
  .bubble-arrow{
    left: 186px;
  }
  .layer{
    .laybox{
      width: 800px;
      height: 500px;
      background: #fff;
      border-radius: 5px;
    }
    p{
      margin:15px auto;
      padding:0;
    }
  }
  .box{
    padding:20px;
    .ulbox{
      flex-direction: row;
      flex-wrap: wrap;
      li{
        height: 200px;
        margin:0 10px 10px 0;
        border:1px solid #eee;
        position: relative;
        transition: box-shadow .2s ease;
        .label{
          position: absolute;
          top: 0;
          right: 0;
          input{
            display: none;
          }
          label{
            display: inline-block;
            width:22px;
            height:22px;
            border:1px solid #1cb352;
            position: relative;
          }
          input:checked+label{
            background: #1cb352;
          }
          input:checked+label:before{
            content: '';
            display: inline-block;
            width:4px;
            height: 10px;
            background: #fff;
            transform: rotate(-30deg);
            position: absolute;
            top:9px;
            left:4px;
          }
          input:checked+label:after{
            content: '';
            display: inline-block;
            width:4px;
            height: 18px;
            background: #fff;
            transform: rotate(40deg);
            position: absolute;
            top:2px;
            left:11px;
          }
        }
      }
      li:hover{
        box-shadow: 0 8px 20px rgba(0,0,0,.2)!important;
      }
    }
  }
}
</style>
