<template>
  <div class="abs bg-f c-6 flex-col app-roles">
    <div class="af-topbar flex-v-center">
      <dock title="角色" color="#2088ff"/>
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
        添加新角色...
      </div>

      <div class="setting-card f-14">
        <table>
          <thead>
            <th>用户ID</th>
            <th>角色名称</th>
            <th>角色中文名</th>
            <th>创建人</th>
            <th>创建时间</th>
            <th colspan="2">操作</th>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id" @click="openDetail(item.id)">
              <td>{{item.id}}</td>
              <td>{{item.rolesName}}</td>
              <td>{{item.rolesCnName}}</td>
              <td>{{item.createUser}}</td>
              <td>{{item.createTime}}</td>
              <td style="width: 30px;"><icon-btn small>edit</icon-btn></td>
              <td style="width: 30px;"><icon-btn small>delete</icon-btn></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <layer v-if="detailShow" title="角色详情" width="600px" maskClick @close="detailShow = false">
      <div class="layer-text">
        <div style="text-align: center;">
          <div class="tab">
            <div class="tab-item" :class="{ on: tab === 'base' }" @click="tab = 'base'">基本信息</div>
            <div class="tab-item" :class="{ on: tab === 'menu' }" @click="tab = 'menu'">菜单信息</div>
            <div class="tab-item" :class="{ on: tab === 'site' }" @click="tab = 'site'">站点信息</div>
          </div>
        </div>

        <transition name="fade" mode="out-in">
        <table v-if="tab === 'base'" key="base">
          <tbody>
            <tr>
              <th align="right">用户ID</th>
              <td>{{detail.sysRoles.id}}</td>
            </tr>
            <tr>
              <th align="right">角色名称</th>
              <td>{{detail.sysRoles.rolesName}}</td>
            </tr>
            <tr>
              <th align="right">角色中文名</th>
              <td>{{detail.sysRoles.rolesCnName}}</td>
            </tr>
            <tr>
              <th align="right">创建人</th>
              <td>{{detail.sysRoles.createUser}}</td>
            </tr>
            <tr>
              <th align="right">创建时间</th>
              <td>{{detail.sysRoles.createTime}}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="tab === 'menu'" key="menu" style="min-height: 200px;">
          <tree :data="detail.menus" pidTxt="pId" rootId="-1" :format="menuFormat"></tree>
        </div>

        <div class="flex" v-if="tab === 'site'" key="site">
          <ul class="site-list">
            <li v-for="item in detail.siteChannels" :key="item.siteId" :class="{ on: item.siteId === siteActive }" @click="selectSite(item)">{{item.siteName}}</li>
          </ul>
          <div class="channel-list">
            <tree :data="detailSiteChannels" pid-txt="pId" :format="channelFormat"></tree>
          </div>
        </div>
        </transition>
      </div>
      <div class="layer-btns">
        <btn flat color="#008cff" @click="detailShow = false">关闭</btn>
      </div>
    </layer>

    <layer v-if="newShow" title="添加新角色" width="600px">
      <div class="layer-text">
        <input-box label="角色名称" v-model="newForm.rolesName"></input-box>
        <input-box label="角色中文名称" v-model="newForm.rolesChName"></input-box>
        <div class="relative input-box">
          <label>关联菜单</label>
          <div style="padding-left: 80px;height: 30px;line-height: 30px;">请选择 <i class="icon" style="font-size: 16px;">keyboard_arrow_down</i></div>
        </div>
        <div class="relative input-box">
          <label>关联站点</label>
          <div style="padding-left: 80px;height: 30px;line-height: 30px;">请选择 <i class="icon" style="font-size: 16px;">keyboard_arrow_down</i></div>
        </div>
      </div>
      <div class="layer-btns">
        <btn flat color="#008cff" @click="newShow = false">关闭</btn>
      </div>
    </layer>
  </div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'

export default {
  name: 'app-roles',
  components: { Account, Dock },
  data () {
    return {
      loading: true,
      list: [],
      menuList: [],
      siteList: [],
      total: 1,
      page: 1,
      detail: {},
      detailShow: false,
      tab: 'base',
      siteActive: '',
      detailSiteChannels: [],
      newShow: false,
      newForm: {
        rolesName: '',
        rolesChName: '',
        app: '',
        addSiteChannels: ''
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/sysRoles/queryList.monitor', {
        pageSize: 10,
        toPage: this.page
      }).then(
        res => {
          console.log(res)
          this.list = res.pages
          this.total = res.totalPage * 10
          this.loading = false
        }
      )
    },
    menuFormat (menu, node) {
      let arr = menu.split('-')
      let name = arr[0]
      let path = arr[1].replace('【权限路径为:', '').replace('】', '')
      return `<span>${name}</span><span class="c-8 f-12" style="margin-left: 10px;">${path}</span>` + (node.checked ? '<i class="icon" style="color: #52d277;font-size: 14px;margin-left: 10px;">check</i>' : '')
    },
    channelFormat (channel, node) {
      return channel + (node.checked ? '<i class="icon" style="color: #52d277;font-size: 14px;margin-left: 10px;">check</i>' : '')
    },
    openDetail (id) {
      if (Object.keys(this.detail).length !== 0 && this.detail.sysRoles.id === id) {
        this.tab = 'base'
        this.siteActive = ''
        this.detailSiteChannels = []
        this.detailShow = true
        return
      }
      this.$http.post('/cri-cms-platform/sysRoles/updateQuery.monitor', { id }).then(
        res => {
          console.log(res)
          this.tab = 'base'
          this.siteActive = ''
          this.detailSiteChannels = []
          this.detail = res
          this.detailShow = true
        }
      )
    },
    selectSite (site) {
      this.siteActive = site.siteId
      this.detailSiteChannels = site.channels
    },

    // 添加新角色
    openNew () {
      this.newShow = true
    }
  },
  created () {
    Promise.all([
      this.$http.post('/cri-cms-platform/sysRoles/queryList.monitor', {
        pageSize: 10,
        toPage: this.page
      }),
      this.$http.post('/cri-cms-platform/sysRoles/getMenus.monitor'),
      this.$http.post('/cri-cms-platform/sysRoles/getSite.monitor')
    ]).then(
      res => {
        console.log(res)
        this.list = res[0].pages
        this.total = res[0].totalPage * 10

        this.menuList = res[1].menus
        this.siteList = res[2].sites

        this.loading = false
      }
    )
  }
}
</script>

<style lang="less">
.app-roles {
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
        &.on {color: #008cff}
      }
    }
    .channel-list {flex: 1;min-height: 40px;}
  }
}
</style>
