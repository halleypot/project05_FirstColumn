

// 储存token
export function setToken(myToken) {
    window.localStorage.setItem('myToken', JSON.stringify(myToken))
}

// 获取token
export function getToken() {
    return JSON.parse(window.localStorage.getItem('myToken'))
}

// 删除token
export function delToken() {
    windown.localStorage.removeItem('myToken')
}