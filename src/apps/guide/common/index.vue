<template>
  <div class="app-common flex-col c-6">
    <div class="af-topbar">
      <span class="f-18">广告设置</span>
    </div>
    <div class="flex-item scroll-y content relative">
      <!--<transition name="fade">-->
        <!--<div v-if="loading" class="abs bg-e" style="z-index: 10;">-->
          <!--<loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>-->
        <!--</div>-->
      <!--</transition>-->

      <div class="setting-card">

        <div v-for="(item, index) in list">
          <div class="flex list_item">
            <span>{{item.demo}}</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="showList[index]"></switcher>
            <btn style="margin-left: 10px;" @click="change(item,index)">确定</btn>
          </div>

          <ul v-if="item.appKey == 'cover_page' && showList[index] == 1" class="flex-v-center mb_4">
            <li class="list" style="margin: 0 auto;">
              <div class="pic-item flex-center add-btn a" @click="ui.photoSelectorShow = true; type = index">
                <p v-if="item.appValue.length == 0"><i class="icon">add_photo_alternate</i>添加图片</p>
                <img v-if="item.appValue.length > 0" :src="item.appValue[0].pic" alt="">
              </div>
            </li>
          </ul>

          <div v-if="item.appKey == 'guide_page' && showList[index] == 1" class="flex-v-center">
            <draggable class="flex-v-center mb_4" style="width: calc(100% - 140px);" element="ul" :options="{ ghostClass: 'movelist'}" v-model="item.appValue" >
              <li class="list" v-for="(item1, index) in item.appValue">
                <div class="pic-item flex-center add-btn a">
                  <span class="dle_btn" @click="item.appValue.splice(index, 1)">+</span>
                  <img :src="item1.pic" alt="">
                </div>
              </li>
            </draggable>
            <div v-if="item.appValue.length < 4" class="list">
              <div class="pic-item flex-center add-btn a" @click="openM(index)">
                <p><i class="icon">add_photo_alternate</i>添加图片</p>
              </div>
            </div>
          </div>
          <!--<ul v-if="item.appKey == 'guide_page' && showList[index] == 1" class="flex-v-center mb_4">-->
            <!---->
          <!--</ul>-->

          <div v-if="item.appKey == 'ad_page' && showList[index] == 1">
            <ul class="flex-v-center">
              <li class="list" style="margin: 0 auto;">
                <div class="pic-item flex-center add-btn a" @click="ui.photoSelectorShow = true; type = index">
                  <p v-if="item.appValue.length == 0"><i class="icon">add_photo_alternate</i>添加图片</p>
                  <img v-if="item.appValue.length > 0" :src="item.appValue[0].pic" alt="">
                </div>
              </li>
            </ul>
            <div v-if="item.appValue[0]" style="overflow: hidden;">
              <span style="display: inline-block;line-height: 34px;">链接</span>
              <input v-model="item.appValue[0].url" style="height: 30px;width: calc(100% - 80px);float: right;padding: 0 10px;" type="text" placeholder="请输入链接地址">
            </div>
            <div v-if="item.appValue[0]" style="overflow: hidden;padding-top: 10px;">
              <span style="display: inline-block;line-height: 34px;">广告跳转时间</span>
              <input v-model="item.appValue[0].jumpTime" style="height: 30px;width: calc(100% - 150px);float: right;padding: 0 10px;" type="number" placeholder="请输入时间(秒)">
            </div>
            <div v-if="item.appValue[0]" style="overflow: hidden;padding-top: 10px;display: flex;justify-content: space-between;">
              <span style="display: inline-block;line-height: 34px;">广告是否可以跳过</span>
              <switcher mode="Number" v-model="item.appValue[0].skip"></switcher>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="gallery-editor">
      <layer v-if="ui.photoSelectorShow" title="选择图片"  width="800px"  class="tc_box">
        <div class="layer-text relative" style="height: 800px;">
          <media-photos select-mode ref="mediaPhotos"/>
        </div>
        <div class="layer-btns">
          <btn flat @click="ui.photoSelectorShow = false">取消</btn>
          <btn flat color="#008eff" @click="selectPhoto">选择</btn>
        </div>
      </layer>
    </div>

  </div>
</template>

<script>
  import MediaPhotos from '../../medialibrary/pages/photos'
  import draggable from 'vuedraggable'

