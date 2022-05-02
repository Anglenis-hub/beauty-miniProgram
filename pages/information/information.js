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
  loveClick: function(e) {
    let clickPassIndex = this.data.clickPassIndex
    let clickPassType = this.data.clickPassType
    if(this.data.informations[clickPassType][clickPassIndex].love === false) {
      dbutils.getData.getDataFromId('userInfo').then(res => {
        let temp = res.data.users
        let inserData = { class: clickPassType, itemId: clickPassIndex, isDeleted: false }
        for(let i = 0; i<temp.length; i++) {
          if(temp[i].username === 'userA') {
            this.setData({
              index: i
            })
          }
        }
        dbutils.insert('userInfo', `users.${this.data.index}.collections`, inserData) //将此图片及其信息插入userInfo表中对应用户的collections对象中
      }) 
      dbutils.update('information', `informations.${clickPassType}.${clickPassIndex}.love`, true)//将爱心状态改为收藏实心
    } else {
      dbutils.getData.getDataFromId('userInfo').then(res => {
        let temp = res.data.users
        console.log('temp', temp)
        for(let i = 0; i<temp.length; i++) {
          if(temp[i].username === 'userA') {
            this.setData({
              index: i
            })
          }
        }
        for (let j = 0; j < temp[this.data.index].collections.length; j++) {
          if (temp[this.data.index].collections[j].itemId === clickPassIndex && temp[this.data.index].collections[j].class === clickPassType) {
            temp[this.data.index].collections.splice(j, 1);
          }
        }  
        dbutils.update('userInfo', `users.${this.data.index}.collections`, temp[this.data.index].collections)//取消收藏：将此图片及其信息在userInfo表中对应用户的collections对象中删除
      }) 
      dbutils.update('information', `informations.${clickPassType}.${clickPassIndex}.love`, false)//将爱心状态改为空心
    }
    wx.redirectTo({
      url: '../information/information',
    })
  },
  orderClick() {
    wx.navigateTo({
      url: '../order/order',
    })
  },
})