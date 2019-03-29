<template>
  <div class="abs bg-f flex c-6 f-14 app-audio-album-edit">
    <div v-if="ui.loading" class="abs flex-center bg-f" style="z-index: 10;">
      <loading size="50"/>
    </div>
    <template v-else>
      <div class="flex-item flex-col">
        <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
          <div class="a flex-v-center" @click="$router.back()">
            <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
            <span class="f-18">返回</span>
          </div>
          <div class="flex-item"></div>
          <div class="flex-v-center">
            <btn big style="margin-right: 20px;" @click="submit">保存</btn>
            <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
          </div>
        </div>
        <div class="flex-item scroll-y">
          <div class="audio-album-editor">
            <div class="relative">
              <input v-model="form.title" class="title" type="text" placeholder="请输入标题"/>
            </div>
            <div class="selector">
              <div v-if="!audioList.length" class="selector-add flex-center a" @click="ui.audioSelectorShow = true;getList(true)">
                <div class="relative">
                  <i class="icon c-a" style="font-size: 80px;">audiotrack</i>
                  <i class="icon c-a" style="font-size: 50px;position: absolute;left: -10px;top: 0;">add</i>
                </div>
              </div>

              <div v-else>
                <ul class="list-view">
                  <li v-for="item in audioList" :key="item.id" class="list-item c-6 f-14 a flex-v-center">
                    <div class="list-thumb flex-center">
                      <img v-if="item.thumb.length" :src="item.thumb[0].url" alt="">
                    </div>
                    <div class="flex-item">
                      <div class="b" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis">{{item.title}}</div>
                      <div class="c-8 f-12" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis;margin-top: 10px;">{{item.abstarcts}}</div>
                      <div class="c-8 f-12 flex-v-center" style="margin-top: 10px;">
                        <span style="margin-right: 15px;">作者：{{item.author}}</span>
                        <span style="margin-right: 15px;">创建者：{{item.createUser}}</span>
                        <span class="flex-item"></span>
                        <span>{{item.createDate}}</span>
                      </div>
                    </div>
                  </li>
                  <li></li>
                </ul>
                <div class="t-center" style="margin-top: 20px;">
                  <btn flat color="#0299ff" @click="ui.audioSelectorShow = true;getList(true)">重新选择</btn>
                </div>
              </div>
            </div>

            <layer v-if="ui.audioSelectorShow" title="选择视频"  width="800px">
              <div class="layer-text flex-col" style="height: 800px;">
                <list-view :list="list" class="flex-item">
                  <li class="list-item flex-v-center a relative" slot-scope="slotProps" @click="onItemClick(slotProps.item)" :class="{'on': slotProps.item.check}">
                    <div class="list-thumb flex-center">
                      <img v-if="slotProps.item.thumb.length" :src="slotProps.item.thumb[0].url" alt="">
                    </div>
                    <div class="flex-item">
                      <div class="list-title flex-center">
                        <span class="flex-item c-6 f-14 b">{{slotProps.item.title}}</span>
                      </div>
                      <div class="list-info f-12 c-8 flex-v-center">
                        <span>{{slotProps.item.abstracts}}</span>
                      </div>
                      <div class="list-info f-12 c-8 flex-v-center">
                        <span>{{slotProps.item.createDate}}</span>
                        <span>{{slotProps.item.createUser}}</span>
                      </div>
                    </div>
                  </li>
                </list-view>
              </div>
              <div class="layer-btns">
                <btn flat @click="clearList">取消</btn>
                <btn flat color="#008eff" @click="selectVideo">选择</btn>
              </div>
            </layer>
          </div>
        </div>
      </div>
      <div class="album-options c-4 scroll-y" :style="{ width: ui.optionShow ? '320px' : '0px' }">
        <div style="width: 280px;margin: 0 20px;">
          <p>添加封面</p>
          <add-thumb scale v-model="thumb" height="160px" style="margin-bottom: 8px;"></add-thumb>
          <!--<div class="option-item relative">-->
            <!--<textarea placeholder="摘要，限制 128 字。" v-model="form.videoAbstract" rows="8"></textarea>-->
            <!--<span style="position: absolute;bottom: 3px;right: 0;" :style="{ color: form.videoAbstract.length > 128 ? '#F44336' : '#999' }">{{form.videoAbstract.length}} / 128</span>-->
          <!--</div>-->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ListView from '@/components/listView'
import AddThumb from '@/components/thumb'

