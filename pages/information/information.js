const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    informations: {},
    heartIconIsLoved: false,
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
      this.setData({
        informations: res.data.informations,
        heartIconIsLoved: res.data.informations[clickPassType][clickPassIndex].love
      })
    })

    // dbutils.signIn("user001", 123)
    // console.log(dbutils.checkifUserExists('hi1'))
  },
  loveClick: function (e) {
    let index = this.data.clickPassIndex
    let type = this.data.clickPassType
    let loved = this.data.heartIconIsLoved

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
        for (let i = 0; i < usersInfo[index].collections.length; i++) {
          if (usersInfo[index].collections[i].itemId === index && usersInfo[index].collections[i].class === type) {
            usersInfo[index].collections.splice(i, 1);
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
    this.setData({
      heartIconIsLoved: !loved
    })
  },
  orderClick() {
    wx.navigateTo({
      url: '../order/order',
    })
  },
})