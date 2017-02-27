import * as articleService from '../services/article';

export default {
  namespace: 'Index',
  state: {
    previousLabel:'上一页',
    nextLabel:'下一页',
    pageCount:0
  },
  reducers: {
    save(state,{ payload: { data: data } }){
    
      return { ...state };
    }    
  },
  effects: {
  	*fetch({ payload: { pageIndex }}, { call, put, select }) {  
      const limit = yield select(state => state.Index.limit);      
      const offset = limit * (pageIndex - 1);
      const { data, headers } = yield call(articleService.fetch, { offset, limit });
      yield put({ type: 'save', payload: { data:data }});
    }   
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {      	
        if (pathname === '/') {                    
          dispatch({ type: 'fetch', payload: { pageIndex:1 } });
        }
      });
    },    
  },
}
