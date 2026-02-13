import { BaseEntity } from '../core/base'

export class User extends BaseEntity {
  constructor(data) {
    super(data)
    this.name = data.name || ''
    this.email = data.email || ''
    this.role = data.role || 'user'
    this.isActive = data.isActive !== undefined ? data.isActive : true
  }

  activate() {
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  hasPermission(permission) {
    // Permission logic here
    return true
  }
}

export default User
