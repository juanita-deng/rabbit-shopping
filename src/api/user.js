import request from '@/utils/request'
/** 账户登录
 * @param {String} account:用户名或手机号
 * @param {String} password:密码
 * @returns promise
 */
export const userAccountLogin = (account, password) => {
  return request({
    url: '/login',
    method: 'post',
    data: { account, password }
  })
}
/** 发送验证码
 * @param {String} mobile:手机号
 * @returns promise
 */
export const userMobileLoginMsg = (mobile) => {
  return request({
    url: 'login/code',
    method: 'get',
    params: { mobile }
  })
}
/**
 * 短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */
export const userMobileLogin = (mobile, code) => {
  return request({
    method: 'post',
    url: '/login/code',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识 qq openId
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
 * @returns Promise
 */
export const userQQLogin = (unionId, source = 1) => {
  return request({
    url: '/login/social',
    method: 'post',
    data: { unionId, source }
  })
}
