import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '../utils/authority';
import { setUserToken } from '../utils/user_token';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.errorCode !== 0 || response.success !== true) {
        message.error(response.message)
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully


      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }

      yield put(routerRedux.replace(redirect || '/'));
    },

    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.user.roles); // 保存 权限
      setUserToken(payload.data) // 保存token
      return {
        ...state,
        status: payload.data.code,
        type: payload.data.ref,
      };
    },
  },
};
export default Model;
