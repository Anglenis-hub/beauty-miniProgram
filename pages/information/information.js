const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    informations: {},
    loveSrc: "../../static/image/love.png",
    loveImg: "../../static/image/love.png",
    clickPassIndex: -1,
    clickPassType: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let clickPassIndex = wx.getStorageSync('clickPassIndex')
    let clickPassType = wx.getStorageSync('clickPassType')
    this.setData({
      clickPassIndex: clickPassIndex,
      clickPassType: clickPassType
    })
    dbutils.getData.getDataFromId('information').then(res => {
      let temp = this.data.informations
      temp.hair = res.data.informations.hair
      temp.makeup = res.data.informations[clickPassType]
      temp.nail = res.data.informations.nail
      this.setData({
        informations: temp
      })
    })
  },
  loveClick: function (e) {
    let index = this.data.clickPassIndex
    let type = this.data.clickPassType
    let informations = this.data.informations
    let loved = informations[type][index].love

    // 更新用户数据库
    dbutils.getData.getDataFromId('userInfo').then(res => {
      let usersInfo = res.data.users
      let inserData = {
        class: type,
        itemId: index,
        isDeleted: !loved
      }
      for (let i = 0; i < usersInfo.length; i++) {
        if (usersInfo[i].username === 'userA') {
          this.setData({
            index: i
          })
        }
      }
      if (loved) {
        for (let j = 0; j < usersInfo[index].collections.length; j++) {
          if (usersInfo[index].collections[j].itemId === index && usersInfo[index].collections[j].class === type) {
            usersInfo[index].collections.splice(j, 1);
          }
        }
        dbutils.update('userInfo', `users.${index}.collections`, usersInfo[index].collections) //取消收藏：将此图片及其信息在userInfo表中对应用户的collections对象中删除
      } else {
        dbutils.insert('userInfo', `users.${index}.collections`, inserData) //将此图片及其信息插入userInfo表中对应用户的collections对象中
      }
    })

    // 更新information数据库
    dbutils.update('information', `informations.${type}.${index}.love`, !loved)

    // 反转按钮状态
    informations[type][index].love = !loved
    this.setData({
      informations: informations
    })
  },
  orderClick() {
    wx.navigateTo({
      url: '../order/order',
    })
  },
})