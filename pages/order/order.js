const dbutils = require('../../utils/database_driver')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    date: Date,
    imageID: '',
    informations: {},
  },

  orderClick() {
    const phoneNumber = '13112345678'
    const date = new Date('December 17, 2022 10:30:00')
    const duration = this.data.informations.serviceDuration
    dbutils.users.pushAppointment({
      itemID: this.data.imageID,
      phoneNumber: phoneNumber,
      date: date,
      serviceDuration: duration
    }).then(() => {
      // 成功更新数据库，切换到预约成功页面
      wx.setStorageSync('clickPassAppointmentPhoneNumber', phoneNumber)
      wx.setStorageSync('clickPassAppointmentDate', date)
      wx.setStorageSync('clickPassServiceDuration', duration)
      wx.navigateTo({
        url: '../orderResult/orderResult'
      })
    }).catch(err => {
      // 预约失败，提示用户
      let errorMessage = ''
      if (err.message === 'appointment already exist') {
        errorMessage = '您已预约'
      } else {
        console.error(err)
        errorMessage = '未知错误'
      }
      wx.showModal({
        showCancel: false,
        title: '预约失败',
        content: errorMessage
      })
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