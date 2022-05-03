// pages/self/self.js
const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login(e) {
    wx.redirectTo({
      url: '../signup/signup',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用getUserInfo方法来获取当前用户的signature，用来检查是否已经登陆（当作session_key来使用）
    wx.getUserInfo({
      success: (res) => {
        let sessionKey = res.signature
        if (sessionKey === wx.getStorageSync('session_key')) {
          // 如果session未过期
        } else {
          // 如果session已过期，或不存在（首次登陆）
          // 调用云函数获得openid来判断用户是否存在于数据库（aka 用户是否注册）
          wx.cloud.callFunction({
            name: 'getWXContext',
            success: function (res) {
              let openid = res.result.openid
              if (dbutils.userIsSignedUp(openid)) {
                // 如果注册，更新session_key并转向主页
                console.log('session key:', sessionKey)
                wx.setStorage({
                  key: 'session_key',
                  data: session_key
                })
                wx.switchTab({
                  url: '../index/index'
                })
              } else {
                // 如果未注册，等待用户点击一键登录并注册，然后转向注册页面
              }
            },
            fail: console.error
          })
        }
      }
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