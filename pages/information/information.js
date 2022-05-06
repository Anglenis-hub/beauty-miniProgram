const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageID: '',
    informations: {},
    userCollections: [],
    heartIconIsLoved: false,
    loveSrc: "../../static/image/love.png",
    loveImg: "../../static/image/love.png",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const imageID = wx.getStorageSync('clickPassImageID')
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')

    // 无论用户是否登录，都正确显示图片信息
    dbutils.items.getDataByID(imageID).then(res => {
      this.setData({
        imageID: imageID,
        informations: res.data
      })
    })

    // 如果用户登录
    if (!sessionIsExpired) {
      dbutils.users.getCollections().then(_res => {
        const userCollections = _res.data.collections
        this.setData({
          userCollections: userCollections,
          heartIconIsLoved: userCollections.includes(imageID)
        })
      })
    }
  },

  loveClick: function (e) {
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired) {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '请登录后收藏'
      })
      return
    }

    const loved = this.data.heartIconIsLoved
    const imageID = this.data.imageID
    let userCollections = this.data.userCollections

    if (loved) {
      // 如果已收藏，移除这个id
      userCollections = userCollections.filter(item => item !== imageID)
    } else {
      // 否则添加id进入用户收藏数组
      userCollections.push(imageID)
    }
    dbutils.users.updateCollections(userCollections)

    // 反转按钮状态，并更新页面缓存的收藏数组
    this.setData({
      userCollections: userCollections,
      heartIconIsLoved: !loved
    })
  },
  orderClick() {
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired) {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '请登录后预约'
      })
      return
    }

    wx.navigateTo({
      url: '../order/order',
    })
  },
})