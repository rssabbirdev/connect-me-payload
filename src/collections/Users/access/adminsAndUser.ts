import { Access } from 'payload'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.find((role) => role === 'admin')) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}

export default adminsAndUser
