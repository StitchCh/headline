<template>
  <div>

    <div>
      <vue-datepicker-local
        v-model="dateRange"
        format="YYYY-MM-DD"
        show-buttons></vue-datepicker-local>

      <div ref="echarts" style="height: 400px;"></div>
    </div>

    <div>


      <div ref="echarts1" style="height: 400px;"></div>
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
  import 'echarts/lib/chart/pie'
  import VueDatepickerLocal from 'vue-datepicker-local'


  export default {
    components: { VueDatepickerLocal },
    data () {
      return {
        dateRange: ['2019-10-10', '2019-10-20'],
        myEcharts: null,
        option: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['中文站', '俄文站']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2019-12-21', '2019-12-22', '2019-12-23', '2019-12-24', '2019-12-25', '2019-12-26', '2019-12-27']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '中文站',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '俄文站',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            }
          ]
        },
        myEcharts1: null,
        option1: {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      setOption () {
        this.myEcharts.setOption(this.option)
      }
    },
    mounted () {
      this.myEcharts = echarts.init(this.$refs.echarts)
      this.myEcharts1 = echarts.init(this.$refs.echarts1)
      this.setOption()
      this.myEcharts1.setOption(this.option1)
    }
  }
</script>

<style scoped>

</style>
