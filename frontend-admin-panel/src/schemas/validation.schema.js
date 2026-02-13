export const emailSchema = {
  type: 'string',
  format: 'email',
  required: true,
}

export const passwordSchema = {
  type: 'string',
  minLength: 6,
  required: true,
}

export const userSchema = {
  name: { type: 'string', minLength: 2, required: true },
  email: emailSchema,
  password: passwordSchema,
}

export default { emailSchema, passwordSchema, userSchema }
