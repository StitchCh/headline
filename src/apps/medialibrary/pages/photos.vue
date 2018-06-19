<template>
<div class="abs flex-item flex media-photos">
  <media-left-tree/>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center" style="height:36px;">
      <div class="search-bar flex-v-center">
        <i class="icon f-20 c-a">search</i>
        <input type="text" class="f-14 c-6" placeholder="搜索">
      </div>
      <div class="flex-item"></div>
      <div class="flex-v-center opera-btns">
        <span class="a blue">全选</span>
        <span class="a blue">批量删除</span>
        <span class="a blue">上传</span>
      </div>
    </div>
    <div class="flex-item relative scroll-y">
      <div v-if="!list.length" class="abs flex-center">
        <no-data/>
      </div>
      <div class="media-group" v-for="group in list" :key="group.date">
        <div class="media-group-title">{{group.date}}</div>
        <ul class="flex">
          <li class="photos-item relative" v-for="item in group.data" :key="item.id" @click="onItemClick">
            <check-box></check-box>
            <img src="../../../assets/img/bg.png" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-v-center">
      <div class="flex-item"></div>
      <loading size="25"/>
      <div class="up-progress-bar">
        <div style="width: 50%;"></div>
      </div>
      <span class="f-12">1 个文件正在上传</span>
    </div>
  </div>
  <media-preview v-if="ui.viewerShow" @close="ui.viewerShow=false"/>
  <!-- <image-editor/> -->
</div>
</template>

<script>
import MediaLeftTree from '../components/leftTree'
import MediaPreview from '../components/mediaPreview'
import ImageEditor from '../components/imageEditor'

export default {
  name: 'media-photos',
  components: { MediaLeftTree, MediaPreview, ImageEditor },
  data () {
    return {
      list: [],
      ui: {
        viewerShow: false
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
    '$route.query' () {
      this.getList()
    }
  },
  methods: {
    getList () {
      let type = this.$route.meta.type
      let folderId = this.$route.query.folderId || ''
      this.$http.post('/cri-cms-platform/media/list.monitor', {
        type,
        folderId,
        toPage: 1,
        pageSize: 30
      }).then(res => {
        this.list = res.data || []
      })
    },
    onItemClick (e) {
      this.ui.viewerShow = true
    }
  }
}
</script>

<style lang="less">
.media-photos{
  .photos-item{height: 160px;border-radius: 5px;overflow: hidden;
    img{height: 100%;width: auto;}
    .check-box{margin: 0;position:absolute;right: 5px;top: 10px;opacity: 0;}
    &:hover .check-box{opacity: 1;}
  }
}
</style>
