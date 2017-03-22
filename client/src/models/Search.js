import * as articleService from '../services/article';

export default {
  namespace: 'Index',
  state: {
    previousLabel: '上一页',
    nextLabel: '下一页',
    pageCount: 0,
    dataSource: [],
    pageSize: 10
  },
  reducers: {
    save(state,{ payload: { data: data, pageIndex:pageIndex } }){
      if (data.res == 0) {
        if (pageIndex == 1) {
          state.pageCount = Math.ceil(data.count / state.pageSize);
        };
        state.dataSource = data.data;
      }
      return { ...state };
    }
  },
  effects: {
  	*fetch({ payload: { pageIndex }}, { call, put, select }) {        
      const { data } = yield call(articleService.fetch, { pageIndex });
      yield put({ type: 'save', payload: { data:data, pageIndex:pageIndex }});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {        
        const regExpInfo=new RegExp('/list/s-(\\s+?).html');        
        if (regExpInfo.test(pathname)) { 
          const id = pathname.replace(regExpInfo, "$1");
          dispatch({ type: 'fetch', payload: { id:id } });
        }
      });
    },    
  },
}