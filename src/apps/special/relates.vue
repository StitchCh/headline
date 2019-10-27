<template>
  <div class="option-item add-relates" style="border-bottom: 0;">
    <div class="flex-v-center blue a" @click="clickget">
      <i class="icon f-20 add-other-icon">{{icon}}</i>
      <span class="flex-item">添加{{title}}</span>
      <slot name="afterTitle"></slot>
    </div>
    <ul v-if="list.selected.length" style="margin-top: 10px;">
      <draggable element="ul" :options="{ghostClass:'movelist'}" v-model="list.selected" >
        <li v-for="(item, index) in list.selected" :key="item.id" class="flex-v-center item" :title="item.title">
          <span style="margin-right: 10px;">{{item.title}}</span>
          <span class="flex-item"></span>
          <i class="icon a" style="font-size: 18px;" @click="remove(index)">delete</i>
        </li>
      </draggable>
    </ul>
    <slot></slot>
    <layer v-show="show" :title="'添加' + title" width="1000px" mask-click @close="show = false">
      <div class="layer-text bg-e relative">
        <transition name="fade">
          <div v-if="loading" class="flex-center abs bg-e" style="z-index: 10;">
            <loading></loading>
          </div>
        </transition>
        <div class="flex-v-center">
          <input-box ref="searchTitle" label="搜索标题" v-model="form.title" @blur="searchTitle" @keyup.enter.native="$refs.searchTitle.$refs.input.blur()"></input-box>
          <div class="relative">
            <span class="a" style="color: rgba(0 ,0 ,0, .4);" @click="channelShow = !channelShow">筛选频道<i class="icon">keyboard_arrow_down</i></span>
            <bubble v-if="channelShow" @close="channelShow = false">
              <div style="padding: 10px 0;width: 280px;">
                <tree :data="channels" pid-txt="channelPartentId" nameTxt="channelName" show-checkbox :checked-list.sync="channelIds"></tree>
              </div>
            </bubble>
          </div>
        </div>
        <div class="flex">
          <div class="flex-item" style="margin-right: 10px;max-width: 50%;">
            <div class="title">点击选取</div>
            <ul class="content">
              <li v-if="!list.unselected.length" class="flex-center none"><no-data/></li>
              <li v-for="(item, index) in list.unselected" :key="item.id" @click="select(index)"><div>{{item.title}}</div></li>
            </ul>
          </div>
          <div class="flex-item" style="max-width: 50%;">
            <div class="title">已选取</div>
            <ul class="content">
              <li v-if="!list.selected.length" class="flex-center none"><no-data/></li>
              <li v-for="(item, index) in list.selected" :key="item.id" @click="remove(index)"><div>{{item.title}}</div></li>
            </ul>
          </div>
        </div>
      </div>
    </layer>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'app-article-add-relates',
  components: { draggable },
  props: {
    value: {},
    limit: {},
    channelId: {
      type: String,
    },
    single: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      loading: true,
      list: {
        selected: [],
        unselected: []
      },
      form: {
        selectedIds: '',
        title: '',
        channelId: ''
        // filterChannelId: 'true',
        // pageSize: 30,
        // toPage: 1
      },
      channelShow: false,
      channelIds: [],
      firstclick: true
    }
  },
  mounted () {
    if (this.value.selected) {
      this.list.selected = this.value.selected
    }
  },
  methods: {
    clickget () {
      if (!this.channelId) {
        this.$toast('请选择频道')
        return false
      }
      if (this.channelId.length == 0) {
        this.$toast('请选择频道')
        return false
      }
      this.show = true
      if (!this.firstclick) {
        return false
      }
      this.firstclick = false
      this.getList()
    },
    getList () {
      this.loading = true
      // this.form.channelId = this.channelId
      return this.$http.post(this.url, this.form).then(
        res => {
          this.list.unselected = res || {}
          this.loading = false
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    },
    searchTitle () {
      if (this.form.title === '') return
      this.getList()
    },
    select (index) {
      if (this.single) {
        this.list.selected.splice(0, 1, this.list.unselected.splice(index, 1)[0])
        this.form.selectedIds = this.list.selected[0].id
        this.getList()
        return
      }
      if (this.limit && this.limit == 1 && this.list.selected.length === 1) {
        this.$toast('最多可添加1条')
        return
      } else if (this.limit && this.limit == 2 && this.list.selected.length === 5) {
        this.$toast('最多可添加5条')
        return
      }
      this.list.selected.push(this.list.unselected.splice(index, 1)[0])
      this.form.selectedIds = this.list.selected.map(v => v.id).join(',')
    },
    remove (index) {
      this.list.selected.splice(index, 1)
      this.form.selectedIds = this.list.selected.map(v => v.id).join(',')
      this.getList()
    }
  },
  created () {
    // this.form.selectedIds = this.value
    // this.getList()
  },
  watch: {
    'form.selectedIds' () {
      this.$emit('input', this.list)
    },
    'channelIds' (newValue) {
      this.form.channelId = newValue.join(',')
      this.getList()
    }
  }
}
</script>

<style lang="less">
.add-relates {
  .item {padding: 7px 4px;
    span {overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    i:hover{color: #F44336}
  }
  .movelist{
    background: #008eff;
    color: #008eff;
    opacity: 0.5;
  }
  .layer-ctn {max-width: 1000px;}
  .title {margin: 10px 0;font-size: 12px;}
  .content{background: #fff;border-radius: 10px;overflow: hidden;margin-bottom: 10px;max-height: 600px;overflow-y: auto;
    li {padding-left: 20px;cursor: pointer;
      div {border-bottom: 1px solid #e1e1e1;padding: 12px 0;}
      &:hover {background: #e1e1e1}
      &:last-child div{border-bottom: 0;}
    }
    .none {padding: 0;cursor: default;
      &:hover {background: none;}
    }
  }
}
</style>
