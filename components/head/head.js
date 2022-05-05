const utils = require('../../utils/util')
const dbutils = require('../../utils/database_driver')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabButton: {
      type: Object,
      value: {}
    },
    page: {
      type: String,
      value: ''
    },
    num: {
      type: String,
      value: ''
    },
    imgs: {
      type: Object,
      value: {}
    },
    imgCounts: {
      type: Object,
      value: {}
    },
    inputvalue: {
      type: String,
      value: ''
    },
    collectNumInfo: {
      type: String,
      value: ''
    }
  },
  data: {
    clearShow: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      if (this.data.num !== e.currentTarget.id) {
        utils.scrollTop()
      }
      this.setData({
        num: e.currentTarget.id
      })
    },
    imgClick: function (e) {
      // console.log('e.currentTarget.dataset', e.currentTarget.dataset)
      const clickPassImageID = e.currentTarget.dataset.id
      wx.setStorageSync('clickPassImageID', clickPassImageID)
      wx.navigateTo({
        url: '../../pages/information/information',
        success: () => {
          wx.setNavigationBarTitle({
            title: '详细信息'
          })
        }
      })
    },
    bindInputData: function (e) {
      this.setData({
        inputvalue: e.detail.value
      });
    },
    clearClick() {
      this.setData({
        inputvalue: ''
      });
    }
  },
  observers: {
    'inputvalue': function (e) {
      // console.log(e)
      if (e) {
        this.setData({
          clearShow: true
        })
      } else {
        this.setData({
          clearShow: false
        })
      }
    },
    'imgCounts, num': function (imgCounts, num) {
      const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
      if (sessionIsExpired) {
        this.setData({
          collectNumInfo: '请登录后查看'
        })
      } else {
        this.setData({
          collectNumInfo: imgCounts[num] + '件'
        })
      }
    }
  }
})