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
      <span class="f-14" v-if="selected.length" style="margin-right: 10px;">已选择 {{selected.length}} 项</span>
      <btn flat v-if="selected.length" color="#008eff" @click="cancelSelect">取消选择</btn>
      <div class="flex-v-center opera-btns">
        <!-- <span class="a blue">全选</span> -->
        <btn flat :disabled="!selected.length" color="#008eff" @click="del">批量删除</btn>
        <media-upload :type="0" @uploaded="onUploaded" :folder-id="$route.query.folderId || 0"/>
        <!-- <span class="a blue"></span> -->
        <!-- <label>
          <span class="btn btn-flat blue a b" style="padding: 7px 10px;color: #008eff;">上传</span>
          <input type="file" multiple accept="image/png, image/jpeg, image/gif, image/jpg" style="display:none;">
        </label> -->
      </div>
    </div>
    <div class="flex-item relative scroll-y">
      <div v-if="loading" class="abs flex-center bg-light-rgb-2" style="z-index: 20;"><loading/></div>
      <div v-if="!list.length && !loading" class="abs flex-center"><no-data/></div>
      <div class="media-group" v-for="group in list" :key="group.date">
        <div class="media-group-title">{{group.date}}</div>
        <ul class="flex">
          <li class="photos-item relative"
            v-for="item in group.data"
            :key="item.id"
            :class="{'checked': item.checked}"
            :style="{width: item.width * 150 / item.height + 'px', height: '150px'}">
            <i class="icon item-check a" @click="item.checked=!item.checked">check_circle</i>
            <img :src="imgOrigin + item.filePath + item.fileName" @click="onItemClick(item)">
            <div class="img-name c-f f-12">{{item.alias}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar">
      <pagination :page="page" :size="size" :total="total" @change="onPageChange"></pagination>
    </div>
  </div>
  <!-- <image-editor/> -->
</div>
</template>

<script>
import MediaLeftTree from '../components/leftTree'
import ImageEditor from '../components/imageEditor'
import MediaUpload from '../components/upload'
import debounce from 'lodash/debounce'

const IMG_ORIGIN = 'http://60.247.77.208:58088'

export default {
  name: 'media-photos',
  components: { MediaLeftTree, ImageEditor, MediaUpload },
  data () {
    return {
      loading: false,
      page: 1,
      size: 50,
      total: 0,
      fileList: [],
      list: [],
      imgOrigin: IMG_ORIGIN
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
  computed: {
    selected () {
      let res = []
      this.list.forEach(li => {
        li.data.forEach(item => {
          if (item.checked) res.push(item)
        })
      })
      return res
    },
    allList () {
      let res = []
      let { list } = this
      list.forEach(li => {
        li.data.forEach(item => {
          res.push(item)
        })
      })
      return res
    }
  },
  methods: {
    getList () {
      this.loading = true
      let type = this.$route.meta.type
      let folderId = this.$route.query.folderId || ''
      this.$http.post('/cri-cms-platform/media/list.monitor', {
        type,
        folderId,
        toPage: this.page,
        pageSize: this.size
      }).then(res => {
        res.data.forEach(data => {
          data.data.forEach(item => {
            item.checked = false
          })
        })
        this.total = res.totalPage * this.size
        this.loading = false
        this.list = res.data || []
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    onPageChange (e) {
      this.page = parseInt(e)
      this.getList()
    },
    onItemClick (item) {
      this.$emit('preview', {
        type: 0,
        list: this.allList,
        index: this.allList.indexOf(item)
      })
    },
    del () {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除这 ${this.selected.length} 项吗？`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.post('/cri-cms-platform/media/del.monitor', {
            id: this.selected.map(item => item.id).toString(),
            type: '0'
          }).then(res => {
            this.getList()
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    },
    onUploaded: debounce(function () {
      if (this.page === 1) this.getList()
    }, 1000),
    cancelSelect () {
      this.list.forEach(li => {
        li.data.forEach(item => {
          item.checked = false
        })
      })
    }
  }
}
</script>

<style lang="less">
.media-photos{
  .photos-item{height: 150px;overflow: hidden;background: #eee;min-width: 40px;
    .img-name{position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, .7);width: 100%;line-height: 1em;padding: 6px;transform: translateY(24px);
      overflow: hidden;text-overflow: ellipsis;white-space: nowrap;transition: all .2s;}
    img{height: 100%;width: 100%;transition: transform .2s;will-change: transform;}
    .item-check{position: absolute;right: 0;top: 0;z-index: 2;visibility: hidden;color: rgba(173, 173, 173, 0.8);padding: 3px;}
    &:hover{
      .item-check{visibility: visible;}
      .img-name{transform: translateY(0)}
    }
    &.checked{
      .item-check{visibility: visible;color: #008eff;}
      img{transform: scale(.85);}
    }
  }
}
</style>
