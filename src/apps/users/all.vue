<template>
  <div class="users-all">
    <div class="af-topbar">
      <span class="f-18">全部</span>
    </div>
    <div class="flex-item scroll-y bg-e relative">

    </div>
  </div>
</template>

<script>
export default {
  name: 'users-all'
}
</script>

<style lang="less">
.users-all {background: #fafafa;
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
