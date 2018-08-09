<template>
  <div class="flex flex-item article-list">
    <af-center
      @add="$router.push('/articleAdd')"
      :scope="$route.query.scope"
      :status="$route.query.status"
      url="/cri-cms-platform/article/list.monitor"
      ref="afCenter">
      <div class="list-item a" slot-scope="slotProps" @click="onItemClick(slotProps.item)" :class="{'on': slotProps.item.id == $route.params.id}">
        <div class="list-title flex-v-center">
          <i v-if="~~(slotProps.item.isRecommnd)" class="icon f-16 blue">thumb_up</i>
          <i v-if="~~(slotProps.item.hasThumb)" class="icon f-16 orange">image</i>
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
          <i class="icon f-14 tg-icon c-a" v-if="~~slotProps.item.terminalPc">computer</i>
          <i class="icon f-14 tg-icon c-a" v-if="~~slotProps.item.terminalApp">phone_iphone</i>
          <i class="icon f-14 tg-icon c-a" v-if="~~slotProps.item.terminalWeb">public</i>
        </div>
      </div>
    </af-center>
    <div class="flex-item flex-col">
      <div class="af-topbar flex-v-center">
        <div v-if="$route.params.id" class="content-tool flex-v-center">
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'查看'">remove_red_eye</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'操作历史'" @click="showHistroy">schedule</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'统计'" @click="$router.push({path: `/article/list/${id}/statistics`, query: $route.query})">equalizer</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'推送'">open_in_browser</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'编辑'" @click="$router.push('/articleAdd?id='+$route.params.id)">edit</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'删除'" @click="deleteArticle">delete</icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'二维码'"><img class="qr-icon" src="../../../assets/img/QR_code.svg"></icon-btn>
          </div>
          <div class="tool-item">
            <icon-btn small v-tooltip:bottom="'复制并重新发布'" @click="copyArticle">file_copy</icon-btn>
          </div>
        </div>
        <div class="flex-item"></div>
        <account/>
      </div>
      <div class="flex-item scroll-y">
        <router-view/>
      </div>
    </div>

    <layer v-if="history.show" title="操作历史" width="600px">
      <div class="layer-text">
        <table>
          <thead>
            <th>操作</th>
            <th>操作人</th>
            <th>操作时间</th>
            <th>备注</th>
          </thead>
          <tbody>
            <tr v-for="operate in history.list" :key="operate.id">
              <td>{{operate.operate}}</td>
              <td>{{operate.operateUser}}</td>
              <td>{{operate.operateTime}}</td>
              <td>{{operate.remark}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="layer-btns">
        <btn flat color="#008cff" @click="history.show = false">关闭</btn>
      </div>
    </layer>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfCenter from '@/components/app-frame/afCenter'

export default {
  name: 'app-article-list',
  components: { Account, AfCenter },
  props: ['id'],
  data () {
    return {
      list: [],
      history: {
        show: false,
        id: '',
        list: []
      }
    }
  },
  methods: {
    onItemClick (item) {
      this.$router.replace({
        path: `/article/list/${item.id}`,
        query: this.$route.query
      })
    },
    showHistroy () {
      if (this.history.id === this.$route.params.id) {
        this.history.show = true
        return
      }
      this.history.id = this.$route.params.id
      this.$http.post('/cri-cms-platform/article/getOperateHistroy.monitor', { contentId: this.history.id }).then(
        res => {
          this.history.list = res
          this.history.show = true
        }
      )
    },
    copyArticle () {
      let that = this
      this.$confirm({
        text: '您确定要复制该文章并重新发布吗？',
        no () {},
        yes () {
          that.$http.post('/cri-cms-platform//article/copy.monitor', {
            contentId: that.id
          }).then(
            res => {
              that.$refs.afCenter.getList()
            }
          )
        }
      })
    },
    deleteArticle () {
      this.$confirm({
        title: '您确定要删除此文章吗？',
        text: `您可以从回收站中恢复。`,
        btns: ['取消', '删除'],
        color: 'red',
        yes: () => {
          this.$http.post('/cri-cms-platform/article/delete.monitor', {
            id: this.$route.params.id
          }).then(res => {
            this.$refs.afCenter.getList()
            this.$router.replace({
              path: '/article/list',
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
.article-list{
  .list-item.on{background: #73a9ea;color: #fff;
    .list-title span{color: #fff;}
    .list-info{color: rgba(255, 255, 255, .8)}
    .tg-icon{color: rgba(255, 255, 255, .8);}
  }
  .active {color: #018be6;}

  th,td {padding: 5px 10px;font-size: 14px;}
  tr {border-top: 1px solid #e1e1e1;}
  tr:hover {background: rgba(0, 0, 0, .07);}
}
</style>
