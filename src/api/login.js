import request from '@/utils/request'

export const login = (data) => {
    return request( {
        method: 'POST',
        url: '/v1_0/authorizations',
        headers: {"Content-Type": "application/json"},
        data
    })
}