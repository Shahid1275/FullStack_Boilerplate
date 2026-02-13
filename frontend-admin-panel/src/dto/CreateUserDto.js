export class CreateUserDto {
  constructor(data) {
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.role = data.role || 'user'
  }

  validate() {
    const errors = []
    if (!this.name || this.name.length < 2) {
      errors.push('Name must be at least 2 characters')
    }
    if (!this.email || !this.email.includes('@')) {
      errors.push('Valid email is required')
    }
    if (!this.password || this.password.length < 6) {
      errors.push('Password must be at least 6 characters')
    }
    return errors
  }
}

export default CreateUserDto
