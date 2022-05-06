const dbutils = require('../../utils/database_driver')
const formatedDate = (date, durationInMinutes) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const startHour = date.getHours()
  const startMinute = date.getMinutes()
  date.setMinutes(startMinute + durationInMinutes)
  const endHour = date.getHours()
  const endMinute = date.getMinutes()
  return `${year}.${month}.${day} ${startHour}:${startMinute}-${endHour}:${endMinute}`
}

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

  backToHomeClick() {
    wx.reLaunch({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const date = wx.getStorageSync('clickPassAppointmentDate')
    const duration = wx.getStorageSync('clickPassServiceDuration')
    const imageID = wx.getStorageSync('clickPassImageID')
    dbutils.items.getDataByID(imageID).then(res => {
      this.setData({
        imageID: imageID,
        informations: res.data,
        phoneNumber:  wx.getStorageSync('clickPassAppointmentPhoneNumber'),
        date: formatedDate(date, duration)
      })
    })

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