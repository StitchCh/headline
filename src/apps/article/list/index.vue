<template>
  <div class="flex flex-item">
    <af-center @add="$router.push('/articleAdd')" url="/cri-cms-platform/article/list.monitor">
      <div class="list-item a" slot-scope="slotProps">
        <div class="list-title flex-v-center">
          <i v-if="~~(slotProps.item.isRecommnd)" class="icon f-16 blue">thumb_up</i>
          <i v-if="~~(slotProps.item.hasThumb)" class="icon f-16 orange">image</i>
          <i v-if="~~(slotProps.item.isOriginal)" class="icon f-16 green">copyright</i>
          <span class="flex-item c-6 f-14 b">{{slotProps.item.title}}</span>
        </div>
        <div class="list-info f-12 c-8 flex-v-center">
          <span>{{slotProps.item.createDate}}</span>
          <span>{{slotProps.item.createUser}}</span>
          <span class="list-info-num">
            <i v-tooltip:top="'阅读'">6</i>/<i v-tooltip:top="'评论'">0</i>/<i v-tooltip:top="'分享'">0</i>
          </span>
          <span class="flex-item"></span>
          <i class="icon f-14 c-a">computer</i>
          <i class="icon f-14 c-a">phone_iphone</i>
          <i class="icon f-14 c-a">public</i>
        </div>
      </div>
    </af-center>
    <div class="flex-item flex-col">
      <div class="af-topbar flex-v-center">
        <div class="content-tool flex-v-center">
          <div class="tool-item"><icon-btn small v-tooltip:bottom="'查看'">remove_red_eye</icon-btn></div>
          <div class="tool-item"><icon-btn small v-tooltip:bottom="'推送'">open_in_browser</icon-btn></div>
          <div class="tool-item"><icon-btn small v-tooltip:bottom="'编辑'">edit</icon-btn></div>
          <div class="tool-item"><icon-btn small v-tooltip:bottom="'删除'">delete</icon-btn></div>
          <div class="tool-item"><icon-btn small v-tooltip:bottom="'二维码'"><img class="qr-icon" src="../../../assets/img/QR_code.svg"></icon-btn></div>
          <div class="tool-item"><icon-btn small v-tooltip:bottom="'复制并重新发布'">file_copy</icon-btn></div>
        </div>
        <div class="flex-item"></div>
        <account/>
      </div>
      <div class="flex-item scroll-y">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfCenter from '@/components/app-frame/afCenter'

export default {
  name: 'app-article-list',
  components: { Account, AfCenter },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      // TO DO
    }
  }
}
</script>

<style>

</style>
