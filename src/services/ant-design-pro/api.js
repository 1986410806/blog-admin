// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import { stringify } from 'qs';

/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */

export async function login(data, options) {
  return request('/api/loginAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}


// move


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

// 分类
export async function queryCategory(params) {
  return request(`/api/getCategoryList?${stringify(params)}`);
}

export async function addCategory(params, options) {
  return request('/api/addCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: params,
    ...options || {},
  });
}

export async function updateCategory(params) {
  return request('/api/updateCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function delCategory(params) {
  return request('/api/delCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 其他用户
export async function queryUser(params) {
  return request(`/api/getUserList?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function updateUser(params) {
  return request('/api/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function delUser(params) {
  return request('/api/delUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 链接
export async function queryLink(params) {
  return request(`/api/getLinkList?${stringify(params)}`);
}

export async function addLink(params) {
  return request('/api/addLink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function updateLink(params) {
  return request('/api/updateLink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function delLink(params) {
  return request('/api/delLink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 留言
export async function queryMessage(params) {
  return request(`/api/getMessageList?${stringify(params)}`);
}

export async function delMessage(params) {
  return request('/api/delMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function getMessageDetail(params) {
  return request('/api/getMessageDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function addReplyMessage(params) {
  return request('/api/addReplyMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 文章
export async function queryArticle(params) {
  return request(`/api/getArticleListAdmin`, {
    method: 'GET',
    params: params,
  });
}

export async function addArticle(params, options = {}) {
  return request('/api/addArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export async function delArticle(params) {
  return request('/api/delArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function updateArticle(params, options) {
  return request('/api/updateArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export async function getArticleDetail(params, options) {
  return await request('/api/getArticleDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

// 管理一级评论
export async function changeComment(params) {
  return request('/api/changeComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 管理第三者评论
export async function changeThirdComment(params) {
  return request('/api/changeThirdComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 时间轴
export async function queryTimeAxis(params) {
  return request(`/api/getTimeAxisList?${stringify(params)}`);
}

export async function addTimeAxis(params) {
  return request('/api/addTimeAxis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function delTimeAxis(params) {
  return request('/api/delTimeAxis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function updateTimeAxis(params) {
  return request('/api/updateTimeAxis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function getTimeAxisDetail(params) {
  return request('/api/getTimeAxisDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 项目
export async function queryProject(params) {
  return request(`/api/getProjectList?${stringify(params)}`);
}

export async function addProject(params,options) {
  return request('/api/addProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...options || {},
  });
}

export async function delProject(params,options) {
  return request('/api/delProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: params,
    ...options || {},

  });
}

export async function updateProject(params,options) {
  return request('/api/updateProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...options || {},

  });
}

export async function getProjectDetail(params) {
  return request('/api/getProjectDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 标签
export async function queryTag(params) {
  return request(`/api/getTagList`, {
    method: 'GET',
    params: params,
  });
}

export async function addTag(params, options) {
  return request('/api/addTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...options || {},
  });
}

export async function delTag(params, options) {
  return request('/api/delTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...options || {},
  });
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function loginAdmin(params) {
  return request('/api/loginAdmin', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getQiniuToken() {
  return request(`/api/qiniu/getToken`, {
    method: 'GET',
  });
}
