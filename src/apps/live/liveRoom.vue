<template>
  <div class="abs bg-f flex c-6 f-14 app-article-add">
    <template>
      <div class="flex-item flex-col">
        <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
          <div class="a flex-v-center" @click="$router.back()">
            <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
            <span class="f-18">返回</span>
          </div>
          <div class="flex-item"></div>
          <div class="flex-item">直播中</div>
          <div  class="flex-v-center a">关闭直播</div>
        </div>

        <div  class="flex-item scroll-y">
          <div class="flex-center" style="height: 60px;">
            <div class="tab">
              <div class="tab-item" :class="{on : navindex == 0}" @click="navindex = 0">直播</div>
              <div class="tab-item" :class="{on : navindex == 1}" @click="navindex = 1">聊天室</div>
              <div class="tab-item" :class="{on : navindex == 2}" @click="navindex = 2">直播管理</div>
            </div>
          </div>

          <div v-if="navindex == 0">
            <div class="textareabox" style="max-width: 900px;margin: 0 auto 20px;">
              <textarea placeholder="发直播..."></textarea>
              <div style="margin-bottom: 10px;">
                <i class="icon c-a" style="font-size: 50px;" @click="mediaShow = true">add_photo_alternate</i>
              </div>
              <div v-if="imagelist.length != 0" class="imgList">
                <div v-for="(item,index) in imagelist" class="img_list">
                  <img :src="item.url" alt="">
                </div>
              </div>
            </div>

            <ul class="flex tabbox">
              <li class="tabboxon">全部</li>
              <li>刷新</li>
            </ul>

            <div style="max-width: 900px;margin: 0 auto;">
              <listblock></listblock>
              <listblock></listblock>
            </div>
          </div>

          <div v-if="navindex == 1">
            <div class="textareabox" style="max-width: 900px;margin: 0 auto 20px;">
              <textarea placeholder="发聊天..."></textarea>
            </div>

            <ul class="flex tabbox">
              <li class="tabboxon">全部</li>
              <li>刷新</li>
            </ul>

            <div style="max-width: 900px;margin: 0 auto;">
              <listReply></listReply>
              <listReply></listReply>
            </div>
          </div>

          <div v-if="navindex == 2" style="max-width: 900px;margin: 0 auto 20px;">
            <span>添加视频回放</span>
          </div>

        </div>

      </div>

      <div class="art-options c-4 scroll-y" style="width: 320px;background: #f8f8f8;">
        <div class="btn">开始直播</div>
        <div class="rlist">
          <span style="position: absolute;top: 14px;right: 20px;cursor: pointer;">设置</span>
          <p style="line-height: 40px;font-size: 18px;">主持人</p>
          <div class="flex" style="align-items: center">
            <div class="imgbox txbox" style="margin-right: 10px;">
              <img src="http://60.247.77.208:58088/image/20181215/1544858411816.png" alt="">
            </div>
            <p>123</p>
          </div>
        </div>
        <div class="rlist">
          <span style="position: absolute;top: 14px;right: 20px;cursor: pointer;">设置</span>
          <p style="line-height: 40px;font-size: 18px;">直播员</p>
          <div class="flex" style="align-items: center;margin-bottom: 10px;">
            <div class="imgbox txbox" style="margin-right: 10px;">
              <img src="http://60.247.77.208:58088/image/20181215/1544858411816.png" alt="">
            </div>
            <p>123</p>
          </div>
          <div class="flex" style="align-items: center;margin-bottom: 10px;">
            <div class="imgbox txbox" style="margin-right: 10px;">
              <img src="http://60.247.77.208:58088/image/20181215/1544858411816.png" alt="">
            </div>
            <p>123</p>
          </div>
        </div>

        <div class="option-item flex-v-center">
          <span class="flex-item">是否开启弹幕</span>
          <switcher mode="Number"/>
        </div>

        <div class="rlist">
          <p style="font-size: 18px;line-height: 40px;">拖拽排序</p>
          <draggable element="ul" :options="{ghostClass:'movelist'}" v-model="tagOrder" >
            <li v-for="(item, index) in tagOrder" class="flex-v-center orderitem">
              <span style="padding-left: 10px;">{{index+1}}. {{item == 'LIVE' ? '直播窗口' : '聊天室'}}</span>
            </li>
          </draggable>
        </div>
      </div>

      <div class="app-article-add-thumb">
        <layer v-if="mediaShow" title="选择图片" width="900px">
          <div class="layer-text relative" style="height: 800px;width: 900px;">
            <media-photos select-mode single-select ref="mediaPhotos"></media-photos>
          </div>
          <div class="layer-btns">
            <btn flat @click="mediaShow = false">取消</btn>
            <btn flat color="#008eff" @click="selectImage">选择</btn>
          </div>
        </layer>
      </div>
    </template>
  </div>
