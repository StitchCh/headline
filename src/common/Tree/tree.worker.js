/* eslint-disable */
function getTree (data, root, idTxt, pidTxt, childrenTxt) {
  function getNode (id) {
    let node = []
    let len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i][pidTxt] === id) {
        data[i][childrenTxt] = getNode(data[i][idTxt]) || []
        node.push(data[i])
      }
    }
    if (node.length === 0) return
    else return node
  }
  return getNode(root)
}

onmessage = function (e) {
  e = e.data
  let data = e.data || []
  let tree = getTree(data, e.rootId, e.idTxt, e.pidTxt, e.childrenTxt)
  postMessage(tree)
}
