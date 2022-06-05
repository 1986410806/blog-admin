// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 发送验证码 POST /api/login/captcha */

export async function current(options) {
  return request('/api/auth/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */

export async function login(data, options) {
  return request('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
    ...(options || {}),
  });
}