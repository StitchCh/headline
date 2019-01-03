<template>
  <div>
    {{$route.query.channelId}}
    <div v-for="item in list">{{item}}</div>
  </div>
</template>

<script>
  export default {
    name: 'history',
    data () {
      return {
        list: [],
      }
    },
    mounted () {
      this.$http.post('/cri-cms-platform/issue/getIssueLog.monitor', {
        channelId: this.$route.query.channelId
      }).then(res => {
        console.log(res)
        this.list = res
      })
    }
  }
</script>

<style scoped>

</style>
