<template>
  <div class="abs bg-f c-6 flex-col app-version">
    <div class="af-topbar flex-v-center">
      <dock title="版本" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item scroll-y bg-e relative roles-content">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-16 add-btn" @click="openNew">
        添加新版本...
      </div>

      <div class="setting-card f-14">
        <table>
          <thead>
          <th>版本号</th>
          <th>发布系统</th>
          <th>创建人</th>
          <th>创建日期</th>
          <th>更新类型</th>
          <th>下载地址</th>
          <th colspan="2">操作</th>
          </thead>
          <tbody>
          <tr v-for="(item, index) in list" :key="item.id">
            <td>{{item.version}}</td>
            <td>{{item.appType}}</td>
            <td>{{item.createUser}}</td>
            <td>{{item.createDate}}</td>
            <td>{{item.updateType ==  0 ? '选择更新' : '强制更新'}}</td>
            <td>{{item.downUrl}}</td>
            <td style="width: 30px;"><icon-btn small @click="edit(item.id)">edit</icon-btn></td>
            <td style="width: 30px;"><icon-btn small @click="deleteV(item.id)">delete</icon-btn></td>
          </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="page" :size="15" :total="total" @change="p => { page = p;getList(); }"></pagination>
        </div>
      </div>
    </div>

    <div v-if="newShow" class="zzbox">
      <div class="zz_box">
        <p class="zz_title">新增版本</p>
        <div>
          <div>
            <p>发布系统</p>
            <radio-box text="android" :label="'android'" v-model="newForm.appType"/>
            <radio-box text="IOS" :label="'IOS'" v-model="newForm.appType"/>
          </div>
          <div style="margin-bottom: 20px;">
            <p>更新类型</p>
            <radio-box text="选择性" :label="0" v-model="newForm.updateType"/>
            <radio-box text="强制性" :label="1" v-model="newForm.updateType"/>
          </div>
          <input-box label="版本号" v-model="newForm.version"></input-box>
          <input-box label="下载地址" v-model="newForm.downUrl"></input-box>
          <div class="layer-btns">
            <btn flat @click="newShow = false">取消</btn>
            <btn @click="newSubmit">提交</btn>
          </div>
        </div>
      </div>
    </div>

    <div v-if="editShow" class="zzbox">
      <div class="zz_box">
        <p class="zz_title">修改版本</p>
        <div>
          <div>
            <p>发布系统</p>
            <radio-box text="android" :label="'android'" v-model="editForm.appType"/>
            <radio-box text="IOS" :label="'IOS'" v-model="editForm.appType"/>
          </div>
          <div style="margin-bottom: 20px;">
            <p>更新类型</p>
            <radio-box text="选择性" :label="0" v-model="editForm.updateType"/>
            <radio-box text="强制性" :label="1" v-model="editForm.updateType"/>
          </div>
          <input-box label="版本号" v-model="editForm.version"></input-box>
          <input-box label="下载地址" v-model="editForm.downUrl"></input-box>
          <div class="layer-btns">
            <btn flat @click="editShow = false">取消</btn>
            <btn @click="editSubmit">提交</btn>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Account from '@/components/account'
  import Dock from '@/components/dock'

export default {
  components: { Account, Dock },
  data () {
    return {
      list: [],
      loading: false,
      total: 1,
      page: 1,
      newShow: false,
      editShow: false,
      newForm: {
        appType: 'android',
        updateType: 0,
        version: '',
        downUrl: ''
      },
      editForm: {
        appType: 'android',
        updateType: 0,
        version: '',
        downUrl: '',
        id: ''
      }
    }
  },
  methods: {
    newSubmit () {
      if (this.newForm.version == '') {
        this.$toast('请输入版本号')
        return false
      }
      if (this.newForm.downUrl == '') {
        this.$toast('请输入下载地址')
        return false
      }
      let obj = this.newForm
      this.$http.post('/cri-cms-platform/versionUpdate/save.monitor', obj).then(res => {
        this.getList()
        this.newShow = false
      })
    },
    openNew () {
      this.newForm = {
        appType: 'android',
        updateType: 0,
        version: '',
        downUrl: ''
      }
      this.newShow = true
    },
    getList () {
     this.$http.post('/cri-cms-platform/versionUpdate/page.monitor', {
       pageSize: 15,
       toPage: this.page
     }).then(res => {
       console.log(res)
       this.list = res.data
     })
    },
    deleteV (id) {
      this.$http.post('/cri-cms-platform/versionUpdate/del.monitor', { id }).then(res => {
        this.getList()
      })
    },
    edit (id) {
      this.editShow = true
      this.$http.post('/cri-cms-platform/versionUpdate/updateQuery.monitor', { id }).then(res => {
        console.log(res)
        this.editForm = {
          appType: res.versionUpdate.appType,
          updateType: res.versionUpdate.updateType,
          version: res.versionUpdate.version,
          downUrl: res.versionUpdate.downUrl,
          id: res.versionUpdate.id
        }
      })
    },
    editSubmit (id) {
      this.$http.post('/cri-cms-platform/versionUpdate/update.monitor', this.editForm).then(res => {
        console.log(res)
        this.editShow = false
        this.getList()
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less">
  .app-version {
    .zzbox{
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 20;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.5);
    }
    .zz_title{
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .zz_box{
      position: absolute;
      width: 600px;
      height: 440px;
      background: #fff;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 10px;
      padding: 20px;
    }
    .roles-content {
      .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
        th,td {padding: 5px 10px;}
        tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
        tr:hover {background: rgba(0, 0, 0, .05);}
      }
      .add-btn {color: #008cff;padding: 14px 30px;cursor: pointer;transition: background .2s;
        &:active {background: #e1e1e1;}
      }
    }
    .layer-text {
      .tab {margin-bottom: 10px;}
      th, td {padding: 5px 15px;}
      th {width: 130px;}
      .site-list {width: 100px;border-right: 1px solid rgba(0, 0, 0, .07);align-self: stretch;
      li {height: 30px;line-height: 30px;padding: 0 20px;transition: all .2s;cursor: pointer;
          &:hover {background: rgba(0, 0, 0, .05)}
          &.selected {color: #4caf50;}
          &.on {color: #008cff}
        }
      }
      .channel-list {flex: 1;min-height: 40px;}
    }
  }
</style>
