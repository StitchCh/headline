<template>
<div class="c-4 works-unpublished">
  <div class="card flex-center"><no-data/></div>
</div>
</template>

<script>
export default {
  name: 'works-unpublished',
  data () {
    return {
      list: []
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
  .card{border-radius: 5px;padding: 20px;box-shadow: none;}
}
</style>
