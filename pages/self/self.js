const dbutils = require('../../utils/database_driver')
const defaultAvatarUrl = "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"

const login = (page) => {
  // 更新session_key
  wx.getUserInfo({
    success: (res) => {
      let sessionKey = res.signature
      wx.setStorageSync('session_key', sessionKey)
      wx.setStorageSync('sessionIsExpired', false)
    },
    fail: (err) => {
      wx.showModal({
        showCancel: false,
        title: '获取用户信息失败',
        content: err.errMsg
      })
    }
  })
  page.setData({
    avatarUrl: wx.getStorageSync('avatarUrl'),
    userName: wx.getStorageSync('userName'),
    isLogin: false
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    userName: '',
    isLogin: true
  },
  onClickSignup(e) {
    // const items = dbutils.getRandomItem()
    // items.forEach(item => {
    //   dbutils.items.add(item)
    // })
    // return
    const thisPage = this
    // 提示用户授权获取昵称和头像url
    wx.getUserProfile({
      desc: '用于完善会员资料', // 获取信息的目的，必须要填写才能成功从微信获取
      success: (res) => {
        const avatarUrl = res.userInfo.avatarUrl
        const userName = res.userInfo.nickName
        wx.setStorageSync('avatarUrl', avatarUrl)
        wx.setStorageSync('userName', userName)
        // 注册用户
        dbutils.users.signUp(userName, avatarUrl).then(() => {
          // 注册成功后，login
          console.log("user login with signed up")
          login(thisPage)
        }).catch(err => {
          // 注册失败
          if (err.errMsg === '[FailedOperation.DuplicateWrite] multiple write,duplicate key error collection') {
            // 如果用户已存在，login
            console.log("user login with existing info")
            login(thisPage)
          } else {
            // 其他错误
            wx.showModal({
              showCancel: false,
              title: '注册失败',
              content: err.errMsg
            })
          }
        })
      },
      fail: (err) => {
        wx.showModal({
          showCancel: false,
          title: '获取用户信息失败',
          content: err.errMsg
        })
      }
    })
  },
  myAppointment() {
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired) {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '请登录后查看'
      })
      return
    }
    wx.navigateTo({
      url: '../myAppointment/myAppointment',
    })
  },
  logoutClick() {
    this.setData({
      avatarUrl: defaultAvatarUrl,
      userName: '立即登录',
      isLogin: true
    })
    wx.clearStorage()
    wx.setStorageSync('sessionIsExpired', true)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    const thisPage = this

    // 如果session未过期，login
    if (!sessionIsExpired) {
      console.log('user login with session')
      login(thisPage)
    }
  },
  onShow: function (options) {
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired === true || sessionIsExpired === '') {
      this.setData({
        avatarUrl: defaultAvatarUrl,
        userName: '立即登录'
      })
    }
  }
})