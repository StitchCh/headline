<template>
  <div class="flex-item flex album">
    <div class="flex-col album-center">
      <div class="af-topbar flex-center">
        <icon-btn class="add-btn" v-tooltip:bottom="'添加'" @click="$router.push('/audioAlbumEdit')">add</icon-btn>
      </div>
      <div class="flex-v-center search-bar c-6 f-13">
        <i class="icon c-a f-20">search</i>
        <input v-model="filter.title" type="text" class="flex-item c-6 f-14 search-input" placeholder="搜索标题">
        <icon-btn small @click="filter.title=''">close</icon-btn>
      </div>
      <list-view :list="list" class="flex-item"
                 @prev="filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1"
                 @next="filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1">
        <li slot-scope="slotProps">
          <div class="list-item c-6 f-14 a flex-v-center" :class="{ on: slotProps.item.id === id }" @click="$router.push('/audio/album/' + slotProps.item.id)">
            <div class="list-thumb flex-center">
              <img v-if="slotProps.item.thumb.length" :src="slotProps.item.thumb[0].url" alt="">
            </div>
            <div class="flex-item">
              <div class="b" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis">{{slotProps.item.title}}</div>
              <div class="c-8 f-12" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis;margin-top: 5px;"><span>{{slotProps.item.videoAbstract}}</span></div>
              <div class="c-8 f-12" style="margin-top: 5px;">
                <span>{{slotProps.item.createDate}}</span>
              </div>
            </div>
          </div>
        </li>
      </list-view>
      <div class="af-bottombar flex-center">
        <icon-btn small class="a" @click="onPrev" :disabled="filter.toPage <= 1">keyboard_arrow_left</icon-btn>
        <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{filter.toPage}} / {{totalPage}} 页</span>
        <icon-btn small class="a" @click="onNext" :disabled="filter.toPage >= totalPage">keyboard_arrow_right</icon-btn>
      </div>
    </div>
    <div class="af-right flex-item flex-col">
      <div class="af-topbar flex-v-center">
        <div class="flex-v-center" v-if="$route.params.id">
          <icon-btn small v-tooltip:bottom="'编辑'" style="margin-right: 10px;" @click="$router.push(`/audioAlbumEdit/${id}`)">edit</icon-btn>
          <!--<icon-btn small v-tooltip:bottom="'还原'" style="margin-right: 10px;" @click="recover">undo</icon-btn>-->
          <icon-btn small v-tooltip:bottom="'删除'" @click="deleteAlbum">delete</icon-btn>
        </div>
        <div class="flex-item"></div>
        <account/>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import ListView from '@/components/listView'
// import VueDatepickerLocal from 'vue-datepicker-local'
import debounce from 'lodash/debounce'

export default {
  name: 'audio-album',
  components: { Account, ListView },
  props: ['id'],
  data () {
    return {
      list: [],
      totalPage: 1,
      filter: {
        toPage: 1,
        pageSize: 30,
        title: ''
      }
    }
  },
  methods: {
    getList (refresh) {
      if (refresh) this.filter.toPage = 1
      this.$http.post('/cri-cms-platform/audio/albumList.monitor', this.filter).then(res => {
        this.list = res.data || []
        this.totalPage = res.totalPage || 1
      }).catch(e => {
        console.log(e)
      })
    },
    onPrev () {
      let { filter } = this
      if (filter.toPage === 1) return
      filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1
    },
    onNext () {
      let { filter, totalPage } = this
      if (filter.toPage === totalPage) return
      filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1
    },
    search: debounce(function () {
      this.getList(true)
    }, 400),
    deleteAlbum () {
      this.$confirm({
        title: '您确定要删除此专辑吗？',
        text: `被删除的专辑将无法恢复。`,
        btns: ['取消', '删除'],
        color: 'red',
        yes: () => {
          this.$http.post('/cri-cms-platform/audio/albumDel.monitor', {
            id: this.id
          }).then(res => {
            this.getList()
            this.$router.replace('/audio/album')
          })
        }
      })
    }
  },
  created () {
    this.getList()
  },
  watch: {
    'filter.title' () {
      this.search()
    },
    'filter.toPage' () {
      this.getList()
    }
  }
}
</script>

<style lang="less">
.album {
  .search-bar{border-bottom: 1px solid #ddd;height: 36px;padding: 0 15px;line-height: 1em;}
  .search-input{height: 30px;border: none;background: transparent;margin-left: 10px;}
  .album-center{width: 400px;border-right: 1px solid rgba(0, 0, 0, .1);background: #f8f8f8;}
  .list-thumb {width: 80px;height: 60px;background: rgba(0, 0, 0, .07);margin-right: 10px;
    img {max-width: 100%;max-height: 100%;}
  }
  .list-item.on{background: #42aad8;color: #fff;
    span{color: rgba(255, 255, 255, .8);}
  }
}
</style>
