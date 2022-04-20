const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getData = (collection, id) => {
  wx.cloud.init({
    env: 'cloud1-2ghfekqc5cf347a4'
  })
  const db = wx.cloud.database({
    //这个是环境ID不是环境名称
    env: 'cloud1-2ghfekqc5cf347a4'
  })
  const _ = db.command
  // db.collection(collection).doc(id).get().then(res => {
  //   //如果查询成功的话
  //     return res.data
  // })
}

const testFun = () => {
  let a = 'testData'
  return a
}

module.exports = {
  formatTime,
  testFun,
  getData
}
