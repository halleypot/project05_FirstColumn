import request from "@/utils/request";

export function searchSuggestion(params) {
    return request( {
        url: '/v1_0/suggestion',
        params
    })
}