<template>
<div class="bg-f works-layout c-6">
  <div class="flex-v-center title">
    <span class="flex-item c-5 b">{{item.layoutName}}</span>
  </div>
  <div class="content">
    <div v-if="list && list.length">
      <ul>
        <li class="item flex-v-center" v-for="item in list" :key="item.id">
          <span class="flex-item">{{item.title}}</span>
          <icon-btn small v-tooltip="'定时上线'" @click="sendIssueDate(item)">access_time</icon-btn>
          <icon-btn small v-tooltip="'上移'" @click="opera(item, 'up')">arrow_upward</icon-btn>
          <icon-btn small v-tooltip="'下移'" @click="opera(item, 'down')">arrow_downward</icon-btn>
          <icon-btn small v-tooltip="'置顶'" @click="opera(item, 'top')">vertical_align_top</icon-btn>
          <icon-btn small v-tooltip="'编辑'" @click="toEdit(item)">edit</icon-btn>
          <icon-btn small v-tooltip="'移除'" @click="del(item)">delete</icon-btn>
        </li>
      </ul>
      <pagination
        v-if="totalPage > pageSize"
        :page="page"
        :size="pageSize"
        :total="totalPage * pageSize"
        @change="getList"
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
      <btn flat color="#008eff" @click="submitEdit" :disabled="!edit.title">确定</btn>
    </div>
  </layer>
</div>
</template>

<script>
export default {
  name: 'works-layout',
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
      this.$http.post('/cri-cms-platform/issue/getLayoutContentList.monitor', {
        layoutId: this.item.id,
        type: this.item.typeStr,
        toPage: this.page,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.totalPage = res.totalPage
      }).catch(e => {
        this.$toast(e.msg)
      })
    },
    opera (item, opera) {
      this.$http.post(`/cri-cms-platform/issue/${opera}.monitor`, {
        type: this.item.typeStr,
        layoutId: this.item.id,
        id: item.id
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
          this.$toast('移除失败')
        }
      })
    },
    toEdit (item) {
      this.edit.item = item
      this.edit.title = item.title || ''
      this.edit.abstarcts = item.abstarcts || ''
    },
    submitEdit () {
      this.$http.post('/cri-cms-platform/issue/updateTitleAndAbstract.monitor', {
        type: this.item.typeStr,
        id: this.edit.item.id,
        newTitle: this.edit.title,
        newAbstract: this.edit.abstarcts
      }).then(res => {
        this.edit = { item: null, title: '', abstarcts: '' }
      })
    },
    sendIssueDate (item) {}
  }
}
</script>

<style lang="less">
.works-layout{
  border-radius: 5px;margin: 0 20px;;margin-bottom: 15px;padding: 0 10px;
  .title{padding: 10px;border-bottom: 1px solid #eee;}
  .content{padding: 0 10px;}
  .item{line-height: 1em;padding: 13px 0;}
}
</style>
