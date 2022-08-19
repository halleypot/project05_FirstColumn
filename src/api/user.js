import request from "@/utils/request";

export const userInfo = () => {
    return request({
        url: '/v1_0/user/profile',
    })
}