export default {
  name: 'audio-album-edit',
  components: { ListView, AddThumb },
  props: [ 'id' ],
  data () {
    return {
      ui: {
        loading: false,
        optionShow: true,
        audioSelectorShow: false
      },
      totalPage: 1,
      filter: {
        appName: 'AUDIO'
      },
      form: {
        title: '',
        videoAbstract: '',
        thumb: '',
        albumType: 'audio',
        contentId: ''
      },
      list: [],
      audioList: [],
      selected: [],
      thumb: null
    }
  },
  methods: {
    clearList () {
      this.ui.audioSelectorShow = false
      this.selected = this.audioList.map(v => v)
    },
    getAlbum () {
      this.ui.loading = true
      this.$http.post('/cri-cms-platform/audio/albumGet.monitor', {
        id: this.id
      }).then(
        res => {
          this.form.title = res.album.title
          this.form.videoAbstract = res.album.videoAbstract
          this.form.thumb = res.album.thumb
          this.thumb = {
            id: 'cache',
            url: res.album.thumb
          }
          this.selected = res.content
          for (let i = 0; i < res.content.length; i++) {
            this.selected[i].thumb = JSON.parse(this.selected[i].thumb)
          }
          this.audioList = this.selected.map(v => v)
          this.ui.loading = false
        }
      )
    },
    getList (refresh) {
      if (refresh) this.filter.toPage = 1
      this.$http.post('/cri-cms-platform/special/getArticList.monitor', this.filter).then(res => {
        console.log(res)
        if (res.length) {
          res.forEach(val => {
            val.check = this.selected.some(v => {
              let oid = v.contentLayoutId || v.id
              return val.id === oid
            })
          })
        }
        this.list = res || []
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].thumb) {
            this.list[i].thumb = JSON.parse(this.list[i].thumb)
          }
        }
        this.totalPage = res.totalPage || 1
      }).catch(e => {
        console.log(e)
      })
    },
    onPrev () {
      let { filter } = this
      if (filter.toPage === 1) return
      filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1
    },
    onNext () {
      let { filter, totalPage } = this
      if (filter.toPage === totalPage) return
      filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1
    },
    onItemClick (item) {
      if (item.check) {
        item.check = false
        let index = this.selected.findIndex(v => {
          return v.id === item.id
        })
        this.selected.splice(index, 1)
      } else {
        item.check = true
        this.selected.push(item)
      }
    },
    selectVideo () {
      this.audioList = this.selected.map(v => v)
      this.ui.audioSelectorShow = false
    },
    submit () {
      let url = this.id ? '/cri-cms-platform/audio/albumUpdate.monitor' : '/cri-cms-platform/audio/albumSave.monitor'
      if (!this.form.title) {
        this.$toast('请输入标题')
        return
      }
      // if (!this.form.videoAbstract) {
      //   this.$toast('请输入摘要')
      //   return
      // }
      if (!this.thumb) {
        this.$toast('请选择封面')
        return
      }
      this.form.thumb = this.thumb.url
      if (this.id) {
        this.form.contentId = this.selected.map(v => v.contentLayoutId || v.id).join(',')
      } else {
        this.form.contentId = this.selected.map(v => v.id).join(',')
      }
      if (this.id) this.form.id = this.id
      this.$http.post(url, this.form).then(
        res => {
          let url = '/audio/album'
          if (this.id) url += `/${this.id}`
          this.$router.replace(url)
        }
      )
    }
  },
  created () {
    if (this.id) this.getAlbum()
  }
}
</script>

<style lang="less">
.app-audio-album-edit {
  .album-options{width: 320px;padding: 20px 0;background: #f8f8f8;transition: width .3s;
    textarea, input{border: none;width: 100%;outline: none;font-size: 14px;color: #444;resize: none;background: transparent;
      &::-webkit-input-placeholder{color: #999;}
    }
  }
  .option-item{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 12px 0;}
  .add-photo-btn{background: rgba(0, 0, 0, .06);border-radius: 5px;overflow: hidden;}
  .add-other-icon{margin-right: 10px;}
  .active {color: #018be6;}
  .datepicker::before {content: none}

  .audio-album-editor {max-width: 900px;margin: 0 auto;padding: 10px;
    .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
      &::-webkit-input-placeholder{color: #aaa;}
    }
    .selector {width: 100%;min-height: auto;
      .selector-add {width: 100%;height: 100%;background: rgba(0, 0, 0, .06);border-radius: 10px;
        &:hover {opacity: .8;}
      }
    }
    .list-item .list-thumb{width: 100px;height: 75px;margin-right: 15px;
      img {max-width: 100%;max-height: 100%;}
    }
    .layer-ctn {max-width: 1000px;
      .list-thumb {width: 80px;height: 60px;background: rgba(0, 0, 0, .07);margin-right: 10px;
        img {max-width: 100%;max-height: 100%;}
      }
      .item-check{position: absolute;right: 0;top: 0;z-index: 2;visibility: hidden;color: rgba(173, 173, 173, 0.8);padding: 3px;color: #008eff;}
      .check.item-check {visibility: visible;}
    }
    .list-item.on{background: #42aad8;color: #fff;
      span{color: rgba(255, 255, 255, .8);}
    }
  }
}
</style>
