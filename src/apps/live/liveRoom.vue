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
          <div class="flex-item">{{liveTitle}}</div>
          <!-- <div  class="flex-v-center a" @click="closeLive">关闭直播</div> -->
        </div>

        <div  class="flex-item scroll-y">
          <div class="flex-center" style="height: 60px;">
            <div class="tab">
              <div class="tab-item" :class="{on : navindex == 0}" @click="navindex = 0">直播</div>
              <div v-if="tagOrder.length > 1" class="tab-item" :class="{on : navindex == 1}" @click="navindex = 1">聊天室</div>
              <!-- <div class="tab-item" :class="{on : navindex == 2}" @click="navindex = 2">直播管理</div> -->
            </div>
          </div>
          <div v-if="navindex == 0">
            <div class="textareabox" style="max-width: 900px;margin: 0 auto 20px;">
              <textarea v-model="liveContent" placeholder="发直播..."></textarea>
              <div style="margin-bottom: 10px;">
                <i class="icon c-a" style="font-size: 50px;margin-right: 10px;" @click="mediaShow = true">add_photo_alternate</i>
                <i class="icon c-a" style="font-size: 55px;margin-right: 10px;" @click="videoSelectorShow = true">video_call</i>
                <i class="icon c-a" style="font-size: 40px;margin-right: 10px;" @click="audioSelectorShow = true">audiotrack</i>
              </div>
              <div v-if="imagelist.length != 0" class="imgList">
                <div v-for="(item, index) in imagelist" class="img_list">
                  <span class="img_list_delet" @click="removeImage(index)">+</span>
                  <img v-if="item.type == '1'" :src="item.url" alt="">
                  <div v-if="item.type == '2'" style="background: #318fff;text-align: center;width: 100%;">
                    <i class="icon c-a" style="font-size: 30px;color: #fff;line-height: 60px;">video_call</i>
                  </div>
                  <div v-if="item.type == '3'" style="background: #318fff;text-align: center;width: 100%;">
                    <i class="icon c-a" style="font-size: 30px;color: #fff;line-height: 60px;">audiotrack</i>
                  </div>
                </div>
              </div>
              <div style="text-align: right;"><span @click="addLiveContent">发送</span></div>
            </div>

            <ul class="flex tabbox">
              <li class="tabboxon">全部</li>
              <li @click="getLiveContentList()">刷新</li>
            </ul>

            <div style="max-width: 900px;margin: 0 auto;">
              <listblock v-for="(item, index) in messageList" :key="index" @change="getLiveContentList" :value="item" :liveId="liveId"></listblock>
            </div>
          </div>

          <div v-if="navindex == 1">
            <div class="textareabox" style="max-width: 900px;margin: 0 auto 20px;overflow: hidden;">
              <textarea placeholder="发聊天..." v-model="pinglun"></textarea>
              <div style="float: right;" @click="pushPinglun">发送</div>
            </div>

            <ul class="flex tabbox">
              <li class="tabboxon">全部</li>
              <li @click="getPinglunList">刷新</li>
            </ul>

            <div style="max-width: 900px;margin: 0 auto;">
              <div v-for="(item, index) in pinglunList"  :key="index">
                <listReply :value="item" @change="data => { item = data }" @reset="getPinglunList"></listReply>
              </div>
              <!--<div v-for="(item, index) in pinglunList">-->
                <!--<listReply :value="item"></listReply>-->
              <!--</div>-->
            </div>
          </div>

          <div v-if="navindex == 2" style="max-width: 900px;margin: 0 auto 20px;">
            <span>添加视频回放</span>
          </div>

        </div>

      </div>

      <div class="art-options c-4 scroll-y" style="width: 320px;background: #f8f8f8;">
        <div v-if="status == '0'" class="btn_type1" @click="startLive">开始直播</div>
        <div v-if="status == '1'" class="btn1" @click="closeLive">结束直播</div>
        <div v-if="status == '2'" class="btn2">直播已关闭</div>
        <div class="rlist">
          <p style="line-height: 40px;font-size: 18px;">主持人</p>
          <div class="flex" style="align-items: center">
            <div class="imgbox txbox" style="margin-right: 10px;" @click="mediaShow = true;zbChange = true;">
              <img v-if="!host.url" src="../../../static/img/icon-user.png">
              <img v-if="host.url" :src="host.url" alt="">
            </div>
            <!-- <p>{{host.name}}</p> -->
            <input type="" v-model="host.name" name="" @blur="setZhiboRoom">
          </div>
        </div>
        <div class="rlist">
          <span style="position: absolute;top: 14px;right: 20px;cursor: pointer;" @click="userBoxShow = true">设置</span>
          <p style="line-height: 40px;font-size: 18px;">直播员</p>
          <div v-for="(item, index) in zhiboyuanList" class="flex-v-center" style="align-items: center;margin-bottom: 10px;">
            <div class="imgbox txbox" style="margin-right: 10px;">
              <img v-if="!item.thumb.url" src="../../../static/img/icon-user.png" @click="mediaShow = true;txChange = true;txIndex = index;">

              <img v-if="item.thumb.url" :src="item.thumb.url" @click="mediaShow = true;txChange = true;txIndex = index;">
            </div>
            <input style="width: 110px;" type="text" v-model="item.aliasName" @blur="changeZ(index)">
            <p>
              <check-box style="float: left;margin-right: 0;" @change="changeZ(index)" v-model="item.checked"/>
              审核权限
            </p>
          </div>
        </div>

        <div class="option-item flex-v-center">
          <span class="flex-item">是否开启弹幕</span>
          <switcher v-model="openBulletScreen" mode="Number"/>
        </div>

        <div class="rlist">
          <p style="font-size: 18px;line-height: 40px;">拖拽排序</p>
          <draggable element="ul" :options="{ghostClass:'movelist'}" v-model="tagOrder" >
            <li v-for="(item, index) in tagOrder" class="flex-v-center orderitem">
              <span style="padding-left: 10px;">{{index+1}}. {{item == 'LIVE' ? '直播窗口' : '聊天室'}}</span>
            </li>
          </draggable>
        </div>

        <!--<div class="option-item flex-v-center">-->
          <!--<span>虚拟阅读量</span>-->
          <!--<input class="flex-item t-right" type="number" placeholder="请输入" v-model="virtualPv" @blur="setZhiboRoom">-->
        <!--</div>-->
        <!--<div class="option-item flex-v-center">-->
          <!--<span>虚拟评论量</span>-->
          <!--<input class="flex-item t-right" type="number" placeholder="请输入" v-model="virtualShare" @blur="setZhiboRoom">-->
        <!--</div>-->
        <!--<div class="option-item flex-v-center">-->
          <!--<span>虚拟点赞量</span>-->
          <!--<input class="flex-item t-right" type="number" placeholder="请输入" v-model="virtualDigg" @blur="setZhiboRoom">-->
        <!--</div>-->
      </div>

      <div class="app-article-add-thumb">
        <layer v-if="mediaShow" title="选择图片" width="900px" style="z-index: 200;">
          <div class="layer-text relative" style="height: 800px;width: 900px;">
            <media-photos select-mode single-select ref="mediaPhotos"></media-photos>
          </div>
          <div class="layer-btns">
            <btn flat @click="mediaShow = false">取消</btn>
            <btn flat color="#008eff" @click="selectImage">选择</btn>
          </div>
        </layer>
      </div>

      <div v-if="userBoxShow" class="userlist">
        <div class="uesr_box">
          <p class="user_box_title">选择人物</p>
          <ul style="padding: 20px;height: 380px;overflow: auto;">
            <li v-for="(item, index) in userList" class="flex user_list">
              <!--<div class="imgbox">-->
                <!--<img src="" alt="">-->
              <!--</div>-->
              <p>{{item.name}}</p>
              <check-box v-model="item.checked"/>
            </li>
          </ul>
          <div class="user_btnbox">
            <span @click="userBoxShow = false;txChange = false">取消</span>
            <span @click="setUser">确定</span>
          </div>
        </div>
      </div>

      <div class="video-editor">
        <layer v-if="videoSelectorShow" title="选择视频"  width="1000px">
          <div class="layer-text relative" style="height: 1000px;">
            <media-videos select-mode ref="mediaVideos" single-select></media-videos>
          </div>
          <div class="layer-btns">
            <btn flat @click="videoSelectorShow = false">取消</btn>
            <btn flat color="#008eff" @click="selectVideo">选择</btn>
          </div>
        </layer>
      </div>

      <div class="video-editor">
        <layer v-if="audioSelectorShow" title="选择视频"  width="800px">
          <div class="layer-text relative" style="height: 800px;">
            <media-audios select-mode ref="mediaAudios" single-select/>
          </div>
          <div class="layer-btns">
            <btn flat @click="audioSelectorShow = false">取消</btn>
            <btn flat color="#008eff" @click="selectAudio">选择</btn>
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
import MediaVideos from '../medialibrary/pages/videos'
import MediaAudios from '../medialibrary/pages/audios'