</template>

<script>
import MediaPhotos from '../medialibrary/pages/photos'
import listblock from './listblock.vue'
import listReply from './listReply.vue'
import draggable from 'vuedraggable'

export default {
  components: { MediaPhotos, listblock, listReply, draggable },
  name: 'liveRoom',
  data () {
    return {
      navindex: 0,
      mediaShow: false,
      image: {
        id: '',
        url: ''
      },
      tagOrder: ['LIVE', 'CHATROOM'],
      imagelist: []
    }
  },
  methods: {
    selectImage () {
      let image = this.$refs.mediaPhotos.selected[0] || null
      this.image = {
        id: image ? image.id : '',
        url: image ? this.$refs.mediaPhotos.imgOrigin + image.filePath + image.fileName : ''
      }
      this.imagelist.push(this.image)
      this.mediaShow = false
    }
  }
}
</script>

<style scoped>
  .rlist{
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    margin: 0 20px;
    padding: 5px 10px;
    position: relative;
  }
  .btn{
    width: 180px;
    margin: 20px auto;
    line-height: 40px;
    background: #3bb4f2;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
  }
  .option-item{
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding: 20px 10px;
    margin: 0 20px;
  }
  .orderitem{
    line-height: 40px;
    background: #fff;
  }
  .movelist{
    background: #008eff;
    color: #008eff;
    opacity: 0.5;
  }
  .text_content{
    line-height: 24px;
    margin-bottom: 10px;
    padding: 4px 10px;
    background: #eee;
    border-radius: 6px;
  }
  .text_title{
    font-size: 16px;
    margin-bottom: 10px;
  }
  p{
    margin: 0;
  }
  .list{
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    position: relative;
  }
  .textbox{
    width: calc(100% - 80px);
  }
  .list:after{
    content: '';
    display: block;
    clear: both;
  }
  .txbox{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .imgbox{
    overflow: hidden;
  }
  .imgbox>img{
    width: 100%;
  }
  .tabbox{
    max-width: 900px;
    box-sizing: border-box;
    margin: 0 auto 20px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 10px;
    font-size: 16px;
    justify-content: space-between;
  }
  .tabboxon{
    color: #002d70;
  }
  .tabbox li{
    margin: 0 10px;
    cursor: pointer;
  }
  .imgList{
    padding-top: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid #ddd;
  }
  .img_list{
    width: 60px;
    margin: 0 5px;
  }
  .img_list img{
    width: 100%;
  }
  .tab-item{
    width: 80px;
    text-align: center;
  }
  textarea{
    width: 100%;
    outline: none;
    height: 120px;
    color: #555;
    resize: none;
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  .textareabox{
    padding: 20px;
    border:1px solid #ddd;
    border-radius: 10px;
  }
</style>

<style lang="less">
  .app-article-add-thumb {
    .layer-ctn {max-width: 1000px;
      .af-left{width: 280px;background: #fff;border-right: 1px solid rgba(0, 0, 0, .05);}
      .nav-item{height: 40px;border-bottom: 1px solid #eee;line-height: 1em;padding: 0 5px 0 15px;
        &.nav-item-folder{padding-left: 30px;}
        &:hover{background: rgba(0, 0, 0, .05);}
        &.on{background: #318fff;border-color: #fff;color: #fff;
          .icon-btn{color: #fff;}
        }
        input{border: none;height: 36px;background: transparent;
          &::-webkit-input-placeholder{color: #aaa;}
        }
        .nav-item-icon{margin-right: 15px;}
      }
      .search-bar input{width:150px;height: 100%;border:none;margin-left: 10px;}
      .media-group{padding: 13px 30px;
        ul{flex-wrap: wrap;}
        li{margin: 0 6px 6px 0}
      }
      .media-group-title{padding: 15px 0;}
      .media-group-title{padding: 15px 0;}
    }
  }
</style>
