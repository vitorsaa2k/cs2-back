interface User {
  name: string
  age: number
}

function sendUser(user: User) {
  console.log(user)
}

sendUser({
  name: 'save',
  age: 20,
})