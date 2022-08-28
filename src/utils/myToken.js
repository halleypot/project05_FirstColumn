

// 储存token
export function setToken(myToken) {
    localStorage.setItem('myToken', JSON.stringify(myToken))
}

// 获取token
export function getToken() {
    return JSON.parse(localStorage.getItem('myToken'))
}

// 删除token
export function delToken() {
    localStorage.removeItem('myToken')
}