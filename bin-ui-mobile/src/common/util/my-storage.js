/**
 * 本地存储实现,封装localStorage和sessionStorage
 */
/**
 * use
 * const SOME_KEY = '__some__';
 * const SOME_MAX_LENGTH = 15;
 * export function saveSome (query) {
 *   let some = storage.get(SOME_KEY, []);
 *   insertArray(some, query, (item) => {
 *     //判断条件
 *   }, SOME_MAX_LENGTH);
 *   storage.set(SOME_KEY, some);
 *   return some;
 * }
 * export function deleteSome (query) {
 *   let some = storage.get(SOME_KEY, []);
 *   deleteFromArray(some, (item) => {
 *     return item === query;
 *   });
 *   storage.set(SOME_KEY, some);
 *   return some;
 * }
 */
let store = {
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
}

const api = {
  set (key, val) {
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
    return val
  },

  get (key, def) {
    if (this.disabled) {
      return def
    }
    let val = deserialize(this.storage.getItem(key))
    return (val === undefined ? def : val)
  },

  has (key) {
    return this.get(key) !== undefined
  },

  remove (key) {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  },

  clear () {
    if (this.disabled) {
      return
    }
    this.storage.clear()
  },

  getAll () {
    if (this.disabled) {
      return null
    }
    let ret = {}
    this.forEach((key, val) => {
      ret[key] = val
    })
    return ret
  },

  forEach (callback) {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i)
      callback(key, this.get(key))
    }
  }
}

Object.assign(store, api)

Object.assign(store.session, api)

function serialize (val) {
  return JSON.stringify(val)
}

function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

try {
  const testKey = '__storejs__'
  store.set(testKey, testKey)
  if (store.get(testKey) !== testKey) {
    store.disabled = true
  }
  store.remove(testKey)
} catch (e) {
  store.disabled = true
}

export default store
