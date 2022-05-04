const dbutils = require('../../utils/database_driver')

const login = () => {
  // 更新session_key
  wx.getUserInfo({
    success: (res) => {
      console.log('login-res:', res);
      let sessionKey = res.signature
      wx.setStorageSync('session_key', sessionKey)
    }
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
      sessionIsExpired: true,
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
      userName: '立即登录'
    },
    onClickSignup(e) {
      // 提示用户授权获取昵称和头像url
      wx.getUserProfile({
        desc: '用于完善会员资料', // 获取信息的目的，必须要填写才能成功从微信获取
        success: (res) => {
          let avatarUrl = res.userInfo.avatarUrl
          let userName = res.userInfo.nickName
          wx.setStorageSync('avatarUrl', avatarUrl)
          wx.setStorageSync('userName', userName)
          this.setData({
            avatarUrl: avatarUrl,
            userName: userName,
            sessionIsExpired: false
          })
          let openid = wx.getStorageSync('openid')
          // 注册用户
          dbutils.users.signUp(userName, avatarUrl, openid).then(res2 => {
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
        this.setData({
          sessionIsExpired: false,
          avatarUrl: wx.getStorageSync('avatarUrl'),
          userName: wx.getStorageSync('userName')
        })
      }).catch(err => {
        if (err.message !== 'session has expired') {
          console.error(err)
        } else {
          this.setData({
            // sessionIsExpired: true
          })
        }
      })
    },
})