const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageID: '',
    informations: {},
  },

  orderClick() {
    wx.navigateTo({
      url: '../orderResult/orderResult',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const imageID = wx.getStorageSync('clickPassImageID')
    dbutils.items.getDataByID(imageID).then(res => {
      this.setData({
        imageID: imageID,
        informations: res.data
      })
    })
  }
})