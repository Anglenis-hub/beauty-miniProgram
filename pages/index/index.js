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
    hairImgs: [],
    makeupImgs: [],
    nailImgs: [],
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
    Object.keys(this.data.tabButton).forEach(type => {
      dbutils.items.getDataByType(type, 'imageURL').then(res => {
        this.setData({
          [`${type}Imgs`]: res.data
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