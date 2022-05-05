// index.js
const dbutils = require('../../utils/database_driver')

Page({
  data: {
    tabButton: {
      hair: "发型",
      makeup: "彩妆",
      nail: "美甲"
    },
    num: 'hair',
    imgs: {},
    isHidden: 'none',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../collect/collect'
    })
  },
  createInfo() {
    dbutils.insert('information', 'informations.nail', arr)
  },
  onLoad() {
    let imgs = {}
    Object.keys(this.data.tabButton).forEach(type => {
      dbutils.items.getDataByType(type, 'imageURL').then(res => {
        imgs[type] = res.data
        this.setData({
          imgs: imgs
        })
      })
    })
  },
  onPageScroll(e) {
    // console.log(e);
    if (e.scrollTop !== 0) {
      this.setData({
        isHidden: 'block'
      })
    } else {
      this.setData({
        isHidden: 'none'
      })
    }
  }
})