import request from '@/utils/request'
/**
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
