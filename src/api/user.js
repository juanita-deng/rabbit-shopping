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
