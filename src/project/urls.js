const HOSTNAME = 'http://127.0.0.1:8000/api/'
// const HOSTNAME = 'http://ec2-16-16-198-188.eu-north-1.compute.amazonaws.com/api/'

export const LOGIN = `${HOSTNAME}token/`
export const SINGUP = `${HOSTNAME}auth/signup/`
export const UPDATE_USER= `${HOSTNAME}auth/update_user/`
export const ME = `${HOSTNAME}auth/me/`
export const REFRESH = `${HOSTNAME}auth/token/refresh/`
export const GET_USER = `${HOSTNAME}auth/users/`
export const CHECK_EMAIL_UNIQUE_URL=`${HOSTNAME}auth/check-email-unique/`

export const RIDE =`${HOSTNAME}ride/`
export const SEND_FRIEND_REQUEST = `${HOSTNAME}friends/request/`
export const FRIEND_REQUESTS = `${HOSTNAME}friends/request_list/`
export const FRIEND_REQUEST_CONFIRM = `${HOSTNAME}friends/confirm/`
export const FRIEND_REQUEST_CANCEL = `${HOSTNAME}friends/cancel/`
export const MUYUAL_FRIENDS = `${HOSTNAME}friends/mutual_friends/?user2=`
export const FRIENDS = `${HOSTNAME}friends/my_friends/`
export const SEARCH_USERS = `${HOSTNAME}auth/search_users/?name=`


