var lastStr = ''

function testSection (number) { //全角字符
  //大写英文
  if (number > 64 + 65248 && number < 90 + 65248) {
    return true
  }
  //小写英文
  if (number > 96 + 65248 && number < 123 + 65248) {
    return true
  }
  //数字和.（46）
  if (number > 46 + 65248 && number < 58 + 65248) {
    return true
  }
  //俄文
  if (number > 1023 + 65248 && number < 1328 + 65248) {
    return true
  }
  return false
}

function testSectionB (number) { //全角字符
  //大写英文
  if (number > 64 && number < 90 ) {
    return true
  }
  //小写英文
  if (number > 96 && number < 123 ) {
    return true
  }
  //数字和.（46）
  if (number > 46 && number < 58) {
    return true
  }
  //俄文
  if (number > 1023 && number < 1328) {
    return true
  }
  return false
}

function fBDStr (number) {
  let arr = [
    8211,
    171,
    187,
  ]
  return arr.indexOf(number) < 0 ? false : true
}

function bdStr (number) { //中文标点白名单（无对应半角）
  let arr = [
    12304,
    12305,
    12300,
    12301,
    12290,
    12289,
    8220,
    65292,
    8221,
    65292,
    8216,
    65292,
    8217,
    65292,
    12308,
    65292,
    12309,
    65292,
    9472,
    65292,
    183,
    65292,
    12298,
    65292,
    12299,
    65292,
    12296,
    65292,
    12297,
    65292,
    183,
    65292,
    8212,
    65292,
    215,
    65292,
    9633,
    65292,
    9650,
    65292,
    9679,
    65292,
    8230,
    32,
    65292,
    8594
  ]
  return arr.indexOf(number) < 0 ? false : true
}

var bdConfig = {

  yinHao: false,
  shuangYinHao: false,
  kuoHao: false

}

function switchAngle (txtstring) {
  var tmp = "";
  var aPcode = null

  for (var i = 0; i < txtstring.length; i++) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g") //中文验证
    var areg = new RegExp("[\\u4E00-\\u9FFF]+","g") //中文验证
    var Qreg = new RegExp("[\\uff00-\\uffff]","g") //全角验证
    let code = txtstring.charCodeAt(i)
    let Pcode = aPcode || txtstring[i - 1] || lastStr || ''
    let ptest = reg.test(Pcode)  //前一个字符中文验证

    if (Pcode != '' && (bdStr(Pcode.charCodeAt(0)) || Pcode == '）')) {
      ptest = true
    }

    if (Pcode.charCodeAt(0) == 32) {
      ptest = false
    } else if (Pcode.charCodeAt(0) == 12288) {
      ptest = true
    }

    if (txtstring[i] != '\n' && !testSectionB(code) && code != 10) {

      if (code == 12288 && !ptest) { //空格全转半

        tmp += String.fromCharCode(32);

      } else if (code == 32 && ptest) { //空格半转全

        tmp += String.fromCharCode(12288);

      } else if (areg.test(txtstring[i])) { //中文验证

        tmp += txtstring[i]

      } else if (testSection(code)) { //全角英文 俄文 数字判断

        if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
        {
          tmp += String.fromCharCode(code - 65248); //把全角字符的unicode编码转换为对应半角字符的unicode码
        } else {
          tmp += txtstring[i]
        }

      } else {  //标点

        let jiao = code >= 65248  //自身全角验证
        if (code == 12288 || code == 32) { //空格过滤

          if (ptest) {
            tmp += String.fromCharCode(12288)
          } else {
            tmp += String.fromCharCode(32)
          }

        } else if (!ptest && jiao && !fBDStr(code)) { //全转半

          if ((code == 65289 && bdConfig.kuoHao) || (code == 65287 && bdConfig.yinHao) || (code == 65282 && bdConfig.shuangYinHao)) {
            tmp += txtstring[i]
          } else {
            tmp += String.fromCharCode(code - 65248);
          }

        } else if (ptest && !jiao && !bdStr(code) && !fBDStr(code)) { //半转全


          if (code == 39) {
            bdConfig.yinHao = true
          } else if (code == 34) {
            bdConfig.shuangYinHao = true
          } else if (code == 40) {
            bdConfig.kuoHao = true
          }
          tmp += String.fromCharCode(code + 65248);

        } else if ((bdConfig.yinHao && code == 39) || (bdConfig.shuangYinHao && code == 34) || (bdConfig.kuoHao && code == 41)) {


          if (code == 39) {
            bdConfig.yinHao = false
            tmp += String.fromCharCode(code + 65248);
          } else if (code == 34) {
            bdConfig.shuangYinHao = false
            tmp += String.fromCharCode(code + 65248);
          } else if (code == 41) {
            bdConfig.kuoHao = false
            tmp += String.fromCharCode(code + 65248);
          } else if (code == 65288) {
            bdConfig.kuoHao = false
            tmp += String.fromCharCode(40);
          } else {
            tmp += String.fromCharCode(code + 65248);
          }

        } else {

          if (code == 39 + 65248) {
            bdConfig.yinHao = true
          } else if (code == 34 + 65248) {
            bdConfig.shuangYinHao = true
          } else if (code == 65288) {
            bdConfig.kuoHao = true
          }

          tmp += txtstring[i]

        }

      }

    } else {
      tmp += txtstring[i];
    }

    lastStr = txtstring[i]
    aPcode = tmp[tmp.length - 1]

  }

  return tmp;
}


export default switchAngle
