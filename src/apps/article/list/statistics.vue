<template>
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
          <div style="font-weight: 700;color: #000000;margin-bottom: 20px;">{{days.list.find(v => v.value === days.value).text}}总计</div>
          <table>
            <tbody>
            <tr style="border: 0;">
              <th>阅读</th>
              <td>{{statistics.global.pv}}</td>
            </tr>
            <tr>
              <th>评论</th>
              <td>{{statistics.global.commentCount}}</td>
            </tr>
            <tr>
              <th>分享</th>
              <td>{{statistics.global.shareCount}}</td>
            </tr>
            <tr>
              <th>点赞</th>
              <td>{{statistics.global.diggCount}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div style="flex: 2;margin-left: 100px;">
          <div style="font-weight: 700;color: #000000;margin-bottom: 20px;">各平台统计</div>
          <table>
            <tbody>
            <tr>
              <th>pv</th>
              <td>{{statistics.pv}}</td>
            </tr>
            <tr>
              <th>uv</th>
              <td>{{statistics.uv}}</td>
            </tr>
            </tbody>
          </table>
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
  name: 'app-article-statistics',
  props: ['id'],
  data () {
    return {
      statistics: null,
      days: {
        value: '1',
        list: [
          { value: '1', text: '当日' },
          { value: '2', text: '昨日' },
          { value: '3', text: '7日内' },
          { value: '4', text: '30日内' }
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
            { name: 'pc' },
            { name: 'app' },
            { name: 'web' }
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          { name: 'pc', type: 'line', seriesLayoutBy: 'row' },
          { name: 'app', type: 'line', seriesLayoutBy: 'row' },
          { name: 'web', type: 'line', seriesLayoutBy: 'row' }
        ]
      }
    }
  },
  methods: {
    getStatistics () {
      this.$http.post('/cri-cms-platform/article/statistics.monitor', {
        contentId: this.id,
        days: this.days.value
      }).then(
        res => {
          this.statistics = res

          var arr = []
          for (var k in this.statistics.pv) {
            arr.push(k);
          }
          this.option.dataset.source.push(arr)

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
}
</style>
