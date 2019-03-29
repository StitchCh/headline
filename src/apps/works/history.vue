<template>
  <div class="bigbox flex">
    <ul class="btnbox">
      <li class="btn_listbox" :class="{btn_liston: index == btnindex}" v-for="(item, index) in list" @click="btnindex = index">
        <div class="btn_list">{{item.date}}</div>
      </li>
    </ul>

    <div class="contentbox">
      <h2>操作记录</h2>
      <ul v-if="list.length">
        <li class="content_list" v-for="(item, index) in list[btnindex].data">
          <p><span>{{index+1}}</span>{{item.mark}}</p>
          <p><span></span>{{item.createUser}}<i style="margin-right: 10px;"></i> {{item.createDate}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      list: [],
      btnindex: 0
    }
  },
  watch: {
    '$route.query.channelId' () {
      this.$router.replace({
        path: '/works',
        query: this.$route.query
      })
      this.$http.post('/cri-cms-platform/issue/getIssueLog.monitor', {
        channelId: this.$route.query.channelId
      }).then(res => {
        this.list = res.data
        console.log(res)
      })
    }
  },
  beforeMount () {
    this.$http.post('/cri-cms-platform/issue/getIssueLog.monitor', {
      channelId: this.$route.query.channelId,
      pageSize: 10000
    }).then(res => {
      console.log(res.data)
      this.list = res.data
    })
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  h2{
    margin-top: 0;
  }
  .btnbox{
    width: 250px;
    border: 1px solid #ddd;
    border-right: 0;
    height: 100%;
    background: #f5f5f5;
    color: #666;
    overflow: auto;
  }
  .contentbox{
    width: calc(100% - 250px);
    height: 100%;
    background: #fff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 20px;
    overflow: auto;
  }
  .btn_list{
    padding: 15px 10px;
    cursor: pointer;
  }
  .btn_listbox{
    position: relative;
    border-bottom: 1px solid #ddd;
  }
  .content_list span{
    display: inline-block;
    width: 30px;
  }
  .content_list p:nth-child(1){
    margin-bottom: 10px;
  }
  .btn_list:hover{
    background: #fff;
    color: #00a0e9;
  }
  .bigbox{
    position: relative;
    height: 100%;
  }
  .content_list{
    border: 1px solid #ddd;
    margin-bottom: 20px;
    line-height: 24px;
    padding: 10px 20px 10px 10px;
    border-radius: 6px;
    transition: 0.4s;
    background: #f5f5f5;
    color: #666;
  }
  .content_list:hover{
    border-color: #999;
    background: #fff;
    color: #333;
  }
  .btn_liston{
    background: #fff;
    color: #00a0e9;
    width: 250px;
    position: relative;
    z-index: 10;
  }
</style>
