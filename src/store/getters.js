const getters = {
  token: (state) => state.user.token,
  role: (state) => state.user.role,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  money: (state) => state.user.money,
  user: (state) => state.user.user
}
export default getters
