import { create, list, update, del } from '../services/category';

const CategoryModel = {
  namespace: 'category',
  state: {
    list: [],
    paging: {
      total: 0,
      limit: 10,
      page: 1,
    }
  },
  effects: {
    * list(payload, { call, put }) {
      const response = yield call(list, payload.payload);
      yield put({
        type: 'saveCategoryList',
        payload: response,
      });
    },

    * del(payload, { call, put }) {
      const response = yield call(del, payload.payload);
      if (response.success) {
        yield put({
          type: 'delItem',
          payload: payload.payload.id,
        });
      }
      return;
    },
  },

  reducers: {
    saveCategoryList(state = {
      list: [],
      paging: {}
    }, action) {
      return {
        ...state,
        list: action.payload.data.results || [],
        paging: action.payload.data.page || state.paging
      };
    },
    // 删除制定元素
    delItem(state, action) {
      state.list.splice(state.list.findIndex(item => item.id === action.payload), 1)
      return {
        ...state
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/category') {
          dispatch({
            type: 'list'
          });
        }
      });
    },
  },
};
export default CategoryModel;
