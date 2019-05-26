<template>
<div class="abs flex-item flex media-photos">
  <media-left-tree :select-mode="selectMode" @changeFolder="getList"/>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center" style="height:36px;">
      <div class="search-bar flex-v-center">
        <i class="icon f-20 c-a">search</i>
        <input style="width: 100px;margin-right: 10px;" v-model="secrchName" type="text" class="f-14 c-6" placeholder="输入图片名称">
        <vue-datepicker-local v-model="searchTime" format="YYYY-MM-DD" show-buttons></vue-datepicker-local>
        <span style="cursor: pointer;color: #0299ff;margin-left: 10px;" @click="getList">搜索</span>
      </div>

      <div class="flex-item"></div>
      <span class="f-14" v-if="selected.length" style="margin-right: 10px;">已选择 {{selected.length}} 项</span>
      <btn flat v-if="selected.length" color="#008eff" @click="cancelSelect">取消选择</btn>

      <!--<btn style="margin-left: 10px;" @click="search">搜索</btn>-->
      <div class="relative" style="padding: 0 4px;">
        <btn @click="scaleshow = true" color="#008eff" flat>筛选</btn>
        <bubble v-if="scaleshow" @close="scaleshow = false">
          <ul class="f-14 c-5" style="padding: 4px 0;width: 60px;text-align: center;line-height: 24px;">
            <li class="a flex-v-center listhover" @click="setScale('all')">
              <span class="flex-item">全部</span>
            </li>
            <li class="a flex-v-center listhover" @click="setScale('16:9')">
              <span class="flex-item">16:9</span>
            </li>
            <li class="a flex-v-center listhover" @click="setScale('4:3')">
              <span class="flex-item">4:3</span>
            </li>
            <li class="a flex-v-center listhover" @click="setScale('2:1')">
              <span class="flex-item">2:1</span>
            </li>
            <li class="a flex-v-center listhover" @click="setScale('1:1')">
              <span class="flex-item">1:1</span>
            </li>
            <li class="a flex-v-center listhover" @click="setScale('其他')">
              <span class="flex-item">其他</span>
            </li>
          </ul>
        </bubble>
      </div>
      <div class="flex-v-center opera-btns">
        <!-- <span class="a blue">全选</span> -->
        <btn v-if="$route.path === '/media/' || $route.path === '/media'" flat :disabled="!selected.length" color="#008eff" @click="del">删除</btn>
        <media-upload :type="0" @uploaded="onUploaded" :folder-id="$route.query.folderId || 0"/>
        <!-- <span class="a blue"></span> -->
        <!-- <label>
          <span class="btn btn-flat blue a b" style="padding: 7px 10px;color: #008eff;">上传</span>
          <input type="file" multiple accept="image/png, image/jpeg, image/gif, image/jpg" style="display:none;">
        </label> -->
      </div>
    </div>
    <div class="flex-item relative scroll-y" ref="scbox">
      <div v-if="loading" class="abs flex-center bg-light-rgb-2" style="z-index: 20;"><loading/></div>
      <div v-if="!list.length && !loading" class="abs flex-center"><no-data/></div>
      <div class="media-group" v-for="group in list" :key="group.date">
        <div class="media-group-title">{{group.date}}</div>
        <ul class="flex">
          <li class="photos-item relative"
            v-for="item in group.data"
            :key="item.id"
            :class="{'checked': item.checked}"
            :style="{width: item.width * 100 / item.height + 'px', height: '100px'}">
            <i class="icon item-check a" @click="selectItem(item)">check_circle</i>
            <img :src="imgOrigin + item.filePath + item.fileName" @click="onItemClick(item)">
            <div class="img-name c-f f-12">{{item.alias}}</div>
            <p class="photos-scale">{{item.scale}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-center">
      <pagination :page="page" :size="size" :total="total" @change="onPageChange"></pagination>
    </div>
  </div>
   <!--<image-editor/>-->
</div>
</template>

<script>
import MediaLeftTree from '../components/leftTree'
import ImageEditor from '../components/imageEditor'
import MediaUpload from '../components/upload'
import debounce from 'lodash/debounce'
import VueDatepickerLocal from 'vue-datepicker-local'
import moment from 'moment'

// const IMG_ORIGIN = 'http://60.247.77.208:58088'

export default {
  name: 'media-photos',
  components: { MediaLeftTree, ImageEditor, MediaUpload, VueDatepickerLocal, moment },
  props: {
    scale: {
      type: Boolean,
      default: false
    },
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
      secrchName: '',
      scaleshow: false,
      loading: false,
      page: 1,
      size: 50,
      total: 0,
      fileList: [],
      searchTime: [],
      list: [],
      imgOrigin: '',
      scaleType: ''
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
    sctop () {
      this.$refs.scbox.scrollTo(0, 0)
    },
    getList (id, changeItem) {
      this.loading = true
      let type = this.selectMode ? '0' : this.$route.meta.type
      let folderId = this.$route.query.folderId || ''
      if (this.selectMode) folderId = id || ''
      let startDate = ''
      let endDate = ''
      if (this.searchTime.length == 2) {
        startDate = moment(this.searchTime[0]).format('YYYY-MM-DD')
        endDate = moment(this.searchTime[1]).format('YYYY-MM-DD')
      }
      console.log(startDate, endDate)
      this.$http.post('/cri-cms-platform/media/list.monitor', {
        type,
        folderId,
        toPage: this.page,
        pageSize: this.size,
        scale: this.scaleType,
        alias: this.secrchName,
        startDate: startDate,
        endDate: endDate
      }).then(res => {
        console.log(res.data)
        res.data.forEach(data => {
          data.data.forEach(item => {
            item.checked = false
          })
        })
        this.total = res.totalPage * this.size
        this.list = res.data || []
        this.imgOrigin = res.suffix
        this.loading = false
        if (changeItem) {
          this.list[0].data.forEach(item => {
            if (item.id == changeItem.id) {
              item.checked = true
            }
          })
        }
        console.log(changeItem)
        console.log(this.list)
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    setScale (type) {
      this.scaleType = type == 'all' ? '' : type
      this.getList()
      this.scaleshow = false
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
    }
  }
}
</script>

<style lang="less">
.media-photos{
  .listhover:hover{
    background: #eee;
  }
  .photos-item{height: 150px;overflow: hidden;background: #eee;min-width: 40px;
    .img-name{position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, .7);width: 100%;line-height: 1em;padding: 6px;transform: translateY(24px);
      overflow: hidden;text-overflow: ellipsis;white-space: nowrap;transition: all .2s;}
    img{height: 100%;transition: transform .2s;will-change: transform;}
    .item-check{position: absolute;right: 0;top: 0;z-index: 2;visibility: hidden;color: rgba(173, 173, 173, 0.8);padding: 3px;}
    &:hover{
      .item-check{visibility: visible;}
      .img-name{transform: translateY(0)}
    }
    &.checked{
      .item-check{visibility: visible;color: #008eff;}
      img{transform: scale(.85);}
    }
    .photos-scale{
      position: absolute;
      top: 0px;
      left: 0px;
      background: rgba(0,0,0,0.5);
      color: #fff;
      z-index: 50;
      line-height: 20px;
      padding: 0 4px;
      border-radius: 0 0 4px 0;
      margin: 0;
    }
  }
  .datepicker:before {
     content: '' !important;
  }
  .datepicker{
    min-width: 230px !important;
  }
  .datepicker input{
    border: 1px solid #ddd !important;
    height: 30px !important;
    width: calc(100% - 10px) !important;
    box-sizing: border-box;
    padding: 0;
  }
}

</style>
