<template>
  <div class="flex-item flex-col">
    <div class="flex-item scroll-y" style="background: #eee;">
      <div class="relative article-content c-6" style="max-width: 1200px;">

        <div class="setting-card f-14">
          <table>
            <thead>
              <th>积分名称</th>
              <th>周期</th>
              <th>时间间隔</th>
              <th>最多奖励次数</th>
              <th>每次积分</th>
              <th>开启状态</th>
            </thead>
            <tbody>
              <tr v-for="item in list" @click="openSet(item)">
                <td>{{item.name}}</td>
                <td>{{zqlist[item.cycleType]}}</td>
                <td>{{item.cycleTime}}</td>
                <td>{{item.rewardNum}}</td>
                <td>{{item.point}}</td>
                <td style="text-align: right;" @click.stop>
                  <switcher @change="statusChange(item)" v-model="item.status"></switcher>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="setShow" class="set_bigbox">
          <div class="set_box">
            <ul>
              <li class="set_list">
                <span>周期</span>
                <div class="relative" style="width: 100px;text-align: right">
                  <div class="a" @click="addShow=true">
                    {{zqlist[setdata.cycleType]}}
                  </div>
                  <bubble v-if="addShow" @close="addShow = false">
                    <ul class="f-14 c-5 add-select" style="padding: 4px 10px;width: 100px;left: 0;box-sizing: border-box;">
                      <li v-for="(item, index) in zqlist" class="a flex-v-center" style="line-height: 36px;" @click="setdata.cycleType = index; addShow = false">
                        {{item}}
                      </li>
                    </ul>
                  </bubble>
                </div>
              </li>
              <li v-if="setdata.cycleType == 2" class="set_list">
                <span>间隔分钟数</span>
                <input v-model="setdata.cycleTime" placeholder="间隔分钟数" type="number">
              </li>
              <li class="set_list">
                <span>最多奖励次数</span>
                <input v-model="setdata.rewardNum" placeholder="最多奖励次数" type="number">
              </li>
              <li class="set_list">
                <span>每次积分</span>
                <input v-model="setdata.point" placeholder="每次积分" type="number">
              </li>
            </ul>
            <div style="text-align: right;padding-top: 20px;">
              <btn flat @click="setShow = false">取消</btn>
              <btn @click="changeList">确定</btn>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      setShow: false,
      addShow: false,
      zqlist: ['一次', '每天', '间隔分钟', '不限'],
      setdata: {
        cycleType: 0,
        cycleTime: 0,
        rewardNum: 0,
        point: 0,
        id: null
      },
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform//creditRule/page.monitor').then(res => {
        this.list = res.pages
        this.list.forEach(item => {
          item.status = Number(item.status)
        })
      })
    },
    openSet (item) {
      this.setShow = true
      this.setdata = {
        cycleType: item.cycleType,
        cycleTime: item.cycleTime,
        rewardNum: item.rewardNum,
        point: item.point,
        id: item.id
      }
    },
    statusChange (item) {
      this.$http.post('/cri-cms-platform/creditRule/toggle.monitor', {id: item.id}).then(res => {
        this.getList()
      })
    },
    changeList () {
      this.$http.post('/cri-cms-platform/creditRule/update.monitor', this.setdata).then(res => {
        this.getList()
        this.setShow = false
      })
    }
  }
}
</script>

<style scoped>
  .setting-card td{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  input{
    border: 0;
    width: 100px !important;
    height: 20px !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: right;
  }
  .set_list{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .set_box{
    width: 600px;
    background: #fff;
    padding: 30px 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
  }
  .set_bigbox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input{
    height: 37px;
    margin: 5px 0;
    width: 80%;
    padding: 0 10px;
  }
  .article-content{
    margin: 20px auto 0;
    max-width: 1000px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }
  .product_top{
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .a:hover{
    color: #318fff;
  }
  .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;}
  th,td {padding: 5px 10px;}
  tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
  tr:hover {background: rgba(0, 0, 0, .05);}
</style>
