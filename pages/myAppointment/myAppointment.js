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
    pageInfos: [],
    isNull: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  cancel(e) {
    const index = e.currentTarget.dataset.index
    const pageInfos = this.data.pageInfos
    const thisPage = this
    wx.showModal({
      title: '',
      content: '确认取消吗？',
      success(res) {
        if (res.confirm) {
          const appointmentID = pageInfos[index].appointment.id
          let userAppointments = thisPage.data.appointments
          userAppointments = userAppointments.filter(item => item.id !== appointmentID)
          dbutils.users.updateAppointments(userAppointments).catch(err => {
            wx.showModal({
              showCancel: false,
              title: '',
              content: '预约取消失败'
            })
            thisPage.onShow()
          })
          pageInfos.splice(index, 1)
          thisPage.setData({
            pageInfos: pageInfos,
            appointments: userAppointments,
            isNull: pageInfos.length === 0
          })
        }
      }
    })

  },

  onShow: function () {
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
      if (appointments.length === 0) {
        this.setData({
          isNull: true
        })
      }
      getInformationsByAppointments(appointments).then(pageInfos => {
        this.setData({
          pageInfos: pageInfos
        })
      })
    })
  }
})