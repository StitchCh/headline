<template>
<div class="c-6 f-14 works-unpublished">
  <div class="flex" style="width: 100%;">
    <div class="left flex-item" style="width: 50%;">
      <div class="card relative">
        <div v-if="loading" class="abs flex-center"><loading size="30"/></div>
        <div class="f-12 c-a t-center" v-if="!data.length && !loading">暂无数据</div>
        <div class="flex-v-center card-title">
          <div class="b blue flex-item">{{ filterChannelId ? '当前频道' : '所有频道'}}未发布</div>
          <btn outline v-if="filterChannelId" @click="filterChannelId=false">所有文章</btn>
          <btn outline v-else @click="filterChannelId=true">当前频道文章</btn>
        </div>
        <ul>
          <li class="flex-v-center li-item" v-for="item in data" :key="item.id">
            <span class="flex-item li-title">{{item.title}}</span>
            <icon-btn small
              @click="checkItem(item)"
              :disabled="checkedId.includes(item.id)"
            >arrow_forward</icon-btn>
          </li>
        </ul>
        <pagination
          v-if="totalPage > 1"
          :page="page"
          :size="size"
          :total="totalPage * size"
          @change="page=$event;getData(1)"
          style="border-top: 1px solid #eee;padding: 5px 0;"
        />
      </div>
    </div>
    <div class="right" style="width: 50%;">
      <div class="card flex-item" style="margin-left: 5px;">
        <div class="flex-v-center card-title">
          <div class="b blue flex-item">已选择</div>
          <btn >确定选取</btn>
        </div>
        <ul>
          <li class="flex-v-center li-item" v-for="item in checked" :key="item.id">
            <span class="flex-item li-title">{{item.title}}</span>
            <icon-btn small @click="unCheckItem(item)">close</icon-btn>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'works-unpublished',
  data () {
    return {
      loading: false,
      size: 30,
      page: 1,
      totalPage: 0,
      filterChannelId: true,
      data: [],
      checked: []
    }
  },
  created () {
    this.getList()
  },
  watch: {
    '$route.query.channelId' () {
      this.getList()
    },
    filterChannelId () {
      this.getList()
    }
  },
  computed: {
    checkedId () {
      return this.checked.map(item => item.id)
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/issue/getChannelContentList.monitor', {
        // type: type,
        pageSize: this.size,
        toPage: this.page,
        channelId: this.$route.query.channelId,
        filterChannelId: this.filterChannelId
      }).then(res => {
        this.loading = false
        res.data.forEach(item => { item.checked = false })
        this.data = res.data
        this.totalPage = res.totalPage
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    checkItem (item) {
      this.checked.push(item)
    },
    unCheckItem (item) {
      let i = this.checked.indexOf(item)
      this.checked.splice(i, 1)
    }
  }
}
</script>

<style lang="less">
.works-unpublished{
  padding: 0 20px 20px 20px;
  .card{border-radius: 5px;box-shadow: none;margin-bottom: 15px;padding: 15px;overflow: hidden;white-space: nowrap;max-width: 100%;}
  .li-item{line-height: 1em;
    &:hover{background: #eee;}
  }
  .li-title{text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;padding: 10px;}
  .card-title{padding: 0 10px 10px;border-bottom: 1px solid #eee;}
}
</style>
