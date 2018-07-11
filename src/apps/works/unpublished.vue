<template>
<div class="c-4 f-14 works-unpublished">
  <div class="card">
    <div class="flex-v-center" style="padding: 10px 0;border-bottom: 1px solid #ddd;">
      <i class="icon" style="margin-right: 10px;">view_carousel</i>
      <span>幻灯片</span>
    </div>
    <div style="padding: 10px 0">
      <div class="f-12 c-a t-center">暂无数据</div>
    </div>
  </div>

  <div class="card">
    <div class="flex-v-center" style="padding: 10px 0;border-bottom: 1px solid #ddd;">
      <i class="icon" style="margin-right: 10px;">list</i>
      <span>列表</span>
    </div>
    <div style="padding: 10px 0">
      <div class="f-12 c-a t-center">暂无数据</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'works-unpublished',
  data () {
    return {
      list: [],
      ppts: []
    }
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/issue/getChannelContentList.monitor', {
        type: ''
      })
    }
  }
}
</script>

<style lang="less">
.works-unpublished{
  padding: 0 20px 20px 20px;
  .card{border-radius: 5px;box-shadow: none;margin-bottom: 15px;padding: 0 15px;}
}
</style>
