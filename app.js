// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-2ghfekqc5cf347a4"
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  }
})