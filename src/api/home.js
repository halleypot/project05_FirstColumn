import request from "@/utils/request";

export function getAllChannels() {
    return request( {
        url: '/v1_0/channels'
    })
}

// params: channel_id , timestamp
export function getArticles(params) {
    return request( {
        url: '/v1_0/articles',
        params
    })
}

export function getArticleDetail(art_id){
    return request( {
        url:`/v1_0/articles/${art_id}`
    })
}