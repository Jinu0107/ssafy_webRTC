export function setPlatform(state, isDesktop) {
  state.isDesktopPlatform = isDesktop
}

export function setMenuActive(state, index) {
  console.log('setMenuActive', state, index)
  const keys = Object.keys(state.menus)
  state.activeMenu = keys[index]
}

export function setMenuActiveMenuName(state, menuName) {
  state.activeMenu = menuName
}

export function setIsLoading(state, isLoading) {
  state.isLoading = isLoading
}

export function setIsLogin(state, isLogin) {
  state.isLogin = isLogin;
}
