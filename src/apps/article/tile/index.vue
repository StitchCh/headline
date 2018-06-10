<template>
  <div class="flex-item flex-col f-14 article-tile">
    <div class="af-topbar flex-v-center">
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item flex-col">
      <div class="t-center" style="padding: 15px 0;"><input class="f-14 search" type="text" placeholder="输入关键字"/></div>
      <div class="box flex-item scroll-y">
        <ul class="flex" ref="ul" style="flex-wrap: wrap;padding-bottom: 50px;" :style="{paddingLeft: (width - (240 * ~~((width - 80) / 240))) * 0.5 + 'px'}">
          <li v-for="(item, i) in 12" :key="i" class="a" @click="$router.push('/articleAdd')">
            <div class="cover"></div>
            <div class="flex-v-center item-info">
              <div class="flex-item" style="overflow: hidden;">
                <div class="c-6 item-name">测试名称测试名称测试名称测试名称</div>
                <div class="f-12 c-8">2018-09-08 18:00:08</div>
              </div>
              <icon-btn class="c-c" @click.native="deleteItem($event, item)">delete</icon-btn>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
// import dra from '@/components/account'

export default {
  name: 'app-article-tile',
  components: { Account },
  data () {
    return {
      width: 0,
      filter: {
        scope: 'my',
        status: 'REJECT',
        pageSize: 30,
        toPage: 1,
        searchby: 'title',
        search: ''
      }
    }
  },
  watch: {
    '$route.query' (query) {
      let { filter } = this
      if (query.scope !== filter.scope || query.status !== filter.status) {
        filter.scope = query.scope
        filter.status = query.status
        this.getList(true)
      }
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.width = this.$refs.ul.clientWidth
    },
    deleteItem (e, item) {
      e.stopPropagation()
      this.$confirm({
        title: '您确定要删除此草稿吗？',
        text: '删除后可在回收站找回。',
        btns: ['取消', '删除'],
        color: 'red'
      })
    },
    getList (refresh) {
      if (refresh) this.filter.toPage = 1
      this.$http.post('/cri-cms-platform/article/list.monitor', this.filter).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
.article-tile{
  .search{width: 300px;line-height: 32px;border:1px solid #ddd;border-radius: 20px;padding: 0 20px;}
  li{width: 210px;margin: 15px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);border-radius: 6px;overflow: hidden;transition: box-shadow .3s;}
  li:hover{box-shadow: 0 0 3px 1px rgba(0, 0, 0, .05), 0 10px 30px rgba(0, 0, 0, .15);
    .icon{color: rgb(255, 115, 115);}
  }
  .cover{width: 210px;height: 210px;background: #eee;}
  .item-info{padding: 10px;}
  .item-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
}
</style>
