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

    // 保存用户openid
    wx.cloud.callFunction({
      name: 'getWXContext',
      success: function (res) {
        // console.log(res.result)
        wx.setStorage({
          key: 'openid',
          data: res.result.openid
        })
      },
      fail: function (err) {
        console.log(err)
      }
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
        wx.showModal({
          showCancel: false,
          title: '获取用户信息失败',
          content: err.errMsg
        })
      }
    })

    //判断是否为商家用户
    const isShop = wx.getStorageSync('isShop')
    if (isShop) {
      wx.setTabBarItem({
        index: 1,
        text: '作品集',
        iconPath: '/static/image/works.png',
        selectedIconPath: '/static/image/worksFill.png'
      })
    } else {
      wx.setTabBarItem({
        index: 1,
        text: '收藏',
        iconPath: "static/image/collect.png",
        selectedIconPath: "static/image/collectFill1.png"
      })
    }
  },
  globalData: {
    userInfo: null
  }
})