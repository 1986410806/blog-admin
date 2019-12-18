import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