const ORIGIN = 'http://60.247.77.208:58088'

export default {
  components: { MediaPhotos, MediaAudios, MediaVideos, listblock, listReply, draggable },
  name: 'liveRoom',
  data () {
    return {
      audioSelectorShow: false,
      videoSelectorShow: false,
      status: 0,
      pinglun: '',
      liveContent: '',
      virtualDigg: '',
      virtualShare: '',
      virtualPv: '',
      userBoxShow: false,
      navindex: 0,
      txIndex: '',
      txChange: false,
      zbChange: false,
      mediaShow: false,
      openBulletScreen: 0,
      liveTitle: '',
      image: {
        id: '',
        url: ''
      },
      host: {
        name: '',
        url: '',
        urlid: ''
      },
      liveId: '',
      userList: [],
      zhiboyuanList: [],
      tagOrder: ['LIVE', 'CHATROOM'],
      imagelist: [],
      pinglunList: [],
      messageList:[]
    }
  },
  watch:{
    'tagOrder' () {
      this.setZhiboRoom()
    }
  },
  beforeMount () {
    this.$http.post('/cri-cms-platform/live/room.monitor', {
      id: this.$route.query.id
    }).then(res => {
      console.log(res)
      this.status = res.live.status
      this.liveTitle = res.content.title
      this.virtualDigg = res.content.virtualDigg
      this.virtualShare = res.content.virtualShare
      this.virtualPv = res.content.virtualPv
      this.liveId = res.live.id
      this.tagOrder = res.live.tagOrder.split(',')
      console.log(res.live, this.tagOrder)
      if (res.live.hostThumb) {
        this.host = {
          name: res.live.hostAliasName || '',
          url: res.live.hostThumb.url || '',
          urlid: res.live.hostThumb.id || ''
        }
      }
      this.$http.post('/cri-cms-platform/live/broadcaster/user.monitor', {
        liveId: this.liveId
      }).then(res => {
        this.userList = res.users
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].checked = this.userList[i].checked == 0 ? false : true
        }
      })

      this.getLiveContentList()
      this.getPinglunList()

      this.$http.post('/cri-cms-platform/live/broadcaster/list.monitor', {
        liveId: this.liveId
      }).then(res => {
        this.zhiboyuanList = res.broadcasters
        console.log(this.zhiboyuanList)
        this.zhiboyuanList.checked = res.broadcasters.auditPermission == 0 ? false : true
      })
    })
  },
  methods: {
    selectAudio () {
      this.imagelist.push({
        id: this.$refs.mediaAudios.selected[0].id,
        url: ORIGIN + this.$refs.mediaAudios.selected[0].audio,
        type: '3'
      })
      this.audioSelectorShow = false
    },
    selectVideo () {
      this.imagelist.push({
        id: this.$refs.mediaVideos.selected[0].id,
        url: ORIGIN + this.$refs.mediaVideos.selected[0].thumb,
        type: '2'
      })
      this.videoSelectorShow = false
    },
    removeImage (index) {
      this.imagelist.splice(index, 1)
    },
    addLiveContent () {
      let mediaContent = ''
      this.imagelist.forEach(item => {
        mediaContent += item.type + ':' + item.id + '|'
      })
      console.log(mediaContent)
      this.$http.post('/cri-cms-platform/live/message/add.monitor', {
        liveId: this.liveId,
        textContent: this.liveContent,
        mediaContent: mediaContent
      }).then(res => {
        console.log(res)
        this.imagelist = []
        this.liveContent = ''
        this.getLiveContentList()
      })
    },
    pushPinglun () {
      this.$http.post('/cri-cms-platform/live/comment/add.monitor', {
        liveId: this.liveId,
        content: this.pinglun
      }).then(res => {
        this.pinglun = ''
        this.getPinglunList()
        console.log(res)
      })
    },
    getLiveContentList () {
      this.messageList = []
      this.$http.post('/cri-cms-platform/live/message/refresh.monitor', {
        liveId: this.liveId,
        userType: ''
      }).then(res => {
        console.log(res)
        this.messageList = res.messages
      })
    },
    getPinglunList () {
      this.pinglunList = []
      this.$http.post('/cri-cms-platform/live/comment/refresh.monitor', {
        liveId: this.liveId
      }).then(res => {
        this.pinglunList = res.comments
        console.log(this.pinglunList)
      })
    },
    closeLive () {
      this.$http.post('/cri-cms-platform/live/stop.monitor', {
        liveId: this.liveId
      }).then(res => {
        this.$http.post('/cri-cms-platform/live/room.monitor', {
          id: this.$route.query.id
        }).then(res => {
          this.status = res.live.status
        })
      })
    },
    setZhiboRoom () {
      this.$http.post('/cri-cms-platform/live/room/update.monitor',{
        liveId: this.liveId,
        openBulletScreen: this.openBulletScreen,
        hostThumb: this.host.urlid,
        hostAliasName: this.host.name,
        virtualDigg: this.virtualDigg,
        virtualShare: this.virtualShare,
        virtualPv: this.virtualPv,
        tagOrder: this.tagOrder[0] + ',' + this.tagOrder[1]
      }).then(res => {
        console.log(res)
      })
    },
    changeZ (index) {
      this.txIndex = index
      this.changeZhiboyuan()
    },
    setUser () {
      let userIds = ''
      this.userList.forEach((item) => {
        if(item.checked){
          userIds += item.userId + ','
        }
      })
      this.$http.post('/cri-cms-platform/live/broadcaster/add.monitor', {
        liveId: this.liveId,
        userIds: userIds
      }).then(res => {
        this.userBoxShow = false
        this.$http.post('/cri-cms-platform/live/broadcaster/list.monitor', {
          liveId: this.liveId
        }).then(res => {
          this.zhiboyuanList = res.broadcasters
          this.zhiboyuanList.checked = res.broadcasters.auditPermission == 0 ? false : true
        })
      })
    },
    startLive () {
      this.$http.post('/cri-cms-platform/live/start.monitor',{
        liveId: this.liveId
      }).then(res => {
        this.$http.post('/cri-cms-platform/live/room.monitor', {
          id: this.$route.query.id
        }).then(res => {
          this.status = res.live.status
        })
      })
    },
    changeZhiboyuan () {
      this.$http.post('/cri-cms-platform/live/broadcaster/update.monitor',{
        liveId: this.liveId,
        userId: this.zhiboyuanList[this.txIndex].userId,
        thumb: this.zhiboyuanList[this.txIndex].thumb.id,
        aliasName: this.zhiboyuanList[this.txIndex].aliasName,
        audit: this.zhiboyuanList[this.txIndex].checked ? 1 : 0
      }).then(res => {
        this.zhiboyuanList[this.txIndex] = res.broadcasters
        console.log(this.zhiboyuanList)
      })
    },
    selectImage () {
      let image = this.$refs.mediaPhotos.selected[0] || null
      this.image = {
        id: image ? image.id : '',
        url: image ? this.$refs.mediaPhotos.imgOrigin + image.filePath + image.fileName : '',
        type: '1'
      }
      if (this.txChange) {
        console.log(this.zhiboyuanList)
        this.zhiboyuanList[this.txIndex].thumb.url = this.image.url
        this.zhiboyuanList[this.txIndex].thumb.id = this.image.id
        this.changeZhiboyuan()
      } else if (this.zbChange) {
        this.host.url = this.image.url
        this.host.urlid = this.image.id
        this.setZhiboRoom()
      } else {
        this.imagelist.push(this.image)
      }
      this.mediaShow = false
      this.txChange = false
    }
  }
}
</script>

