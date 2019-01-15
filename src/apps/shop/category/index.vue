<template>
	<div class="flex-item flex-col">
	    <div class="flex-item scroll-y" style="background: #eee;">
	      <div class="relative article-content c-6" style="max-width: 1200px;">
			<div class="flex-v-center product_top">
	          <div class="flex-v-center a"">
	            <i class="icon">add_box</i><span style="padding-left: 4px;">添加分类</span>
	          </div>
	        </div>

	        <div class="setting-card f-14">
		        <table>
					<thead>
						<th style="width: 100px;">序号</th>
						<th>分类名称</th>
						<th style="width: 250px;">创建时间</th>
						<th style="width: 100px;">操作</th>
					</thead>
					<tbody>
						<tr v-for="(item, index) in list">
							<td>{{index + 1}}</td>
							<td>
								<p>{{item.typeName}}</p>
								<!-- <input type="text" v-model="item.typeName" name=""> -->
							</td>
							<td>{{item.createDate}}</td>
							<td>
								<icon-btn v-tooltip="'编辑'" small>edit</icon-btn>
				                <icon-btn v-tooltip="'删除'" small>delete</icon-btn>
							</td>
						</tr>
					</tbody>
		        </table>
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
    		list: []
    	}
    },
    mounted () {
    	this.getList()
    },
    methods: {
    	getList () {
    		this.$http.post('/cri-cms-platform/mall/queryListType.monitor').then(res => {
    			this.list = res
    		})
    	}
    }
  }
</script>

<style scoped>
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
