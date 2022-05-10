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
    collectNumInfo: '',
    isShop: false,
    userPhoto: ''
  },
  onLoad: function () { },
  onShow: function () {
    // onLoad只有第一次点击页面会执行，之后切换到其他页面在切回来的时候只有onShow会执行

    const isShop = wx.getStorageSync('isShop')
    if (isShop) {
      this.setData({
        isShop: true,
      })
      wx.setNavigationBarTitle({
        title: "作品集"
      })
    } else {
      this.setData({
        isShop: false,
      })
      wx.setNavigationBarTitle({
        title: "收藏"
      })
    }

    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired) {
      this.setData({
        collectNumInfo: '请登录后查看',
        imgs: {},
        imgCounts: {}
      })
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
  publishClick() {
    wx.navigateTo({
      url: '../publishWork/publishWork',
    })
  },

  onReady: function () { },

})