<style lang="less">
  .video-editor {max-width: 900px;margin: 0 auto;padding: 10px;
    .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
      &::-webkit-input-placeholder{color: #aaa;}
    }
    .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
      &:hover {border: 1px solid #000}
    }
    .title-color-list {width: 192px;padding: 10px;}
    .selector {width: 100%;height: 495px;
      .selector-add {width: 100%;height: 100%;background: rgba(0, 0, 0, .06);border-radius: 10px;
        &:hover {opacity: .8;}
      }
    }
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
      .bubble-item{padding: 4px 15px;white-space: nowrap;cursor: pointer;}
      .bubble-item:hover{background: rgba(0, 0, 0, .1)}
      .datepicker{
        &:before{content: none;}
        input{background: transparent;border: none;padding: 0 10px;}
      }
      .datepicker-range{min-width: 200px;
        .datepicker-popup{right: 0;width: 420px;}
      }
    }
  }
</style>

<style scoped>
  input{
    border: 0;
    background: none;
  }
  .user_list{
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .user_btnbox{
    text-align: right;
    padding: 0 20px;
  }
  .user_btnbox span{
    margin-left: 20px;
  }
  .user_btnbox span:hover{
    color: #002d70;
    cursor: pointer;
  }
  .user_box_title{
    text-align: center;
    line-height: 60px;
    font-size: 18px;
  }
  .userlist{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 100;
  }
  .uesr_box{
    width: 400px;
    height: 520px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
  }
  .rlist{
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    margin: 0 20px;
    padding: 5px 10px;
    position: relative;
  }
  .btn_type1{
    width: 180px;
    margin: 20px auto;
    line-height: 40px;
    background: #3bb4f2;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
  }
  .btn1{
    width: 180px;
    margin: 20px auto;
    line-height: 40px;
    background: #f00;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
  }
  .btn2{
    width: 180px;
    margin: 20px auto;
    line-height: 40px;
    background: #ccc;
    color: #fff;
    text-align: center;
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
    display: flex;
    align-items: center;
    width: 60px;
    height: 60px;
    margin: 0 5px;
    background: #ddd;
    position: relative;
    text-align: center;
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
