<template>
  <layer title="添加新角色" width="600px">
    <div class="layer-text">
      <input-box label="角色名称" v-model="form.rolesName"></input-box>
      <input-box label="角色中文名称" v-model="form.rolesCnName"></input-box>
      <div class="relative input-box">
        <label>关联菜单</label>
        <div style="padding-left: 80px;height: 30px;line-height: 30px;cursor: pointer;" @click="ui.roleMenuShow = true">请选择 <i class="icon" style="font-size: 16px;">keyboard_arrow_down</i></div>
      </div>
      <div class="relative input-box">
        <label>关联站点</label>
        <div style="padding-left: 80px;height: 30px;line-height: 30px;cursor: pointer;" @click="ui.roleSiteShow = true">请选择 <i class="icon" style="font-size: 16px;">keyboard_arrow_down</i></div>
      </div>
    </div>
    <div class="layer-btns">
      <btn flat @click="$emit('close')">取消</btn>
      <btn flat color="#008cff" @click="submit">确定</btn>
    </div>

    <layer v-if="ui.roleMenuShow" title="选择菜单" width="600px">
      <div class="layer-text">

        <div v-for="(item, index) in menuList" class="melist_box">
          <div style="margin-bottom: 10px;"><check-box @change="menuChange(item, index)" v-model="item.checked" style="width: 100%;" :text="item.name"></check-box></div>
          <div class="melist_sbox">
            <div v-for="(item1, index) in item.children" :title="item1.name" class="melist_s"><check-box @change="menuChange(item1, index)" v-model="item1.checked" style="margin: 0;width: 100%;" :text="item1.name"></check-box></div>
          </div>
        </div>

      </div>
      <div class="layer-btns">
        <btn flat @click="ui.roleMenuShow = false">关闭</btn>
      </div>
      <check-box v-model="menuAll" @change="menuAllFalse" class="qxbtn" text="全选"></check-box>
    </layer>
    <layer v-if="ui.roleSiteShow" title="选择站点频道" width="600px">
      <div class="layer-text flex">
        <ul class="site-list">
          <li v-for="item in siteList" :key="item.id" :class="{ on: item.id === ui.roleSiteActive.id, selected: site.find(v => v.siteId === item.identifyId).channels }" @click="selectSite(item.id, item.identifyId)">{{item.name}}</li>
        </ul>
        <div class="channel-list">
          <tree v-if="ui.roleSiteFlag"
                :data="ui.channels"
                pid-txt="channelPartentId"
                name-txt="channelName"
                :format="channelFormat"
                show-checkbox
                :checked-list.sync="checkList.channels"></tree>
        </div>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.roleSiteShow = false">关闭</btn>
      </div>
    </layer>
  </layer>
</template>

<script>
export default {
  name: 'app-roles-new',
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    siteList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      ui: {
        roleMenuShow: false,
        roleSiteShow: false,
        siteShow: false,
        roleSiteActive: {
          id: '',
          identifyId: ''
        },
        roleSiteFlag: false,
        channels: []
      },
      menuAll: false,
      form: {
        rolesName: '',
        rolesCnName: '',
        app: [],
        addSiteChannels: ''
      },
      site: [],
      checkList: {
        menu: [],
        channels: []
      }
    }
  },
  methods: {
    menuAllFalse () {
      if (!this.menuAll) {
        this.menuList.forEach(item => {
          item.checked = false
          item.children.forEach(item1 => {
            item1.checked = false
          })
        })
      }
    },
    menuChange (data, index) {
      if (!data.checked) {
        this.menuAll = false
      }
      if (data.pId == '-1') {
        if (data.checked) {
          this.menuList[index].children.forEach(item => {
            item.checked = true
          })
        } else {
          this.menuList[index].children.forEach(item => {
            item.checked = false
          })
        }
      }
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
    selectSite (id, identifyId) {
      console.log(id, identifyId)
      this.ui.roleSiteActive.id = id
      this.ui.roleSiteActive.identifyId = identifyId
      this.ui.roleSiteFlag = false
      this.$http.post('/cri-cms-platform/sysRoles/getChannelsToRole.monitor', { id, siteIdToRole: identifyId }).then(
        res => {
          console.log(res)
          this.ui.channels = res
          this.ui.roleSiteFlag = true
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    },
    submit () {
      let menuList = []
      this.menuList.forEach(item => {
        if (item.checked == true) {
          menuList.push(item.id)
        }
        item.children.forEach(item1 => {
          if (item1.checked == true) {
            menuList.push(item1.id)
          }
        })
      })
      this.form.app = menuList.join(',')
      this.form.addSiteChannels = JSON.stringify({data: this.site.filter(v => {
        return v.channels !== ''
      })})
      this.$http.post('/cri-cms-platform/sysRoles/save.monitor', this.form).then(
        res => {
          this.$emit('getList')
          this.$emit('close')
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    }
  },
  created () {
    this.site = this.siteList.map(v => {
      return {
        siteId: v.identifyId,
        channels: ''
      }
    })
  },
  watch: {
    'menuAll' (newValue) {
      if (newValue) {
        this.menuList.forEach(item => {
          item.checked = true
          item.children.forEach(item1 => {
            item1.checked = true
          })
        })
      }
    },
    'checkList.menu' (newValue) {
      this.form.app = newValue.join(',')
    },
    'ui.roleSiteActive.identifyId' (newValue) {
      let channels = this.site.find(v => v.siteId === newValue).channels
      if (channels === '') this.checkList.channels = []
      this.checkList.channels = channels.split(',')
    },
    'checkList.channels' (newValue) {
      this.site.find(v => v.siteId === this.ui.roleSiteActive.identifyId).channels = newValue.join(',')
    }
  }
}
</script>

<style scoped>
  .melist_s{
    width: calc(25% - 26px);
    margin-bottom: 10px;
    overflow: hidden;
    margin-right: 26px;
  }
  .melist_sbox{
    margin-left: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .melist_box{
    border-bottom: 1px solid #127ddd;
    margin-bottom: 10px;
  }
  .qxbtn{
    position: absolute;
    z-index: 100;
    left: 20px;
    bottom: 20px;
    width: 60px;
  }
</style>
