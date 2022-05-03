const tableName = 'beautyTable'
const userTable = 'users'
const itemTable = 'items'
const db = wx.cloud.database()
const _ = db.command
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

export const userIsSignedUp = (openid) => {
  console.log("userIsSignedUp openid:", openid)
  return false
}

export const getUserInfo = () => {
  console.log(wx.cloud.getWXContext())
}

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

//注册用户
export const signIn = (name, pwd, phoneNum) => {
  let hash = getHash(name)
  db.collection(userTable).add({
    data: {
      _id: hash,
      username: name,
      password: pwd,
      phoneNumber: phoneNum,
      collections: {}
    },
    sucess: function (res) {
      console.log(res.data)
    },
    // 如果用户名已存在，提示错误信息
    fail: function (res) {
      if (res.errMsg === '[FailedOperation.DuplicateWrite] multiple write,duplicate key error collection') {
        console.log("username already exists")
      }
    }
  })
}

export const insertItem = (info) => {
  let hash = getHash(info.shopName + info.title + info.staffName)
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
      staffImage: info.staffImage,
      staffInfo: info.staffInfo,
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

//向数组插入数据
export const insert = (id, arr, insertData) => {
  db.collection(tableName).doc(id).update({
    data: {
      [arr]: _.push(insertData)
    },
    sucess: function (res) {
      console.log(res.data)
    }
  })
}
//更新数据
export const update = (id, key, updateData) => {
  db.collection(tableName).doc(id).update({
    data: {
      [key]: updateData
    },
    sucess: function (res) {
      console.log(res.data)
    }
  })
}