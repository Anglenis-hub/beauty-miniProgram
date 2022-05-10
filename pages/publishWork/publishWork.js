const dbutils = require('../../utils/database_driver')
const uploadImg = (page, photo, cloudPath) => {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('res',res);
      const tempFilePaths = res.tempFilePaths[0];
      page.setData({
        [photo]: tempFilePaths
      })
      console.log('tempFilePaths', tempFilePaths);
      console.log('cloudPath', cloudPath);
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: res.tempFilePaths[0],
        success: res => {
          // get resource ID
          page.setData({
            [photo]: 'cloud://cloud1-2ghfekqc5cf347a4.636c-cloud1-2ghfekqc5cf347a4-1309526496/' + cloudPath
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  })
}

Page({
  data: {
    type: 'hair',
    workPhoto: '',
    shopPhoto: '',
    staffPhoto: '',
    titltValue: '',
    shopnameValue: '',
    addressValue: '',
    expenseValue: '',
    timeValue: '',
    staffnameValue: '',
    describeValue: '',
    radioItems: [
      { name: 'hair', value: '美发', checked: 'true' },
      { name: 'makeup', value: '彩妆' },
      { name: 'nail', value: '美甲' }
    ],
  },
  onShow() {

  },
  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData({
      type: checked
    })
  },
  uploadWorkImg() {
    let cloudPath = 'images/' + 'workPhoto' + wx.getStorageSync('openid') + Date.now() + '.jpg'
    uploadImg(this, 'workPhoto', cloudPath)
  },
  uploadShopImg() {
    let cloudPath = 'images/' + 'shopPhoto' + wx.getStorageSync('openid') + Date.now() + '.jpg'
    uploadImg(this, 'shopPhoto', cloudPath)
  },
  uploadStaffImg() {
    let cloudPath = 'images/' + 'staffPhoto' + wx.getStorageSync('openid') + Date.now() + '.jpg'
    uploadImg(this, 'staffPhoto', cloudPath)
  },
  bindTitlteValue: function (e) {
    this.setData({
      titltValue: e.detail.value
    })
    // console.log(this.data.titltValue);
  },
  bindShopnameValue: function (e) {
    this.setData({
      shopnameValue: e.detail.value
    })
  },
  bindAddressValue: function (e) {
    this.setData({
      addressValue: e.detail.value
    })
  },
  bindExpenseValue: function (e) {
    this.setData({
      expenseValue: e.detail.value
    })
  },
  bindTimeValue: function (e) {
    this.setData({
      timeValue: e.detail.value
    })
  },
  bindStaffnameValue: function (e) {
    this.setData({
      staffnameValue: e.detail.value
    })
  },
  bindDescribeValue: function (e) {
    this.setData({
      describeValue: e.detail.value
    })
  },

  publishClick() {
    if (this.data.shopnameValue==='' || this.data.describeValue==='' || this.data.staffPhoto==='' || this.data.addressValue==='' || this.data.shopPhoto==='' || this.data.staffnameValue==='' || this.data.timeValue==='' || this.data.titltValue==='' || this.data.workPhoto==='' || this.data.expenseValue==='') {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '请填写完整信息'
      })
      return
    }
    let item = {
      "shopName": this.data.shopnameValue,
      "staffDescription": this.data.describeValue,
      "staffImageURL": this.data.staffPhoto,
      "address": this.data.addressValue,
      "shopImageURL": this.data.shopPhoto,
      "staffName": this.data.staffnameValue,
      "time": this.data.timeValue,
      "serviceDuration": 180,
      "title": this.data.titltValue,
      "type": this.data.type,
      "imageURL": this.data.workPhoto,
      "price": this.data.expenseValue
    }
    dbutils.items.add(item).then(() => {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '发布成功',
        success(res) {
          wx.redirectTo({
            url: '../collect/collect',
          })
        }
      })
    })
  },
})

// 春日清透妆容
// beauty美妆店
// 杭州市下沙街道22-1
// 200
// 工作日8:00-20:00
// 张宏
// 曾为多位明星设计妆容。
