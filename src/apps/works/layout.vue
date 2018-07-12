<template>
<div class="bg-f works-layout f-14 c-6">
  <div class="flex-v-center title" style="line-height: 1em;">
    <i class="icon" style="margin-right: 10px;">{{item.type === '1' ? 'view_carousel' : 'list'}}</i>
    <span class="flex-item c-5 b">{{item.layoutName}}</span>
  </div>
  <div class="content relative">
    <div v-if="loading" class="abs bg-light-rgb-3 flex-center"><loading size="30"/></div>
    <div v-if="list && list.length">
      <ul>
        <li class="item flex-v-center" v-for="li in list" :key="li.id">
          <span class="flex-item item-title">{{li.newTitle}}</span>
          <span class="f-12 c-a" style="margin-right: 15px;">{{li.sortOrder}}</span>
          <icon-btn small v-tooltip="'定时上/下线'">access_time</icon-btn>
          <icon-btn small v-tooltip="'上移'" @click="opera(li, 'up')" :disabled="li.sortOrder === '9999999'">arrow_upward</icon-btn>
          <icon-btn small v-tooltip="'下移'" @click="opera(li, 'down')" :disabled="li.sortOrder === '9999999'">arrow_downward</icon-btn>
          <icon-btn small v-tooltip="'置顶'" @click="opera(li, 'top')" :disabled="li.sortOrder === '9999999'">vertical_align_top</icon-btn>
          <icon-btn small v-tooltip="'编辑'" @click="toEdit(li)">edit</icon-btn>
          <icon-btn small v-tooltip="'移除'" @click="del(li)">delete</icon-btn>
        </li>
      </ul>
      <pagination
        v-if="totalPage > 1"
        :page="page"
        :size="pageSize"
        :total="totalPage * pageSize"
        @change="page=$event;getList()"
        style="border-top: 1px solid #eee;padding: 5px 0;"/>
    </div>
    <div v-else class="f-14 t-center c-a" style="padding: 5px;">暂无数据</div>
  </div>
  <layer v-if="edit.item" title="编辑" width="300px">
    <div class="layer-text">
      <div class="flex">
        <input-box v-model="edit.title" label="标题" class="flex-item"></input-box>
      </div>
      <div class="flex">
        <input-box v-model="edit.abstarcts" label="摘要" multi-line class="flex-item"></input-box>
      </div>
    </div>
    <div class="layer-btns">
      <btn flat @click="edit = { item: null, title: '', abstarcts: '' }">取消</btn>
      <btn flat color="#008eff" @click="submitEdit" :disabled="!edit.title">更新</btn>
    </div>
  </layer>
</div>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'works-layout',
  components: { VueDatepickerLocal },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    release: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      page: 1,
      totalPage: 0,
      pageSize: 10,
      list: [],
      edit: {
        item: null,
        title: '',
        abstarcts: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/issue/getLayoutContentList.monitor', {
        layoutId: this.item.id,
        type: this.item.type,
        toPage: this.page,
        pageSize: this.pageSize
      }).then(res => {
        res.data.forEach(item => {
          item.editSendDate = item.sendDate
        })
        this.loading = false
        this.list = res.data
        this.totalPage = res.totalPage
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    opera (item, opera) {
      this.$http.post(`/cri-cms-platform/issue/${opera}.monitor`, {
        type: this.item.type,
        layoutId: this.item.id,
        id: item.contentLayoutId
      }).then(res => {
        this.getList()
      }).catch(e => {
        this.$toast(e.msg)
      })
    },
    del (item) {
      this.$confirm({
        title: '移除确认',
        text: `您确定要移除以下文章吗：\n${item.title}`,
        btns: ['取消', '移除'],
        color: 'darkorange',
        yes: () => {
          this.$http.post('/cri-cms-platform/issue/del.monitor', {
            type: this.item.type,
            id: item.contentLayoutId
          }).then(res => {
            this.getList()
            this.$toast('移除成功')
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    },
    toEdit (item) {
      this.edit.item = item
      this.edit.title = item.newTitle || ''
      this.edit.abstarcts = item.newAbstarcts || ''
    },
    submitEdit () {
      this.$http.post('/cri-cms-platform/issue/updateTitleAndAbstract.monitor', {
        type: this.item.type,
        id: this.edit.item.contentLayoutId,
        newTitle: this.edit.title,
        newAbstract: this.edit.abstarcts
      }).then(res => {
        this.edit = { item: null, title: '', abstarcts: '' }
        this.getList()
      }).catch(e => {
        this.$toast(e.msg)
      })
    },
    onSendTimeConfirm (e) {
      console.log(e)
    },
    sendIssueDate (item) {}
  }
}
</script>

<style lang="less">
.works-layout{
  border-radius: 5px;margin: 0 20px;;margin-bottom: 15px;padding: 0 10px;
  .title{padding: 10px;border-bottom: 1px solid #eee;}
  .content{padding-bottom: 5px;}
  .item{line-height: 1em;padding: 3px 10px;line-height: 1.3em;
    .icon{color: #ddd;}
    &:hover{
      background: rgba(0, 0, 0, .05);
      .icon{color: #666;}
    }
  }
  .date-picker-container{position: absolute;left: 0;top: 0;}
  .datepicker{
    input{padding: 0 22px 0 10px;height: 30px;border: none;font-size: 12px;}
    &:before{content: none;}
  }
}
</style>
