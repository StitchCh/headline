<template>
  <div class="article-content c-6">
    <div class="art-ctn">{{id}}</div>
  </div>
</template>

<script>
export default {
  name: 'app-article-content',
  props: [ 'id' ],
  created () {
    // console.log(this.id)
  },
  updated () {
    // console.log(this.id)
    // this.getArticle()
  },
  methods: {
    getArticle () {
      this.$http.post('/cri-cms-platform/article/realtes.monitor', {
        selectedIds: this.id
      }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less">
.article-content{
  .art-ctn{max-width: 800px;margin: 0 auto;padding: 30px;}
}
</style>
