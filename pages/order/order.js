const dbutils = require('../../utils/database_driver')
const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []

for (let i = date.getFullYear() + 1; i >= date.getFullYear(); i--) {
  years.unshift(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i < 60; i++) {
  minutes.push(i)
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '>',
    phoneNumber: '',
    date: Date(),
    imageID: '',
    informations: {},
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth()+1,
    days,
    day: date.getDay()+1,
    hours,
    hour: date.getHours(),
    minutes,
    minute: date.getMinutes(),
    value: [0, date.getMonth(), date.getDay(), date.getHours(), date.getMinutes()],
    isDaytime: true,
    isShow: false
  },
  orderTime() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  cancel() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  ok() {
    this.setData({
      time: `${this.data.year}年 ${this.data.month}月 ${this.data.day}日 ${this.data.hour} : ${this.data.minute}`,
      date: new Date(this.data.year, this.data.month - 1, this.data.day, this.data.hour, this.data.minute),
      isShow: !this.data.isShow
    })
  },
  orderClick() {
    const phoneNumber = this.data.phoneNumber
    const date = this.data.date
    const duration = this.data.informations.serviceDuration
    const localDate = new Date()

    if (new Date(date).getTime() > new Date(localDate).getTime()) {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '无法预约过去的时间'
      })
      return
    }
    if (this.data.time === '>') {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '请选择时间'
      })
      return
    }
    const regu = /^1\d{10}$/;
    if (!regu.test(phoneNumber)) {
      let errorMessage = phoneNumber === '' ? '请填写手机号' : '手机号格式有误'
      wx.showModal({
        showCancel: false,
        title: '',
        content: errorMessage
      })
      return
    }
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
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
  },
  consolePhone: function (e) {
    console.log(this.data.phoneNumber);
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
  },
})