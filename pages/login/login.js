// pages/self/self.js
const dbutils = require('../../utils/database_driver')

const login = () => {
  // 更新session_key
  wx.getUserInfo({
    success: (res) => {
      let sessionKey = res.signature
      wx.setStorage({
        key: 'session_key',
        data: sessionKey
      })
    }
  })
  // 跳转到主页
  wx.switchTab({
    url: '../index/index'
  })
}

const checkSession = async () => {
  let sessionKey = await (await wx.getUserInfo()).signature
  if (sessionKey != wx.getStorageSync('session_key')) {
    console.log("user session has expired or not exsits")
    throw new Error('session has expired')
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onClickSignup(e) {
    // 提示用户授权获取昵称和头像url
    wx.getUserProfile({
      desc: '用于完善会员资料', // 获取信息的目的，必须要填写才能成功从微信获取
      success: (res) => {
        let avatarUrl = res.userInfo.avatarUrl
        let userName = res.userInfo.nickName
        // 注册用户
        dbutils.users.signUp(userName, avatarUrl).then(res2 => {
          // 注册成功后，login
          console.log("user login with signed up")
          login()
        }).catch(err => {
          // 注册失败
          if (err.errMsg === '[FailedOperation.DuplicateWrite] multiple write,duplicate key error collection') {
            // 如果用户已存在，login
            console.log("user login with existing info")
            login()
          } else {
            // 其他错误
            console.error(err)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    checkSession().then(res => {
      // 如果session未过期，login
      console.log("user login with session")
      login()
    }).catch(err => {
      if (err.message != 'session has expired') {
        console.error(err)
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