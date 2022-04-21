import { getData } from '../../utils/database_driver'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // address: "",
    // number: "",
    // price: "",
    // shopName: "",
    // staffInfo: "",
    // staffName: "",
    // time: "",
    informations: [],
    loveSrc: "../../static/image/love.png",
    clickPassData: {
      index: -1,
      src: ""
    }
  },

  loveClick() {
    if(this.data.loveSrc === "../../static/image/love.png"){
      this.setData({
        loveSrc: "../../static/image/loved.png"
      })
    } else {
      this.setData({
        loveSrc: "../../static/image/love.png"
      })
    }
  },
  orderClick() {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let clickPassData = JSON.parse(decodeURIComponent(options.clickPassData))
    this.setData({
      clickPassData: clickPassData
    })
    // console.log(this.data.clickPassData)
    getData.getDataFromId('information').then(res => {
      // console.log(res.data.informations)
      this.setData({
        informations: res.data.informations
      })
      // console.log(this.data.informations)
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

  }
})