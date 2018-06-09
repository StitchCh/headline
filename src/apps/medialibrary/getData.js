import axios from 'axios'

export default function (type, folderId, toPage) {
  return axios.post('/cri-cms-platform/media/list.monitor', {
    type, folderId, toPage, pageSize: 30
  }).then(res => {
    // 按时间分组
    res.attachments = res.attachments || []
    let result = {
      suffix: res.suffix,
      totalPage: res.totalPage,
      attachments: []
    }
    let group = { date: null, list: [] }
    res.attachments.forEach(item => {
      let date = item.createDate.substring(0, 10)
      if (group.date !== date) {
        group = { date, list: [item] }
        result.attachments.push(group)
      } else {
        group.list.push(item)
      }
    })
    return Promise.resolve(result)
  }).catch(e => {
    return Promise.reject(e)
  })
}
