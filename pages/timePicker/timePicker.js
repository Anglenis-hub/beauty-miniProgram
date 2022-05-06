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
  // onShareAppMessage() {
  //   return {
  //     title: 'picker-view',
  //     path: 'page/component/pages/picker-view/picker-view'
  //   }
  // },

  data: {
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth(),
    days,
    day: date.getDay(),
    hours,
    hour: date.getHours(),
    minutes,
    minute: date.getMinutes(),
    value: [0, date.getMonth()-1, date.getDay()-1, date.getHours(), date.getMinutes()],
    isDaytime: true,
  },

  bindChange(e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
  }
})