import request from '@/utils/request';

export async function query() {
  return request('/api/user/list');
}

export async function queryCurrent() {
  return request('/api/user');
}
