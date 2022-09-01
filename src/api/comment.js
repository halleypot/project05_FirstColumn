import request from '@/utils/request'

// @parmas, type, source, offset
export function getComment(params) {
    return request( {
        url: '/v1_0/comments',
        params

    })
}
// @data, target, content, art_id
export function setComment(data) {
    return request( {
        url: '/v1_0/comments',
        method: 'POST',
        data
    })
}