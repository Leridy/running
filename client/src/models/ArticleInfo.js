import * as articleService from '../services/article';

export default {
  namespace: 'ArticleInfo',
  state: {    
    dataSource: {}
  },
  reducers: {
    save(state,{ payload: { data: data } }){
      if (data.res == 0) {        
        state.dataSource = data.data[0];
      }
      return { ...state };
    }
  },
  effects: {
  	*fetch({ payload: { id }}, { call, put, select }) {
      const { data, headers } = yield call(articleService.fetchDetail, { id });
      yield put({ type: 'save', payload: { data:data }});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const regExpInfo=new RegExp('/info/(\\d+?).html');        
        if (regExpInfo.test(pathname)) { 
          const id = pathname.replace(regExpInfo, "$1");
          dispatch({ type: 'fetch', payload: { id:id } });
        }
      });
    },    
  },
}
