const userTable = 'users'
const itemTable = 'items'
const db = wx.cloud.database()
const _ = db.command

const getHash = (str) => {
  let h1 = 0xdeadbeef ^ 0,
    h2 = 0x41c6ce57 ^ 0;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

export const users = {
  openid: wx.getStorageSync('openid'),
  getData() {
    return db.collection(userTable).doc(this.openid).get()
  },
  getCollections() {
    return db.collection(userTable).doc(this.openid).field({
      collections: true
    }).get()
  },
  updateCollections(collections) {
    return db.collection(userTable).doc(this.openid).update({
      data: {
        collections: collections
      }
    })
  },
  getAppointments() {
    return db.collection(userTable).doc(this.openid).field({
      appointments: true
    }).get()
  },
  async pushAppointment(appointment) {
    const hash = getHash(JSON.stringify(appointment))
    appointment['id'] = hash
    const appointments = await this.getAppointments().then(res => res.data.appointments)
    const found = appointments.some(e => e.id === hash)
    if (found) {
      throw new Error('appointment already exist')
    }
    return db.collection(userTable).doc(this.openid).update({
      data: {
        appointments: _.push(appointment)
      }
    })
  },
  updateAppointments(appointments) {
    return db.collection(userTable).doc(this.openid).update({
      data: {
        appointments: appointments
      }
    })
  },
  signUp(name, avatarUrl) {
    return db.collection(userTable).add({
      data: {
        _id: this.openid,
        username: name,
        avatarUrl: avatarUrl,
        collections: [],
        appointments: []
      }
    })
  }
}

export const items = {
  getDataByID(id) {
    return db.collection(itemTable).doc(id).get()
  },
  getDataMatchedIDsAndKeys(ids, ...args) {
    let keys = {}
    args.forEach(key => keys[key] = true)
    return db.collection(itemTable).where({
      _id: _.in(ids)
    }).field(keys).get()
  },
  getDataByType(type, key) {
    return db.collection(itemTable).where({
      type: type
    }).field({
      [key]: true
    }).get()
  },
  add(item) {
    const hash = getHash(JSON.stringify(item))
    item['_id'] = hash
    db.collection(itemTable).add({
      data: item,
      // 如果项目已存在，提示错误信息
      fail: function (res) {
        if (res.errMsg === '[FailedOperation.DuplicateWrite] multiple write,duplicate key error collection') {
          console.log("item already exists")
        }
      }
    })
  }
}

export const getRandomItem = () => {
  // 获得一个能被dividedBy整除的在min到max范围的整数，比如
  // randomIntFromInterval(1, 10) > 1到10的随机数
  // randomIntFromInterval(1, 100, 5) > 1到100能被5整除的随机数
  const randomIntFromInterval = (min, max, dividedBy = 1) => {
    return Math.floor(Math.random() * (max - min + 1) / dividedBy + min / dividedBy) * dividedBy
  }
  const randomElementFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }
  const shopNames = ["3A美容店", "艺剪坊", "绝色发艺", "秀艳阁", "颠峰之秀", "东尼", "引领潮流", "得艺忘型"]
  const staffDescription = ["从事美容行业近8年时间，全面的技术经验，95%以上顾客满意率"]
  const addresses = ["陕西省琴市大东辽阳路Q座", "四川省楠市秀英林路F座", "重庆市颖市锡山宁德街o座", "广西壮族自治区红梅市南溪邓路M座", "江西省上海市永川邱路H座", "河南省凤兰县城北陈路l座", "江西省沈阳县蓟州成都路U座", "辽宁省慧市黄浦翟路E座"]
  const staffName = {
    male: ['国安康', '厍华茂', '巢子昂', '茹玉成', '董康安'],
    female: ['程欣跃', '冷迎蓉', '宫望舒', '闻诗霜', '沈欣嘉']
  }
  const titles = ['可爱甜美', '清新自然', '清歌缈缦', '青树翠蔓', '夏花冬雪', '暗似黛绿', '心岛初晴', '时尚大方']

  const cloudURL = 'cloud://cloud1-2ghfekqc5cf347a4.636c-cloud1-2ghfekqc5cf347a4-1309526496/images/'

  const sex = ['male', 'female']
  const types = ['hair', 'makeup', 'nail']
  const titleSuffix = {
    hair: '风格发型',
    makeup: '风美妆',
    nail: '风美甲'
  }
  // 在云存储中总共的各种类型的图片数量
  const totalImageNumber = {
    male: 4,
    female: 4,
    shop: 5,
    hair: 7,
    makeup: 7,
    nail: 7
  }

  let data = []

  types.forEach(type => {
    for (let i = 1; i <= totalImageNumber[type]; i++) {
      const randomSex = randomElementFromArray(sex)
      const randomStaffName = randomElementFromArray(staffName[randomSex])
      const randomStaffImageURL = cloudURL + 'staff-' + randomSex + randomIntFromInterval(1, totalImageNumber[randomSex]) + '.jpg'
      const imageURL = cloudURL + type + i + '.jpg'
      const randomShopImage = cloudURL + 'shopImage' + randomIntFromInterval(1, totalImageNumber['shop']) + '.jpg'

      data.push({
        "shopName": shopNames[Math.floor(Math.random() * shopNames.length)],
        "staffDescription": staffDescription,
        "staffImageURL": randomStaffImageURL,
        "address": addresses[Math.floor(Math.random() * addresses.length)],
        "shopImageURL": randomShopImage,
        "staffName": randomStaffName,
        "time": "周一~周日10：00-22：00",
        "serviceDuration": randomIntFromInterval(50, 180, 5),
        "title": randomElementFromArray(titles) + titleSuffix[type],
        "type": type,
        "imageURL": imageURL,
        "price": randomIntFromInterval(20, 200)
      })
    }
  })

  return data
}