
const MY_CHANNEL = "myChannel"

export function setChannel(myChannel) {
    localStorage.setItem(MY_CHANNEL, JSON.stringify(myChannel))
}

export function getChannel() {
    return JSON.parse(localStorage.getItem(MY_CHANNEL))
}

export function delChannel() {
    localStorage.removeItem(MY_CHANNEL)
}