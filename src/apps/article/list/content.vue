<template>
  <div class="relative article-content c-6">
    <div v-if="!content.id" class="abs flex-center" style="height: 400px;">
      <no-data/>
    </div>
    <div class="art-ctn" v-else>
      <h1 class="b" :style="{ color: content.titleColor }">{{content.title}}</h1>
      <div class="f-14 c-a art-info">
        <span>{{content.createDate}}</span>
        <span>作者：{{content.author}}</span>
        <span>创建者：{{content.createUser}}</span>
      </div>
      <div class="f-14" v-html="article.content"></div>
      <div class="art-relate f-14">
        <div class="b c-8" style="margin-bottom: 10px;">相关阅读：</div>
        <ul>
          <li v-for="item in relateArticle" :key="item.id">
            <a class="a c-8" @click="toLink(item)">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-article-content',
  props: [ 'id' ],
  data () {
    return {
      content: {},
      article: {},
      relateArticle: []
    }
  },
  created () {
    this.getArticle()
  },
  watch: {
    id () {
      this.getArticle()
    }
  },
  methods: {
    getArticle () {
      this.$http.post('/cri-cms-platform/article/get.monitor', {
        id: this.id
      }).then(res => {
        this.content = res.content || {}
        this.article = res.article || {}
        this.relateArticle = res.relateArticle || []
      }).catch(e => {
        this.content = {}
        this.article = {}
        this.relateContents = []
      })
    },
    toLink (item) {
      this.$router.push({
        path: `/article/list/${item.id}`,
        query: this.$route.query
      })
    }
  }
}
</script>

<style lang="less">
.article-content{
  h1{line-height: 1.3em;font-size: 26px;}
  .art-ctn{max-width: 900px;margin: 0 auto;padding: 30px;}
  .art-info span{margin-right: 15px;}
  .art-relate{margin-top: 20px;border: 1px solid #ddd;padding: 10px 20px;border-radius: 8px;
    li{padding: 2px 0;}
    a{text-decoration: none;}
    a:hover{text-decoration: underline;}
  }
}
</style>
