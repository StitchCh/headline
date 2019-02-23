<template>
<div class="abs flex-item flex media-audios">
  <media-left-tree :select-mode="selectMode" @changeFolder="getList" type="1"/>
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
        <btn v-if="$route.path === '/media'" flat :disabled="!selected.length" color="#008eff" @click="del">批量删除</btn>
        <media-upload :type="1" @uploaded="onUploaded" :folder-id="$route.query.folderId || 0"/>
      </div>
    </div>
    <div class="flex-item relative scroll-y">
      <div v-if="loading" class="abs flex-center bg-light-rgb-2" style="z-index: 20;"><loading/></div>
      <div v-if="!list.length && !loading" class="abs flex-center"><no-data/></div>
      <div class="media-group" v-for="group in list" :key="group.date">
        <div class="media-group-title">{{group.date}}</div>
        <ul class="flex">
          <li class="audios-item relative a" v-for="item in group.data" :key="item.id" :class="{'checked': item.checked}" @click="onItemClick(item)">
            <i class="icon item-check a" @click.stop="selectItem(item)">check_circle</i>
            <div class="audios-item-cover flex-v-center" :style="{ backGround: item.thumb ? origin + item.thumb : '' }">
              <i class="icon c-f">audiotrack</i>
              <span class="flex-item t-right c-f">{{item.duration | time}}</span>
            </div>
            <div class="audios-item-name f-14">{{item.alias}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-center">
      <pagination :page="page" :size="size" :total="total" @change="onPageChange"></pagination>
    </div>
  </div>
</div>
</template>

<script>
import MediaLeftTree from '../components/leftTree'
import MediaUpload from '../components/upload'
import debounce from 'lodash/debounce'

const origin = 'http://60.247.77.208:58088'

export default {
  name: 'media-audios',
  components: { MediaLeftTree, MediaUpload },
  props: {
    selectMode: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      origin,
      loading: true,
      page: 1,
      size: 50,
      total: 0,
      list: []
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
    getList (id) {
      this.loading = true
      let type = this.selectMode ? '1' : this.$route.meta.type
      let folderId = this.$route.query.folderId || ''
      if (this.selectMode) folderId = id || ''
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
        this.list = res.data || []
        console.log(this.list)
        this.loading = false
      })
    },
    onItemClick (item) {
      this.$emit('preview', {
        type: 1,
        list: this.allList,
        index: this.allList.indexOf(item)
      })
    },
    selectItem (item) {
      if (this.singleSelect) this.cancelSelect()
      item.checked = !item.checked
    },
    cancelSelect () {
      this.list.forEach(li => {
        li.data.forEach(item => {
          item.checked = false
        })
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
            type: '1'
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
    onPageChange (e) {
      this.page = parseInt(e)
      this.getList()
    }
  },
  created () {
    this.getList()
  },
  watch: {
    '$route.query' () {
      this.getList()
    }
  }
}
</script>

<style lang="less">
.media-audios{
  .audios-item{width: 200px;border-radius: 8px;outline: none;
    &:hover .item-check{visibility: visible;}
    &.checked {
      .item-check{visibility: visible;color: #008eff;}
      .audios-item-cover{transform: scale(.85);}
    }
  }
  .audios-item-cover{height: 60px;background: #79b6ff;padding: 0 15px;border-radius: 5px;transition: transform .2s;will-change: transform;}
  .audios-item-name{margin-top: 5px;max-height: 46px;overflow: hidden;}
  .item-check{position: absolute;right: 0;top: 0;z-index: 2;visibility: hidden;color: rgba(160, 160, 160, 0.9);padding: 3px;}
}
</style>
