<template>
  <div class="abs bg-f c-6 flex-col app-menus">
    <div class="af-topbar flex-v-center">
      <dock title="菜单" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item scroll-y bg-e relative menus-content">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-16 add-btn" @click="openNew('-1')">
        添加新菜单...
      </div>

      <div class="setting-card f-14">
        <table>
          <thead>
          <th>选项卡</th>
          <th>菜单名称</th>
          <th>菜单URL</th>
          <th>排序</th>
          <th>图标</th>
          <th>创建日期</th>
          <th>展示项</th>
          <th colspan="4">操作</th>
          </thead>
          <tbody>
          <tr v-for="item in list" :key="item.id" @click="openDetail(item.id)">
            <td>
              <icon-btn v-show="item.sysMenuParentId == '-1'" v-tooltip="'收起下级'" v-if="menuChildShow[item.id]" small @click.stop.native="packupChild(item.id)">keyboard_arrow_up</icon-btn>
              <icon-btn v-show="item.sysMenuParentId == '-1'" v-tooltip="'展示下级'" v-else small @click.stop.native="showChild(item.id)">keyboard_arrow_down</icon-btn>
            </td>
            <td>{{item.sysMenuName}}</td>
            <td>{{item.sysMenuUrl}}</td>
            <td>{{item.sysMenuOrder}}</td>
            <td>{{item.sysMenuIcon}}</td>
            <td>{{item.createDate}}</td>
            <td>{{item.sysMenuShowFlag | showFlag}}</td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'编辑'" small @click.stop.native="openEdit(item.id)">edit</icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'查看'" small @click.stop.native="openDetail(item.id)">
                info
              </icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'删除'" small @click.stop.native="deleteMenu(item.id)">
                delete
              </icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'添加子菜单'" v-if="item.sysMenuShowFlag === '1' && item.sysMenuParentId !== '-1'" small
                        @click.stop.native="openNew(item.id)">
                add_child
              </icon-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <layer v-if="detailShow" title="菜单详情" width="600px" maskClick @close="detailShow = false">
        <div class="layer-text">
          <table>
            <tbody>
            <tr>
              <th align="right">菜单名称</th>
              <td>{{detail.menu.sysMenuName}}</td>
            </tr>
            <tr>
              <th align="right">菜单URL</th>
              <td>{{detail.menu.sysMenuUrl}}</td>
            </tr>
            <tr>
              <th align="right">菜单排序</th>
              <td>{{detail.menu.sysMenuOrder}}</td>
            </tr>
            <tr>
              <th align="right">上级菜单</th>
              <td>{{getParent(detail.menu.sysMenuParentId)}}</td>
            </tr>
            <tr>
              <th align="right">是否展示项</th>
              <td>{{detail.menu.sysMenuShowFlag | showFlag}}</td>
            </tr>
            <tr v-show="detail.menu.sysMenuShowFlag == '1'">
              <th align="right">菜单图标</th>
              <td>{{detail.menu.sysMenuIcon}}</td>
            </tr>
            <tr>
              <th align="right">创建时间</th>
              <td>{{detail.menu.createDate}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="layer-btns">
          <btn flat color="#66BB6A" @click="detailShow = false">关闭</btn>
        </div>
      </layer>

      <layer v-if="newShow" title="添加菜单" width="600px">
        <div class="layer-text">
          <input-box label="菜单名称" v-model="newForm.sysMenuName"></input-box>
          <input-box label="菜单URL" v-model="newForm.sysMenuUrl"></input-box>
          <input-box label="菜单排序" v-model="newForm.sysMenuOrder"></input-box>
          <input-box label="图标" v-show="newForm.sysMenuParentId == '-1'" v-model="newForm.sysMenuIcon"></input-box>
          <div>
            <div class="flex-v-center">
              <span class="flex-item">展示项</span>
              <switcher mode="Number" v-model="newForm.sysMenuShowFlag"/>
            </div>
          </div>
          <div class="relative input-box">
            <label>上级菜单</label>
            <div style="padding-left: 80px;">
              <tag v-for="item in newParentMenus" :key="item" small>{{getNewMenu(item)}}</tag>
              <icon-btn small @click="getNewParentMenus">edit</icon-btn>
            </div>
          </div>
        </div>
        <div class="layer-btns">
          <btn flat @click="newShow = false">取消</btn>
          <btn flat color="#66BB6A" @click="submitNew">提交</btn>
        </div>
      </layer>

      <layer v-if="editShow" title="修改菜单" width="600px">
        <div class="layer-text">
          <input-box label="菜单名称" v-model="editForm.sysMenuName"></input-box>
          <input-box label="菜单URL" v-model="editForm.sysMenuUrl"></input-box>
          <input-box label="菜单排序" v-model="editForm.sysMenuOrder"></input-box>
          <input-box label="图标" v-show="editForm.sysMenuParentId == '-1'" v-model="editForm.sysMenuIcon"></input-box>
          <div>
            <div class="flex-v-center">
              <span class="flex-item">展示项</span>
              <switcher mode="Number" v-model="editForm.sysMenuShowFlag"/>
            </div>
          </div>
          <div class="relative input-box">
            <label>上级菜单</label>
            <div style="padding-left: 50px;">
              <tag v-for="item in editParentMenus" :key="item" small>{{getEditMenu(item)}}</tag>
              <icon-btn small @click="getEditParentMenus">edit</icon-btn>
            </div>
          </div>
        </div>
        <div class="layer-btns">
          <btn flat @click="editShow = false">取消</btn>
          <btn flat color="#66BB6A" @click="submitEdit">提交</btn>
        </div>
      </layer>

      <select-card :value="newParentMenus" multiple v-if="newParentMenusShow" title="选择上级菜单" width="600px" maskClick @close="newParentMenusShow = false">
        <select-card-option v-for="item in parentMenus" :value="item.id" :key="item.id" @click="selectNewParentMenu(item.id)">{{item.sysMenuName}}</select-card-option>
      </select-card>
      <select-card :value="editParentMenus" multiple v-if="editParentMenusShow" title="选择上级菜单" width="600px" maskClick @close="editParentMenusShow = false">
        <select-card-option v-for="item in parentMenus" :value="item.id" :key="item.id" @click="selectEditParentMenu(item.id)">{{item.sysMenuName}}</select-card-option>
      </select-card>
  </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'
import SelectCard from '@/components/select-card/index'
import SelectCardOption from '@/components/select-card/option'

export default {
  name: 'app-menus',
  components: {Account, Dock, SelectCard, SelectCardOption},
  data () {
    return {
      loading: true,
      list: [],
      parentMenus: [], // 上级菜单
      menuChildShow: {}, // 如果这个id在对象中存在，那么就是点击过打开按钮的，否则就是没有打开过的
      detailShow: false,
      detail: {},
      newShow: false,
      newParentMenusShow: false,
      newForm: {
        sysMenuParentId: '',
        sysMenuName: '',
        sysMenuUrl: '',
        sysMenuOrder: '',
        sysMenuShowFlag: 1,
        sysMenuIcon: ''
      },
      editShow: false,
      editParentMenusShow: false,
      editForm: {
        sysMenuParentId: '',
        sysMenuName: '',
        sysMenuUrl: '',
        sysMenuOrder: '',
        sysMenuShowFlag: 1,
        sysMenuIcon: ''
      }
    }
  },
  computed: {
    newParentMenus: {
      get () {
        if (this.newForm.sysMenuParentId === '') return []
        return this.newForm.sysMenuParentId.split(',')
      },
      set (value) {
        this.newForm.sysMenuParentId = value.join(',')
      }
    },
    editParentMenus: {
      get () {
        if (this.editForm.sysMenuParentId === '') return []
        return this.editForm.sysMenuParentId.split(',')
      },
      set (value) {
        this.editForm.sysMenuParentId = value.join(',')
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/sysMenu/list.monitor').then(
        res => {
          this.list = res
          this.loading = false
        }
      )
    },
    showChild (id) {
      // 展开子菜单
      if (!this.menuChildShow[id]) {
        this.menuChildShow[id] = true
        this.loading = true
        this.$http.post('/cri-cms-platform/sysMenu/children.monitor', {'id': id}).then(
          res => {
            this.loading = false
            let childList = res
            let newList = []
            for (var tempIndex in this.list) {
              newList.push(this.list[tempIndex])
              if (id === this.list[tempIndex].id) {
                for (var index2 in childList) {
                  newList.push(childList[index2])
                }
              }
            }
            this.list = newList
          }
        )
      }
    },
    packupChild (id) {
      // 收起子菜单
      let removeIds = []
      for (var index in this.list) {
        if (this.list[index].sysMenuParentId === id) {
          removeIds.push(this.list[index].id)
        }
      }
      for (var index2 in this.list) {
        if (removeIds.indexOf(this.list[index2].sysMenuParentId) !== -1) {
          removeIds.push(this.list[index2].id)
        }
      }
      let newList = []
      for (var index3 in this.list) {
        if (removeIds.indexOf(this.list[index3].id) === -1) {
          newList.push(this.list[index3])
        }
      }
      this.menuChildShow[id] = false
      this.list = newList
    },
    // 打开新建菜单层
    openNew (parentId) {
      for (let k in this.newForm) {
        this.newForm[k] = ''
      }
      if (parentId === '-1') {
        // 说明是添加二级菜单
        this.$http.post('/cri-cms-platform/sysMenu/list.monitor').then(
          res => {
            var p = [ { id: '-1', sysMenuName: '根目录' } ]
            for (var index in res) {
              p.push(res[index])
            }
            this.newForm.sysMenuShowFlag = 1
            this.newForm.sysMenuParentId = '-1'
            this.parentMenus = p
          }
        )
      } else {
        this.$http.post('/cri-cms-platform/sysMenu/get.monitor', { 'id': parentId }).then(
          res => {
            var p = []
            p.push(res.menu)
            this.parentMenus = p
            this.newForm.sysMenuShowFlag = '0'
            this.newForm.sysMenuParentId = res.menu.id
          }
        )
      }
      this.newShow = true
    },
    // 获取上级菜单
    getNewParentMenus () {
      // 获取添加二级菜单时的一级菜单, 去获取一级菜单
      // this.parentMenus = this.list
      this.newParentMenusShow = true
    },
    // 获取上级菜单
    getEditParentMenus () {
      // 获取添加二级菜单时的一级菜单, 去获取一级菜单
      // this.parentMenus = this.list
      this.editParentMenusShow = true
    },
    getNewMenu (value) {
      if (value === '') return ''
      let pm = this.parentMenus.find(v => {
        return value === v.id
      })
      return pm.sysMenuName
    },
    getEditMenu (value) {
      if (value === '') return ''
      let pm = this.parentMenus.find(v => {
        return value === v.id
      })
      return pm.sysMenuName
    },
    openDetail (id) {
      this.$http.post('/cri-cms-platform/sysMenu/get.monitor', { id }).then(
        res => {
          this.detail = res
          this.detailShow = true
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    },
    getParent (id) {
      if (id === '-1') {
        return '根目录'
      } else {
        return this.list.find(v => {
          return id === v.id
        }).sysMenuName
      }
    },
    deleteMenu (id) {
      this.$http.post('/cri-cms-platform/sysMenu/delete.monitor', { id }).then(
        res => {
          this.$toast('删除成功')
          this.getList()
          this.detailShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    },
    vertifyUrl () {

    },
    submitNew () {
      if (this.newForm.sysMenuParentId === '') {
        this.$toast('请选择上级菜单')
        return
      }
      if (this.newForm.sysMenuName === '') {
        this.$toast('请输入菜单名称')
        return
      }
      if (this.newForm.sysMenuOrder === '') {
        this.$toast('请输入菜单排序')
        return
      }
      if (this.newForm.sysMenuUrl === '') {
        this.$toast('请输入菜单URL')
        return
      }
      if (this.newForm.sysMenuIcon === '' && this.editForm.sysMenuParentId == -1) {
        this.$toast('请输入菜单图标')
        return
      }
      this.$http.post('/cri-cms-platform/sysMenu/save.monitor', this.newForm).then(
        res => {
          this.getList()
          this.newShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    },
    openEdit (id) {
      this.$http.post('/cri-cms-platform/sysMenu/get.monitor', { id }).then(
        res => {
          this.editForm.id = res.menu.id
          this.editForm.sysMenuName = res.menu.sysMenuName
          this.editForm.sysMenuUrl = res.menu.sysMenuUrl
          this.editForm.sysMenuIcon = res.menu.sysMenuIcon
          this.editForm.sysMenuShowFlag = Number(res.menu.sysMenuShowFlag)
          this.editForm.sysMenuOrder = res.menu.sysMenuOrder
          if (res.menu.sysMenuParentId === '-1') {
            // 说明是添加二级菜单
            this.$http.post('/cri-cms-platform/sysMenu/list.monitor').then(
              res2 => {
                var p = [ { id: '-1', sysMenuName: '根目录' } ]
                for (var index in res2) {
                  p.push(res2[index])
                }
                this.editForm.sysMenuParentId = '-1'
                this.parentMenus = p
              }
            )
          } else {
            this.$http.post('/cri-cms-platform/sysMenu/get.monitor', { 'id': res.menu.sysMenuParentId }).then(
              res3 => {
                this.$http.post('/cri-cms-platform/sysMenu/list.monitor').then(res2 => {
                  var p = [ { id: '-1', sysMenuName: '根目录' } ]
                  for (var index in res2) {
                    p.push(res2[index])
                    this.parentMenus = p
                    this.editForm.sysMenuParentId = res3.menu.id
                  }
                })
              }
            )
          }
          this.editShow = true
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    },
    submitEdit () {
      if (this.editForm.sysMenuParentId === '') {
        this.$toast('请选择上级菜单')
        return
      }
      if (this.editForm.sysMenuName === '') {
        this.$toast('请输入菜单名称')
        return
      }
      if (this.editForm.sysMenuOrder === '') {
        this.$toast('请输入菜单排序')
        return
      }
      if (this.editForm.sysMenuUrl === '') {
        this.$toast('请输入菜单URL')
        return
      }
      if (this.editForm.sysMenuIcon === '' && this.editForm.sysMenuParentId == -1) {
        this.$toast('请输入菜单图标')
        return
      }
      this.$http.post('/cri-cms-platform/sysMenu/update.monitor', this.editForm).then(
        res => {
          this.getList()
          this.editShow = false
          this.detailShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
        }
      )
    },
    selectNewParentMenu (id) {
      if (id == -1) {
        this.newForm.sysMenuShowFlag = 1
      } else {
        this.newForm.sysMenuShowFlag = 0
      }
      let index = this.newParentMenus.findIndex(v => v === id)
      let tempArr = this.newParentMenus.map(v => v)
      if (index === -1) {
        tempArr = []
        tempArr.push(id)
      } else {
        tempArr.splice(index, 1)
      }
      this.newParentMenus = tempArr
      this.newParentMenusShow = false
    },
    selectEditParentMenu (id) {
      let index = this.editParentMenus.findIndex(v => v === id)
      let tempArr = this.editParentMenus.map(v => v)
      if (index === -1) {
        tempArr = []
        tempArr.push(id)
      } else {
        tempArr.splice(index, 1)
      }
      this.editParentMenus = tempArr
      this.editParentMenusShow = false
    }
  },
  filters: {
    showFlag (value) {
      if (value === '1') return '是'
      if (value === '0') return '否'
      return ''
    }
  },
  created () {
    Promise.all([
      this.$http.post('/cri-cms-platform/sysMenu/list.monitor')
    ]).then(
      res => {
        this.list = res[0]
        this.loading = false
      }
    )
  }
}
</script>

<style lang="less">
  .app-menus {
    .menus-content {
      .setting-card {
        max-width: 1440px;
        margin: 20px auto;
        border-radius: 10px;
        padding: 20px;
        background: #fff;
        th, td {
          padding: 5px 10px;
        }
        tr {
          border-top: 1px solid #e1e1e1;
          cursor: pointer;
        }
        tr:hover {
          background: rgba(0, 0, 0, .05);
        }
      }
    }
    .account {
      position: absolute;
      right: 15px;
      top: 8px;
      z-index: 30;
    }
    .navigator-item.active {
      background: #66BB6A;
      color: #fff;
    }
    .navigator-item .icon {
      transition: none;
    }
    .menus-content {
      //background: #fafafa;
      .setting-card {
        max-width: 1440px;
        margin: 20px auto;
        border-radius: 10px;
        padding: 20px;
        background: #fff;
        th, td {
          padding: 5px 10px;
        }
        tr {
          border-top: 1px solid #e1e1e1;
          cursor: pointer;
        }
        tr:hover {
          background: rgba(0, 0, 0, .05);
        }
      }
      .add-btn {
        color: #008cff;
        padding: 14px 30px;
        cursor: pointer;
        transition: background .2s;
        &:active {
          background: #e1e1e1;
        }
      }
      .layer-text {
        th, td {
          padding: 5px 15px;
        }
        th {
          width: 130px;
        }
      }
    }
  }
</style>
