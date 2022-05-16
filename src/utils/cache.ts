class localCache {
  getItem(key: string) {
    const value = window.localStorage.getItem(key)
    // localStorage 中的value为JSON格式，需要做变换
    if (value) {
      return JSON.parse(value)
      // return value
    }
  }
  setItem(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  clear() {
    window.localStorage.clear()
  }
}

export default new localCache()
