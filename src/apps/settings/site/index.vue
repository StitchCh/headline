<template>
<div class="settings-site flex-col c-6">
  <div class="af-topbar">
    <span class="f-18">站点管理</span>
  </div>
  <div class="flex-item scroll-y bg-e relative">
    <transition name="fade">
      <div v-if="loading" class="abs bg-e">
        <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
      </div>
    </transition>
    <div class="setting-card f-16 add-site-btn" @click="openNew">
      添加新站点...
    </div>
    <div class="setting-card f-14">
      <table>
        <thead>
          <th>编号</th>
          <th>站点名称</th>
          <th>站点url</th>
          <th>站点对外ID</th>
          <th>创建人</th>
          <th>创建时间</th>
          <th style="width: 30px;">操作</th>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.url}}</td>
            <td>{{item.identifyId}}</td>
            <td>{{item.createUserId}}</td>
            <td>{{item.createTime}}</td>
            <td><icon-btn small @click="openEdit(item)">edit</icon-btn></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <layer v-if="newShow" title="添加新站点" width="600px">
    <div class="layer-text">
      <input-box label="站点名称" v-model="newForm.name"></input-box>
      <input-box label="站点URL" v-model="newForm.url"></input-box>
      <input-box label="站点值" v-model="newForm.identifyId"></input-box>
    </div>
    <div class="layer-btns">
      <btn flat @click="newShow = false">取消</btn>
      <btn flat color="#008cff" @click="submitNew">提交</btn>
    </div>
  </layer>

  <layer v-if="editShow" title="修改站点" width="600px">
    <div class="layer-text">
      <input-box label="站点名称" v-model="editForm.name"></input-box>
      <input-box label="站点URL" v-model="editForm.url"></input-box>
      <input-box label="站点值" v-model="editForm.identifyId"></input-box>
    </div>
    <div class="layer-btns">
      <btn flat @click="editShow = false">取消</btn>
      <btn flat color="#008cff" @click="submitEdit">提交</btn>
    </div>
  </layer>
</div>
</template>

<script>
export default {
  name: 'settings-site',
  data () {
    return {
      loading: true,
      list: [],
      newShow: false,
      editShow: false,
      newForm: {
        name: '',
        url: '',
        identifyId: ''
      },
      editForm: {
        id: '',
        name: '',
        url: '',
        identifyId: ''
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/site/page.monitor').then(
        res => {
          this.list = res
          this.loading = false
        }
      ).catch(
        res => {
          this.$toast(res.msg ? res.msg : '发生错误')
        }
      )
    },
    openNew () {
      for (let k in this.newForm) {
        this.newForm[k] = ''
      }
      this.newShow = true
    },
    openEdit (item) {
      for (let k in this.editForm) {
        this.editForm[k] = item[k]
      }
      this.editShow = true
    },
    submitNew () {
      this.$http.post('/cri-cms-platform/site/save.monitor', this.newForm).then(
        res => {
          this.getList()
          this.$toast('提交成功')
          this.newShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg ? res.msg : '发生错误')
        }
      )
    },
    submitEdit () {
      this.$http.post('/cri-cms-platform/site/update.monitor', this.editForm).then(
        res => {
          this.getList()
          this.$toast('修改成功')
          this.editShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg ? res.msg : '发生错误')
        }
      )
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
.settings-site{background: #fafafa;
  .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
    th,td {padding: 5px 10px;}
    tr {border-top: 1px solid #e1e1e1;}
    tr:hover {background: rgba(0, 0, 0, .05);}
  }
  .add-site-btn {color: #008cff;padding: 14px 30px;cursor: pointer;transition: background .2s;
    &:active {background: #e1e1e1;}
  }
}
</style>