export default {
  name: 'settings-common',
  components: { MediaPhotos, draggable },
  data () {
    return {
      loading: false,
      ui: {
        titleColorBoxShow: false,
        photoSelectorShow: false
      },
      list: [],
      showList: [],
      type: 0,
      selected: [],
      selected1: [],
      selected2: [],
      appThumd: 0,
      appGuide: 0,
      appGuang: 0,
      urlif: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
    }
  },
  methods: {
    change (item, index) {
      console.log(item)
      let list1 = []

      item.appValue.forEach(item1 => {
        list1.push({
          pic: item1.pic,
          url: item1.url,
          jumpTime: item1.jumpTime,
          skip: item1.skip == 0 ? 1 : 0
        })
      })
      this.$http.post('/cri-cms-platform/appGuide/update.monitor', {
        appValue: JSON.stringify(list1),
        status: this.showList[index] == 1 ? 0 : 1,
        demo: item.demo,
        id: item.id
      }).then(res => {
        console.log(res)
        this.$toast('设置成功')
        this.getList()
      })
    },
    openM (index) {
      this.type = index
      if (this.list[index].appValue >= 4) {
        this.$toast('引导页最多上传4张')
        return false
      }
      this.ui.photoSelectorShow = true
    },
    selectPhoto () {
      let imgOrigin = this.$refs.mediaPhotos.imgOrigin
      if (this.list[this.type].appKey == "ad_page") {
        this.list[this.type].appValue = (this.$refs.mediaPhotos.selected.map(v => {
          v.description = ''
          v.pic = imgOrigin + v.filePath + v.fileName
          v.url = ''
          return v
        }))
      } else {
        this.list[this.type].appValue = this.list[this.type].appValue.concat(this.$refs.mediaPhotos.selected.map(v => {
          v.description = ''
          v.pic = imgOrigin + v.filePath + v.fileName
          v.url = ''
          return v
        }))
      }
      console.log(this.list)
      this.ui.photoSelectorShow = false
    },
    getList () {
      this.$http.post('/cri-cms-platform/appGuide/page.monitor').then(res => {
        this.list = res
        this.list.forEach(item => {
          this.showList.push(item.status == 1 ? 0 : 1)
          item.appValue = JSON.parse(item.appValue)
          item.appValue[0].skip = item.appValue[0].skip ? (item.appValue[0].skip == 0 ? 1 : 0) : 1
        })
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
  .mb_4{
    margin-bottom: 40px;
  }
  .list_item{
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .pic-item img{
    width: 140px;
  }
  .pic-item{
    width: 140px;
    position: relative;
  }
  .dle_btn{
    position: absolute;
    top: 4px;
    right: 4px;
    display: block;
    background: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 16px;
    text-align: center;
    transform: rotate(45deg);
    z-index: 10;
    font-size: 20px;
    cursor: pointer;
  }
  .list {
    width: 140px;
    border: 0 !important;
  }
  .app-common{background: #fafafa;
    .content {background: #eee;}
    .setting-card {max-width: 800px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
      li {padding: 12px 20px 12px 0;border-bottom: 1px solid #e1e1e1;
        &:last-child {border-bottom: 0;}
      }
    }
  }
</style>

<style lang="less">
  .gallery-editor {max-width: 900px;margin: 0 auto;padding: 10px;
    .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
      &::-webkit-input-placeholder{color: #aaa;}
    }
    .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
      &:hover {border: 1px solid #000000}
    }
    .title-color-list {width: 192px;padding: 10px;}

    .selector {width: 100%;
      .pic-cover {width: 640px;height: 360px;margin: 0 auto;
        img {max-width: 100%;max-height: 100%;}
      }
      .input {width: 640px;margin: 0 auto;padding: 10px;box-sizing: border-box;
        textarea{width: 100%;outline: none;border: none;font-size: 14px;resize: none;}
      }
      .pic-list {border-top: 1px solid rgba(0, 0, 0, .05);flex-wrap: wrap;}
      .pic-item {width: 100px;height: auto;margin: 13px;border: 2px solid transparent;transition: border-color .2s;
        &>.icon {position: absolute;top: -12px;right: -12px;border-radius: 12px;background: #fff;box-shadow: 0 0 5px;color: #d74947; visibility: hidden}
        &:hover {border-color: #eee;
          &>.icon {visibility: visible;}
        }
        &.active {border-color: #5cb6ff}
        &.add-btn {border: 2px dashed #5cb6ff;color: #5cb6ff;}
        img {max-width: 100%;max-height: 100%}
      }
    }

    .layer-ctn {max-width: 1000px;
      .af-left{width: 280px;background: #fff;border-right: 1px solid #e1e1e1;}
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
