import { getData } from '../../utils/database_driver'
const utils = require('../../utils/util')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabButton:{
      type: Object,
      value: {}
    },
    num: {
      type: String,
      value: ''
    },
    hairImgs: {
      type: Array,
      value: []
    },
    makeupImgs: {
      type: Array,
      value: []
    },
    nailImgs: {
      type: Array,
      value: []
    },
    inputvalue: {
      type: String,
      value: ''
    }
  },
  data: {
    clearShow: false,
    clickPassIndex: -1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hairClick() {
      if(this.data.num !== 'hair') {
        utils.scrollTop()
      }
      this.setData({
        num: "hair"
      })
    },
    makeupClick() {
      if(this.data.num !== 'makeup') {
        utils.scrollTop()
      }
      this.setData({
        num: "makeup"
      })
    },
    nailClick() {
      if(this.data.num !== 'nail') {
        utils.scrollTop()
      }
      this.setData({
        num: "nail"
      })
    },
    hairImgClick: function(e) {
      console.log('e.currentTarget.dataset',e.currentTarget.dataset.index)
      let clickPassIndex = e.currentTarget.dataset.index
      wx.setStorageSync('clickPassIndex', clickPassIndex)
      // console.log('clickPassIndex:',clickPassIndex)
      wx.navigateTo({
        url: '../../pages/information/information',
        success:()=>{
          wx.setNavigationBarTitle({
            title: '详细信息'
          })
        }
      })
    },
    bindInputData: function(e){
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
  observers:{
    'inputvalue': function(e) {
      // console.log(e)
      if(e) {
        this.setData ({
          clearShow: true
        })
      } else {
        this.setData ({
          clearShow: false
        })
      }
    },
    'num': function (e) {
      // console.log(e)
    }
  }
})