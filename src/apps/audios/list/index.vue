<template>
  <div class="flex flex-item audio-list">
    <af-center
      @add="openWindow('/audioAdd')"
      :status="$route.query.status"
      @getListEnd="onItemClick"
      url="/cri-cms-platform/audio/queryList.monitor"
      ref="afCenter">
      <div class="list-item flex-v-center a" slot-scope="slotProps" @click="onItemClick(slotProps.item, slotProps.index)" :class="{'on': slotProps.item.id == $route.params.id}">
        <div class="list-thumb flex-center">
          <img v-if="slotProps.item.thumb.length" :src="slotProps.item.thumb[0].url" alt="">
        </div>
        <div class="flex-item">
          <div class="list-title flex-center">
            <i v-if="~~(slotProps.item.isRecommnd)" class="icon f-16 blue">thumb_up</i>
            <!-- <i v-if="~~(slotProps.item.hasThumb)" class="icon f-16 orange">image</i> -->
            <i v-if="~~(slotProps.item.isOriginal)" class="icon f-16 green">copyright</i>
            <span class="flex-item c-6 f-14 b">{{slotProps.item.title}}</span>
          </div>
          <div class="list-info f-12 c-8 flex-v-center">
            <span>{{slotProps.item.createDate}}</span>
            <span>{{slotProps.item.createUser}}</span>
          </div>
          <div class="list-info f-12 c-8 flex-v-center">
          <span class="list-info-num">
            <i v-tooltip:top="'阅读'">{{slotProps.item.pv}}</i>/<i v-tooltip:top="'评论'">{{slotProps.item.commentCount}}</i>/<i v-tooltip:top="'分享'">{{slotProps.item.shareCount}}</i>/<i v-tooltip:top="'点赞'">{{slotProps.item.diggCount}}</i>
          </span>
            <span class="flex-item"></span>
            <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~slotProps.item.terminalPc }">computer</i>-->
            <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~slotProps.item.terminalApp }">phone_iphone</i>-->
            <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~slotProps.item.terminalWeb }">public</i>-->
          </div>
        </div>
      </div>
    </af-center>
    <div class="flex-item flex-col">
      <div class="af-topbar flex-v-center">
        <div v-if="$route.params.id" class="content-tool flex-v-center">
          <!-- <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'查看'">remove_red_eye</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'推送'">open_in_browser</icon-btn>
          </div> -->
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'编辑'" @click="openWindow(`/audioEdit/audio/${id}`)">edit</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'删除'" @click="deleteAudio">delete</icon-btn>
          </div>
          <div class="tool-item relative">
            <icon-btn small v-tooltip:bottom="'二维码'" @click="ui.qrcodeShow=!ui.qrcodeShow"><img class="qr-icon" src="../../../assets/img/QR_code.svg"></icon-btn>
            <bubble v-if="ui.qrcodeShow" @close="ui.qrcodeShow=false">
              <div style="width: 200px;height: 200px;">
                <img :src="qrcode(id)">
              </div>
            </bubble>
          </div>

          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'链接'" @click="getLinkList(id)">link</icon-btn>
          </div>
          <!--<div class="tool-item">-->
            <!--<icon-btn small v-tooltip:bottom="'复制并重新发布'" @click="copyAudio">file_copy</icon-btn>-->
          <!--</div>-->
        </div>
        <div class="flex-item"></div>
        <account/>
      </div>
      <div class="flex-item flex-col">
        <div v-if="id" class="flex-center" style="height: 60px;">
          <div class="tab">
            <div class="tab-item" :class="{ on: $route.name === 'AudioContent' }" @click="$router.replace({path: `/audio/list/${id}`, query: $route.query})">内容</div>
            <!--<div class="tab-item" :class="{ on: $route.name === 'AudioStatistics' }" @click="$router.replace({path: `/audio/list/${id}/statistics`, query: $route.query})">统计</div>-->
            <div class="tab-item" :class="{ on: $route.name === 'AudioHistory' }" @click="$router.replace({path: `/audio/list/${id}/history`, query: $route.query})">历史</div>
          </div>
        </div>
        <router-view :channels="channels"/>
      </div>
    </div>


    <div v-if="urlListShow" @click="urlListShow = false" class="urlList">
      <div @click.stop class="urlList_box">
        <ul v-if="urlList.length > 0">
          <li v-for="(item, index) in urlList" class="urlList_list">
            <p class="newTitle"><span style="margin-right: 10px;">{{index + 1}}.</span>{{item.newTitle}}</p>
            <p class="newUrl">{{item.url}}</p>
          </li>
        </ul>
        <div  v-if="urlList.length <= 0" style="padding: 20px;text-align: center;line-height: 340px;">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfCenter from '@/components/app-frame/afCenter'

export default {
  name: 'app-audio-list',
  components: { Account, AfCenter },
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      urlList: [],
      urlListShow: false,
      ui: {
        qrcodeShow: false
      }
    }
  },
  methods: {
    getLinkList (id) {
      this.$http.post('/cri-cms-platform/audio/published.monitor', { id }).then(res => {
        this.urlList = res
        this.urlListShow = true
      })
    },
    onItemClick (item, index) {
      sessionStorage.setItem("viewScroll", index * 85 - 100 )
      this.$router.replace({
        path: `/audio/list/${item.id}`,
        query: this.$route.query
      })
    },
    copyAudio () {
      let that = this
      this.$confirm({
        text: '您确定要复制该音频并重新发布吗？',
        no () {},
        yes () {
          that.$http.post('/cri-cms-platform//article/copy.monitor', {
            contentId: that.id
          }).then(
            res => {
              that.$router.push({
                path: `/audioEdit/audio/${res.id}`,
              })
            }
          )
        }
      })
    },
    deleteAudio () {
      this.$confirm({
        title: '您确定要删除此音频吗？',
        text: `您可以从回收站中恢复。`,
        btns: ['取消', '删除'],
        color: 'red',
        yes: () => {
          this.$http.post('/cri-cms-platform/audio/del.monitor', {
            id: this.id
          }).then(res => {
            this.$refs.afCenter.getList()
            this.$router.replace({
              path: '/audio/list',
              query: this.$route.query
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.audio-list {
  .list-item.on{background: #42aad8;color: #fff;
    .list-title span{color: #fff;}
    .list-info{color: rgba(255, 255, 255, .8)}
    .tg-icon{color: rgba(255, 255, 255, .8);}
  }
  .list-thumb {width: 80px;height: 60px;background: rgba(0, 0, 0, .07);margin-right: 10px;
    img {max-width: 100%;max-height: 100%;}
  }
  .active {color: #018be6;}

  th,td {padding: 5px 10px;font-size: 14px;}
  tr {border-top: 1px solid #e1e1e1;}
  tr:hover {background: rgba(0, 0, 0, .07);}
}
</style>
