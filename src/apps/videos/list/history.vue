<template>
  <div class="relative video-history c-6">
    <div class="video-history-content">
      <table>
        <thead>
        <th>操作</th>
        <th>操作人</th>
        <th>操作时间</th>
        </thead>
        <tbody>
        <tr v-for="operate in list" :key="operate.id">
          <td>{{operate.remark}}</td>
          <td>{{operate.operateUser}}</td>
          <td>{{operate.operateTime}}</td>
        </tr>
        <tr v-if="!list.length">
          <td colspan="4" style="padding: 50px;">
            <no-data></no-data>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-video-history',
  props: ['id'],
  data () {
    return {
      list: [],
      channels: []
    }
  },
  methods: {
    getList () {
      if (!this.id) return
      this.$http.post('/cri-cms-platform/video/getOperateHistroy.monitor', { contentId: this.id }).then(
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
.video-history {height: 100%;overflow: auto;
  .video-history-content {
    max-width: 900px;margin: 0 auto;padding: 20px 0;
  }
}
</style>
