export class UserTransformer {
  static toPublic(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }

  static toMinimal(user) {
    return {
      id: user.id,
      name: user.name,
    }
  }
}

export default UserTransformer
