<template>
  <div class="relative article-history c-6">
    <div class="article-history-content">
      <table>
        <thead>
        <th>操作</th>
        <th>操作人</th>
        <th>操作时间</th>
        <th>备注</th>
        </thead>
        <tbody>
        <tr v-for="operate in list" :key="operate.id">
          <td>{{operate.operate}}</td>
          <td>{{operate.operateUser}}</td>
          <td>{{operate.operateTime}}</td>
          <td>{{operate.remark}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-article-history',
  props: ['id'],
  data () {
    return {
      list: []
    }
  },
  methods: {
    getList () {
      if (!this.id) return
      this.$http.post('/cri-cms-platform/link/getOperateHistroy.monitor', { contentId: this.id }).then(
        res => {
          this.list = res
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
.article-history {height: 100%;overflow: auto;
  .article-history-content {
    max-width: 900px;margin: 0 auto;padding: 20px 0;
    /*th,td {text-align: center;}*/
  }
}
</style>
