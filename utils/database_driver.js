wx.cloud.init({
  env: 'cloud1-2ghfekqc5cf347a4'
})
const tableName = 'beautyTable'
const _db = wx.cloud.database()
const _ = _db.command
// let name = ''

export const db = {
    getNmaeFromId(id) {
        return _db.collection(tableName).doc(id).get()
    }
}