<template>
  <div class="abs bg-f c-6 flex-col app-front-desk-users">
    <div class="af-topbar flex-v-center">
      <dock title="前台用户管理" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>

    <div class="flex-item scroll-y bg-e relative front-desk-users-content">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-14">
        <!--<table>-->
          <!--<thead>-->
          <!--<th>用户ID</th>-->
          <!--<th>角色名称</th>-->
          <!--<th>角色中文名</th>-->
          <!--<th>创建人</th>-->
          <!--<th>创建时间</th>-->
          <!--<th colspan="2">操作</th>-->
          <!--</thead>-->
          <!--<tbody>-->
          <!--<tr v-for="item in list" :key="item.id" @click="openDetail(item.id)">-->
            <!--<td>{{item.id}}</td>-->
            <!--<td>{{item.rolesName}}</td>-->
            <!--<td>{{item.rolesCnName}}</td>-->
            <!--<td>{{item.createUser}}</td>-->
            <!--<td>{{item.createTime}}</td>-->
            <!--<td style="width: 30px;"><icon-btn small>edit</icon-btn></td>-->
            <!--<td style="width: 30px;"><icon-btn small>delete</icon-btn></td>-->
          <!--</tr>-->
          <!--</tbody>-->
        <!--</table>-->
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'

export default {
  name: 'app-front-desk-users',
  components: { Account, Dock },
  data () {
    return {
      loading: true,
      list: [],
      filter: {
        PageSize: 20,
        toPage: 1,
        orderby: '',
        order: '',
        searchby: '',
        search: ''
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/member/list.monitor', this.filter).then(
        res => {
          console.log(res)
          this.loading = false
        }
      ).catch(
        res => {
          this.$toast(res || res.msg)
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
.app-front-desk-users {
  .front-desk-users-content {
    .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
      th,td {padding: 5px 10px;}
      tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
      tr:hover {background: rgba(0, 0, 0, .05);}
    }
    .add-btn {color: #008cff;padding: 14px 30px;cursor: pointer;transition: background .2s;
      &:active {background: #e1e1e1;}
    }
  }
}
</style>
