<template>
  <div class="app-common flex-col c-6">
    <div class="af-topbar">
      <span class="f-18">邀请码统计</span>
    </div>

    <div class="relative article-statistics c-6">
      <div class="article-statistics-content">
        <div class="flex">
          <select-box v-model="days.value" :list="days.list" label="时间范围" @change="getStatistics"></select-box>
        </div>
        <div v-if="!statistics" class="abs flex-center" style="height: 400px;">
          <no-data/>
        </div>

        <div ref="echarts" style="height: 400px;"></div>

        <div v-if="statistics" class="flex" style="padding-top: 20px">
          <div class="flex-item">
            <div style="font-weight: 700;color: #000000;margin-bottom: 20px;">总计</div>
            <table>
              <tbody>
              <tr>
                <th>今日</th>
                <td>{{statistics.todayCount}}</td>
              </tr>
              <tr>
                <th>昨日</th>
                <td>{{statistics.yesterdayCount}}</td>
              </tr>
              <tr>
                <th>总计</th>
                <td>{{statistics.totalCount}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style="flex: 3;" class="code-card">
            <div style="font-weight: 700;color: #000000;margin-bottom: 20px;">邀请列表</div>
            <table>
              <thead>
              <tr>
                <th>序列</th>
                <th>被邀请人</th>
                <th>时间</th>
                <th>邀请人</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in list">
                <td>{{index + 1}}</td>
                <td>{{item.inviteMemberName}}</td>
                <td>{{item.inviteTime}}</td>
                <td>{{item.invitedMemberName}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'

  export default {
    data () {
      return {
        statistics: null,
        list: [],
        days: {
          value: '7',
          list: [
            { value: '7', text: '7日内' },
            { value: '15', text: '15日内' }
          ]
        },
        myEcharts: null,
        option: {
          title: {
            text: '趋势'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature: {
              dataView: {
                show: true,
                readOnly: true
              },
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {},
          dataset: {
            source: [],
            dimension: [
              { name: 'day', type: 'string' },
              { name: '邀请量' },
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
            { name: '邀请量', type: 'line', seriesLayoutBy: 'row' }
          ]
        }
      }
    },
    methods: {
      getStatistics () {
        this.$http.post('/cri-cms-platform/invite/list.monitor', {
          scope: this.days.value
        }).then(
          res => {
            console.log(res)
            this.statistics = res
            this.list = res.dayDetails
            let list = this.statistics.dayStatistics.substr(1)
            list = list.substr(0, list.length - 1).split(',')
            console.log(list)

            var arr = ['day']
            var pvArr = ['邀请量']

            list.forEach(item => {
              let aitem = item.split('=')
              arr.push(aitem[0])
              pvArr.push(aitem[1])
            })

            // var uvArr = ['uv']
            // var opv = 0
            // var ouv = 0
            //
            // for (var k in this.statistics.pv) {
            //   arr.push(k)
            //   pvArr.push(this.statistics.pv[k])
            //   uvArr.push(this.statistics.uv[k])
            //   opv += Number(this.statistics.pv[k])
            //   ouv += Number(this.statistics.uv[k])
            // }
            //
            // this.pv = opv
            // this.uv = ouv
            this.option.dataset.source = [ arr, pvArr ]
            this.setOption()
          }
        )
      },
      setOption () {
        this.myEcharts.setOption(this.option)
      }
    },
    created () {
      this.getStatistics()
    },
    mounted () {
      this.myEcharts = echarts.init(this.$refs.echarts)
    }
  }
</script>

<style lang="less">
  .article-statistics {height: 100%;overflow: auto;
    .article-statistics-content {
      max-width: 900px;margin: 0 auto;padding: 20px 0;
      /*th,td {text-align: center;}*/
    }
    .code-card {
      background: #fff;
      th,
      td {
        padding: 5px 10px;
      }
      th>p, td>p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        max-width: 480px;
      }
      tr {
        border-bottom: 1px solid #e1e1e1;
        cursor: pointer;
      }
      tr:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
</style>
