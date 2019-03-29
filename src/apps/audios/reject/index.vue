<template>
  <div class="flex-item flex-col audio-reject">
    <div class="af-topbar flex-v-center">
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item flex-col">
      <div class="t-center" style="padding: 15px 0;"><input class="search" type="text" placeholder="输入标题并回车" v-model="filter.search" @keyup.enter="getList"/></div>
      <div class="box flex-item relative scroll-y f-14">
        <transition name="fade">
          <div v-if="loading" class="flex-center abs bg-f" style="z-index: 10">
            <loading></loading>
          </div>
        </transition>
        <div v-if="!list.length" class="abs flex-center" style="height: 80%;">
          <no-data/>
        </div>
        <ul class="flex" ref="ul" style="flex-wrap: wrap;padding-bottom: 50px;" :style="{paddingLeft: (width - (240 * ~~((width - 80) / 240))) * 0.5 + 'px'}">
          <li v-for="item in list" :key="item.id" class="a" @click="$router.push('/audioEdit/audio/' + item.id)">
            <div class="cover flex-center relative">
              <img v-if="item.thumb && item.thumb.length" :src="item.thumb[0].url" alt="">
              <div class="abs message c-6 bg-f">
                <p>驳回信息：</p>
                <p>{{item.rejectMessage}}</p>
              </div>
            </div>
            <div class="flex-v-center item-info">
              <div class="flex-item" style="overflow: hidden;">
                <div class="c-6 item-name">{{item.title}}</div>
                <div class="f-12 c-8">{{item.createDate}}</div>
              </div>
              <icon-btn class="c-c" @click.stop.native="deleteItem(item)">delete</icon-btn>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-center">
      <pagination v-if="totalPage" :size="filter.pageSize" :total="filter.pageSize * totalPage" :page="filter.toPage" @change="onPageChange"/>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'

export default {
  name: 'app-audio-reject',
  components: { Account },
  data () {
    return {
      loading: true,
      width: 0,
      list: [],
      filter: {
        scope: 'my',
        status: 'REJECT',
        pageSize: 30,
        toPage: 1,
        searchby: 'title',
        search: ''
      },
      totalPage: 1
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.width = this.$refs.ul.clientWidth
    },
    deleteItem (item) {
      let that = this
      this.$confirm({
        title: '您确定要删除此草稿吗？',
        text: '删除后可在回收站找回。',
        btns: ['取消', '删除'],
        color: 'red',
        yes () {
          that.$http.post('/cri-cms-platform/audio/del.monitor', {id: item.id}).then(
            res => {
              that.getList()
            }
          )
        }
      })
    },
    getList (refresh) {
      this.loading = true
      if (refresh) this.filter.toPage = 1
      this.$http.post('/cri-cms-platform/audio/queryList.monitor', this.filter).then(res => {
        this.list = res.pages || []
        this.totalPage = res.totalPage
        this.loading = false
      }).catch(console.log)
    },
    onPageChange (e) {
      this.filter.toPage = parseInt(e)
      this.getList()
    }
  }
}
</script>

<style lang="less">
  .audio-reject{
    .search{width: 300px;line-height: 32px;border:1px solid #ddd;border-radius: 20px;padding: 0 20px;}
    .box {
      li{width: 210px;margin: 15px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);border-radius: 6px;overflow: hidden;transition: box-shadow .3s;
        .message {opacity: 0;transition: opacity .2s;
          p {padding: 5px 10px;margin: 5px 0;}
        }
      }
      li:hover{box-shadow: 0 0 3px 1px rgba(0, 0, 0, .05), 0 10px 30px rgba(0, 0, 0, .15);
        .icon{color: rgb(255, 115, 115);}
        .message {opacity: 1;}
      }
      .cover{width: 210px;height: 210px;background: #eee;
        img{max-height: 100%;}
      }
      .item-info{padding: 10px;}
      .item-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
    }
  }
</style>
