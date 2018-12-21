<template>
  <div class="list" :class="{listdele: data.withdrawn === '01'}">
    <div class="imgbox txbox" style="float: left;">
      <img :src="data.messageUserThumb" alt="">
    </div>
    <div style="float: right;" class="textbox">
      <p class="text_title">{{data.messageUserAlias}}<span class="toptag" v-if="data.stick === '01'">置顶</span></p>
      <p class="text_content">{{data.textContent}}</p>
      <p class="text_time">{{data.createTime}}</p>
      <div v-if="data.items" style="padding-top: 10px;">
        <img v-for="item in data.items" :src="item.mediaUrl" alt="" class="img_list">
      </div>
    </div>
    <div v-if="data.withdrawn == '00'" class="xiala">
      <div class="bg-f flex-center a b">
        <!--<span class="fsbtn" style="margin-right: 10px;">审核</span>-->
        <i class="icon" @click="addShow = true">add</i>
      </div>
      <bubble v-if="addShow" @close="addShow=false">
        <ul class="f-14 c-5 add-select" style="padding: 4px 0;width: 80px;text-align: center;">
          <li class="a flex-v-center">
            <span class="flex-item" @click="toTop">{{data.stick === '01' ? '取消置顶' : '置顶'}}</span>
          </li>
          <li class="a flex-v-center">
            <span class="flex-item" @click="change">修改</span>
          </li>
          <li class="a flex-v-center">
            <span class="flex-item" @click="remove">撤回</span>
          </li>
        </ul>
      </bubble>
    </div>

    <div v-if="changeShow" class="bogbox" @click="changeShow = false">
      <div class="textareabox" style="width: 700px;margin: 0 auto 20px;" @click.stop>
        <textarea v-model="setContent" placeholder="发直播..."></textarea>
        <div style="margin-bottom: 10px;">
          <i class="icon c-a" style="font-size: 50px;" @click="mediaShow = true">add_photo_alternate</i>
        </div>
        <div v-if="imagelist.length != 0" class="imgList">
          <div v-for="(item,index) in imagelist" class="img_list">
            <span class="img_list_delet" @click="removeImage(index)">+</span>
            <img :src="item.mediaUrl" alt="">
          </div>
        </div>
        <div style="text-align: right;">
          <span class="sbtn" style="margin-right: 10px;" @click="changeShow = false">取消</span>
          <span class="sbtn" @click="setItem">确认</span>
        </div>
      </div>
    </div>

    <div class="app-article-add-thumb">
      <layer v-if="mediaShow" title="选择图片" width="900px" style="z-index:200;">
        <div class="layer-text relative" style="height: 800px;width: 900px;">
          <media-photos select-mode single-select ref="mediaPhotos"></media-photos>
        </div>
        <div class="layer-btns">
          <btn flat @click="mediaShow = false">取消</btn>
          <btn flat @click="selectImage">选择</btn>
        </div>
      </layer>
    </div>
  </div>
</template>

<script>
import MediaPhotos from '../medialibrary/pages/photos'

export default {
  components: { MediaPhotos },
  name: 'listblock',
  props: [ 'value', 'liveId' ],
  data () {
    return {
      addShow: false,
      data: {},
      setContent: '',
      changeShow: false,
      mediaShow: false,
      imagelist: []
    }
  },
  mounted () {
    this.data = this.value
  },
  methods: {
    removeImage (index) {
      this.imagelist.splice(index, 1)
    },
    toTop () {
      this.$http.post('/cri-cms-platform/live/message/stick/toggle.monitor', {
        liveMessageId: this.data.id
      }).then(res => {
        this.$emit('change')
      })
    },
    change () {
      this.setContent = this.data.textContent
      this.imagelist = []
      for (let i = 0; i < this.data.items.length; i++) {
        this.imagelist.push({
          mediaUrl: this.data.items[i].mediaUrl,
          mediaId: this.data.items[i].mediaId
        })
      }
      this.changeShow = true
    },
    selectImage () {
      let image = this.$refs.mediaPhotos.selected[0] || null
      this.image = {
        mediaId: image ? image.id : '',
        mediaUrl: image ? this.$refs.mediaPhotos.imgOrigin + image.filePath + image.fileName : ''
      }
      this.imagelist.push(this.image)
      this.mediaShow = false
    },
    setItem () {
      let imglist = ''
      for (let i = 0; i < this.imagelist.length; i++) {
        imglist += '1:' + this.imagelist[i].mediaId + '|'
      }
      this.$http.post('/cri-cms-platform/live/message/update.monitor', {
        liveMessageId: this.data.id,
        liveId: this.liveId,
        textContent: this.setContent,
        mediaContent: imglist
      }).then(res => {
        console.log(res)
        this.changeShow = false
        this.$emit('change')
      })
    },
    remove () {
      this.$http.post('/cri-cms-platform/live/message/withdrawn.monitor', {
        liveMessageId: this.data.id
      }).then(res => {
        console.log(res)
        this.$emit('change')
      })
    }
  }
}
</script>

<style scoped>
  .sbtn{
    cursor: pointer;
  }
  .sbtn:hover{
    color: #002d70;
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
    position: relative;
  }
  .img_list_delet{
    display: block;
    position: absolute;
    top: 2px;
    right: 2px;
    background: #fff;
    color: #333;
    font-size: 20px;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 17px;
    border-radius: 50%;
    cursor: pointer;
    transform: rotate(45deg);
    transition: 0.4s;
    opacity: 0;
  }
  .img_list:hover .img_list_delet{
    opacity: 1;
  }
  .img_list img{
    width: 100%;
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
    background: #fff;
  }
  .bogbox{
    background: rgba(0,0,0,0.5);
    position: fixed;
    z-index: 110;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
  }
  .xiala{
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .text_content{
    line-height: 24px;
    margin-bottom: 10px;
    padding: 4px 10px;
    background: rgba(0,0,0,0.05);
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
    margin-bottom: 20px;
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
  .listdele{
    background: #eee;
    border-color: #ddd;
  }
  .toptag{
    padding: 3px 8px;
    background: #f00;
    color: #fff;
    font-weight: bold;
    border-radius: 6px;
    margin: 0 10px;
    font-size: 12px;
  }
</style>
