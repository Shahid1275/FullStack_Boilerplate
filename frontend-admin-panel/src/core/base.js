export class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || null
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  toJSON() {
    return { ...this }
  }
}

export class BaseService {
  constructor() {
    this.cache = new Map()
  }

  getCached(key) {
    return this.cache.get(key)
  }

  setCached(key, value) {
    this.cache.set(key, value)
  }
}

export default { BaseEntity, BaseService }
