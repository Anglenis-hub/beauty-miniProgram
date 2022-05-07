const dbutils = require('../../utils/database_driver')

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${year}.${month + 1}.${day} ${hour}:${minute}`
}

const getInformationsByAppointments = async (appointments) => {
  let pageInfos = []
  await Promise.all(appointments.map(async (appointment) => {
    const item = await dbutils.items.getDataByID(appointment.itemID).then(res => res.data)
    const info = {
      information: item,
      appointment: appointment,
      formattedDate: formatDate(appointment.date)
    }
    pageInfos.push(info)
  }))
  return pageInfos
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    appointments: {},
    pageInfos: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  cancel(e) {
    const thisPage = this
    wx.showModal({
      title: '',
      content: '确认取消吗？',
      success(res) {
        if (res.confirm) {
          console.log(e.currentTarget.dataset.id)
          const appointmentID = e.currentTarget.dataset.id
          let userAppointments = thisPage.data.appointments
          userAppointments = userAppointments.filter(item => item.id !== appointmentID)
          dbutils.users.updateAppointments(userAppointments)
          wx.redirectTo({
            url: './myAppointment',
          })
        }
      }
    })

  },

  onShow: function () {
    console.log('onShow')
    const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
    if (sessionIsExpired) {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '请登录后查看'
      })
      return
    }
    dbutils.users.getAppointments().then(res => {
      const appointments = res.data.appointments
      this.setData({
        appointments: appointments
      })
      getInformationsByAppointments(appointments).then(pageInfos => {
        this.setData({
          pageInfos: pageInfos
        })
      })
    })
  }
})