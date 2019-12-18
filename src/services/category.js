import request from '@/utils/request';

export async function list(params) {
  return request('/api/category/list', {
    method: 'GET',
    params: params,
  })
}

export async function create(params) {
  return request('/api/category/create', {
    method: 'POST',
    data: params,
  })
}

export async function update(params) {
  return request('/api/category/update', {
    method: 'POST',
    data: params,
  })
}

export async function del(params) {
  return request('/api/category/del', {
    method: 'POST',
    data: params,
  })
}
