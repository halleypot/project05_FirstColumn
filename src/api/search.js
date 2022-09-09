import request from "@/utils/request";

export function searchSuggestion(params) {
    return request( {
        url: '/v1_0/suggestion',
        params
    })
}

export function search(params) {
    return request( {
        url: '/v1_0/search',
        params,
    })
}