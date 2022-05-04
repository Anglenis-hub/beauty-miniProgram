const tableName = 'beautyTable'
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

//获取数据库数据
export const getData = {
  //通过id获得表信息
  getDataFromId(id) {
    return db.collection(tableName).doc(id).get()
  },
  //获取某数据库信息
  database() {
    return db.collection(tableName)
  }
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
    db.collection(userTable).doc(this.openid).update({
      data: {
        collections: collections
      },
      fail: function (res) {
        console.error(res)
      }
    })
  },
  signUp(name, avatarUrl) {
    return db.collection(userTable).add({
      data: {
        _id: this.openid,
        username: name,
        avatarUrl: avatarUrl,
        collections: []
      }
    })
  }
}

export const items = {
  getDataByID(id) {
    return db.collection(itemTable).doc(id).get()
  },
  getDataByType(type, key) {
    return db.collection(itemTable).where({
      type: type
    }).field({
      [key]: true
    }).get()
  },
  add(info) {
    let hash = getHash(JSON.stringify(info))
    db.collection(itemTable).add({
      data: {
        _id: hash,
        type: info.type,
        imageURL: info.imageURL,
        address: info.address,
        price: info.price,
        shopName: info.shopName,
        shopImageURL: info.shopImageURL,
        staffName: info.staffName,
        staffImageURL: info.staffImageURL,
        staffDescription: info.staffDescription,
        time: info.time,
        title: info.title
      },
      // 如果项目已存在，提示错误信息
      fail: function (res) {
        if (res.errMsg === '[FailedOperation.DuplicateWrite] multiple write,duplicate key error collection') {
          console.log("item already exists")
        }
      }
    })
  }
}