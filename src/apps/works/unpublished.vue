<template>
<div class="c-4 f-14 works-unpublished">
  <div class="card">
    <div class="flex-v-center" style="padding: 10px 0;border-bottom: 1px solid #ddd;">
      <i class="icon" style="margin-right: 10px;">view_carousel</i>
      <span>幻灯片</span>
    </div>
    <div style="padding: 10px 0 0">
      <div class="f-12 c-a t-center" v-if="!ppt.data.length">暂无数据</div>
      <ul>
        <li class="flex-v-center li-item" v-for="item in ppt.data" :key="item.id">
          <span class="flex-item">{{item.title}}</span>
        </li>
      </ul>
      <pagination
        v-if="ppt.totalPage > 1"
        :page="ppt.page"
        :size="size"
        :total="ppt.totalPage * size"
        @change="ppt.page=$event;getData(1)"
        style="border-top: 1px solid #eee;padding: 5px 0;"/>
    </div>
  </div>
  <div class="card">
    <div class="flex-v-center" style="padding: 10px 0;border-bottom: 1px solid #ddd;">
      <i class="icon" style="margin-right: 10px;">list</i>
      <span>列表</span>
    </div>
    <div style="padding: 10px 0 0">
      <div class="f-12 c-a t-center" v-if="!list.data.length">暂无数据</div>
      <ul>
        <li class="flex-v-center li-item" v-for="item in list.data" :key="item.id">
          <span class="flex-item">{{item.title}}</span>
        </li>
      </ul>
      <pagination
        v-if="list.totalPage > 1"
        :page="list.page"
        :size="size"
        :total="list.totalPage * size"
        @change="list.page=$event;getData(2)"
        style="border-top: 1px solid #eee;padding: 5px 0;"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'works-unpublished',
  data () {
    return {
      size: 10,
      list: {
        page: 1,
        totalPage: 0,
        data: []
      },
      ppt: {
        page: 1,
        totalPage: 0,
        data: []
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
    '$route.query.channelId' () {
      this.getList()
    }
  },
  methods: {
    getList () {
      this.getData(1)
      this.getData(2)
    },
    getData (type) {
      let { list, ppt } = this
      this.$http.post('/cri-cms-platform/issue/getChannelContentList.monitor', {
        // type: type,
        pageSize: this.size,
        toPage: type === 1 ? ppt.page : list.page,
        channelId: this.$route.query.channelId
      }).then(res => {
        let name = type === 1 ? 'ppt' : 'list'
        this[name].data = res.data
        this[name].totalPage = res.totalPage
      }).catch(e => {
        this.$toast(e.msg)
      })
    }
  }
}
</script>

<style lang="less">
.works-unpublished{
  padding: 0 20px 20px 20px;
  .card{border-radius: 5px;box-shadow: none;margin-bottom: 15px;padding: 0 15px;}
  .li-item{line-height: 1em;padding: 8px;
    &:hover{background: #eee;}
  }
}
</style>
