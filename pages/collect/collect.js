// collect.js
const utils = require('../../utils/util.js')
const dbutils = require('../../utils/database_driver')

Page({
  data: {
    tabButton: {
      all: "所有",
      hair: "发型",
      makeup: "彩妆",
      nail: "美甲"
    },
    num: 'all',
    imgs: {},
    imgCounts: {},
    isHidden: 'none',
  },
  onLoad: function () {},
  onShow: function () {
    // onLoad只有第一次点击页面会执行，之后切换到其他页面在切回来的时候只有onShow会执行
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired) {
      console.log('user did not login')
      return
    }

    // 如果用户已登录
    dbutils.users.getCollections().then(_res => {
      const userCollections = _res.data.collections

      dbutils.items.getDataMatchedIDsAndKeys(userCollections, 'type', 'imageURL').then(res => {
        const items = res.data
        let imgs = {}
        let imgCounts = {}
        Object.keys(this.data.tabButton).forEach(type => {
          if (type === 'all') {
            return
          }
          const itemsFilteredByType = items.filter(item => item.type === type)
          imgs[type] = itemsFilteredByType
          imgCounts[type] = imgs[type].length
        })
        // 求所有种类的和
        imgCounts['all'] = Object.values(imgCounts).reduce((a, b) => a + b)
        this.setData({
          imgs: imgs,
          imgCounts: imgCounts
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
  },

  onReady: function () {},

})