// app.js

const checkSession = async () => {
  let sessionKey = await (await wx.getUserInfo()).signature
  if (sessionKey != wx.getStorageSync('session_key')) {
    console.log("user session has expired or not exsits")
    throw new Error('session has expired')
  }
}

App({
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-2ghfekqc5cf347a4"
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 保存用户openid
    wx.cloud.callFunction({
      name: 'getWXContext',
      success: function (res) {
        wx.setStorage({
          key: 'openid',
          data: res.result.openid
        })
      },
      fail: console.error
    })

    // 检查session是否过期
    checkSession().then(() => {
      // 如果session未过期
      wx.setStorageSync('sessionIsExpired', false)
    }).catch(err => {
      // 如果session已过期
      if (err.message === 'session has expired') {
        wx.setStorageSync('sessionIsExpired', true)
      } else {
        console.error(err)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})