const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
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
    let imageID = wx.getStorageSync('clickPassImageID')
    this.setData({
      imageID: imageID
    })
    dbutils.users.getCollections().then(_res => {
      let userCollections = _res.data.collections
      this.setData({
        userCollections: userCollections
      })
      dbutils.items.getDataByID(imageID).then(res => {
        this.setData({
          informations: res.data,
          heartIconIsLoved: userCollections.includes(imageID)
        })
      })
    })
  },

  loveClick: function (e) {
    let userCollections = this.data.userCollections
    let loved = this.data.heartIconIsLoved
    let imageID = this.data.imageID
    
    if(loved) {
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
    wx.navigateTo({
      url: '../order/order',
    })
  },
})