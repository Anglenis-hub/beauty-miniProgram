const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    informations: {},
    loveSrc: "../../static/image/love.png",
    loveImg: "../../static/image/love.png",
    passCollectIndex: -1,
    passCollectType: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let passCollectIndex = wx.getStorageSync('passCollectIndex')
    let passCollectType = wx.getStorageSync('passCollectType')
    this.setData({
      passCollectIndex: passCollectIndex,
      passCollectType: passCollectType
    })
    // console.log(passCollectIndex, passCollectType)
    dbutils.getData.getDataFromId('information').then(res => {
      let temp = this.data.informations
      temp.hair = res.data.informations.hair
      temp.makeup = res.data.informations.makeup
      temp.nail = res.data.informations.nail
      this.setData({
        informations: temp
      })
    }) 
    console.log('informations:',this.data.informations)
  }, 
  orderClick() {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  observers:{
    'loveImg': function(e) {
      console.log(e)
      // if(e) {
      //   this.setData ({
      //     clearShow: true
      //   })
      // } else {
      //   this.setData ({
      //     clearShow: false
      //   })
      // }
    }
  }
})