import request from "@/utils/request";

export function getUserChannel() {
    return request( {
        url: '/v1_0/user/channels',
        
    })
}

export function getChannels() {
    return request( {
        url: '/v1_0/channels'
    })
}

export function delChannel(target) {
    return request( {
        url: `/v1_0/user/channels/${target}`,
        method: 'DELETE',

    })
}

