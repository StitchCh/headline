<template>
<div class="settings-role flex-col c-6">
  <div class="af-topbar">
    <span class="f-18">角色管理</span>
  </div>
  <div class="flex-item scroll-y bg-e relative">
    <transition name="fade">
      <div v-if="loading" class="abs" style="background: #eee;z-index: 10;">
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
</div>
</template>

<script>
export default {
  name: 'settings-role',
  data () {
    return {
      loading: false,
      list: []
    }
  },
  methods: {
    getList () {},
    openNew () {},
    openEdit () {}
  }
}
</script>

<style lang="less">
.settings-role{background: #fafafa;
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
