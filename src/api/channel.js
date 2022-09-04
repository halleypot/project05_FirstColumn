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

export function addChannel(data){
    return request( {
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data
    })
}

export function delChannel(targetId) {
    return request( {
        url: `/v1_0/user/channels/${targetId}`,
        method: "DELETE",

    })
}

