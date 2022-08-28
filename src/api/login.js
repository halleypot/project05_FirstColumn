import request from '@/utils/request'

export const login = (data) => {
    return request( {
        method: 'POST',
        url: '/v1_0/authorizations',
        headers: {"Content-Type": "application/json"},
        data
    })
}

export const editProfile = (data) => {
    return request( {
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}

export const uploadImg = (data) => {
    return request( {
        url: '/v1_0/user/photo',
        method: 'PATCH',
        data
    })
}