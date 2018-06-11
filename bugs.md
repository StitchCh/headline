<!-- 1. 文章接口 scope 和 status 全部可选值 -->
<!-- 2. 文章接口 参数（频道，排序，搜索， 等）无效果 -->
<!-- 3. 缺少获取文章内容接口 -->
4. 素材库获取视频和音频接口
5. 素材库图片路径拼接无法访问 (suffix + filePath + fileName)
<!-- 6. 素材库文件夹的创建接口 -->

7.  所有写操作特殊字符未处理，报错（如：表情符号，无意中发现😆）
8.  素材左侧文件夹更新接口（/media/folder/update.monitor）无法更新单独属性（如修改名称，顺序，等）
<!-- 9.  文章内容获取接口（/article/get.monitor）均返回 null ？？ -->
10. 文章保存及获取草稿接口？
<!-- 11. 回收站？ -->

12. 文章删除 提示成功，但是还在？
13. 回收站接口报错（PreparedStatementCallback; bad SQL grammar [select count(*) c from
    ( SELECT * FROM site_1001.content WHERE 1=1 AND app = ? AND is_delete = ? AND
    create_user = ? ORDER BY CREATE_DATE null) pc]; nested exception is
    com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: #42000）
14. 路由问题
