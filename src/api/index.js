import {login, editProfile, uploadImg} from './login.js'
import {userInfo} from './user'
import {getAllChannels, getArticles, getArticleDetail} from './home'
import {getComment, setComment} from './comment'
import {getUserChannel, getChannels, addChannel, delChannel} from './channel'
import {searchSuggestion , search} from './search'

export const loginAPI = login
export const userInfoAPI = userInfo
export const editProfileAPI = editProfile
export const uploadImgAPI = uploadImg
export const getAllChannelsAPI = getAllChannels
export const getArticlesAPI = getArticles
export const getArticleDetailAPI = getArticleDetail
export const getCommentAPI = getComment
export const setCommentAPI = setComment
export const getUserChannelAPI = getUserChannel
export const getChannelsAPI = getChannels
export const addChannelAPI = addChannel
export const delChannelAPI = delChannel
export const searchSuggestionAPI = searchSuggestion
export const searchAPI = search

