import { User } from "../models/UserModel"
import { UserMock } from "./mocks/userMock"

describe('Handling User', () => {
  test('UserModel', () => {
    const user = new User(UserMock)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('_json')
    expect(user.id).toBe('123')
  })
})