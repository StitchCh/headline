<template>
  <div class="option-item relate-album">
    <div class="flex-v-center blue a" @click="show = true">
      <i class="icon f-20 add-other-icon">album</i>
      <span class="flex-item">添加关联专辑</span>
    </div>
    <ul v-if="selected.length" style="margin-top: 10px;">
      <li v-for="(item, index) in selected" :key="item.id" class="flex-v-center item" :title="item.title">
        <span style="margin-right: 10px;">{{item.title}}</span>
        <span class="flex-item"></span>
        <i class="icon a" style="font-size: 18px;" @click="remove(index)">delete</i>
      </li>
    </ul>
    <layer v-if="show" title="添加关联专辑" width="600px" mask-click @close="show = false">
      <div class="layer-text bg-e relative">
        <transition name="fade">
          <div v-if="loading" class="flex-center abs bg-e" style="z-index: 10;">
            <loading></loading>
          </div>
        </transition>
        <div class="flex-col album-list">
          <list-view :list="list" class="flex-item"
                     @prev="filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1"
                     @next="filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1">
            <li slot-scope="slotProps">
              <div class="list-item c-6 f-14 a flex-v-center" :class="{ on: selected.some(v => v.id === slotProps.item.id) }" @click="selectItem(slotProps.item)">
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
      </div>
    </layer>
  </div>
</template>

<script>
import ListView from '@/components/listView'

export default {
  name: 'relate-album',
  components: { ListView },
  props: {
    value: {
      type: String,
      default: ''
    },
    listUrl: {
      type: String,
      default: ''
    },
    detailUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      loading: true,
      list: [],
      totalPage: 1,
      filter: {
        toPage: 1,
        pageSize: 30,
        title: ''
      },
      selected: []
    }
  },
  methods: {
    getList (refresh) {
      this.loading = true
      if (refresh) this.filter.toPage = 1
      return this.$http.post(this.listUrl, this.filter).then(res => {
        this.list = res.data || []
        this.totalPage = res.totalPage || 1
        this.loading = false
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
    selectItem (item) {
      this.selected.splice(0, 1, item)
      this.$emit('input', this.selected[0].id)
    },
    remove (index) {
      this.selected.splice(index, 1)
      this.$emit('input', '')
      this.getList()
    }
  },
  created () {
    this.getList()
    if (this.value) {
      this.$http.post(this.detailUrl, { id: this.value }).then(
        res => {
          this.selected.splice(0, 1, res.album)
        }
      )
    }
  }
}
</script>

<style lang="less">
.relate-album {
  .item {padding: 7px 4px;
    span {overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    i:hover{color: #F44336}
  }
  /*.layer-ctn {max-width: 1000px;}*/
  .album-list {height: 600px;}
  .list-thumb {width: 80px;height: 60px;background: rgba(0, 0, 0, .07);margin-right: 10px;
    img {max-width: 100%;max-height: 100%;}
  }
  .list-item.on{background: #42aad8;color: #fff;
    span{color: rgba(255, 255, 255, .8);}
  }
}
</style>
