import * as slideBarService from '../services/SlideBar';

export default {
  namespace: 'SlideBar',
  state: {
    articleTags: [],
    friendLinks: []
  },
  reducers: {
    saveArticleTags(state,{ payload: { data: data } }){      
      if (data.res == 0) {
        state.articleTags = data.data;
      }
      return { ...state };
    },
    saveFriendshipLinks(state,{ payload: { data: data } }){
      if (data.res == 0) {
        state.friendLinks = data.data;
      }
      return { ...state };
    },
  },
  effects: {
    *fetchArticleTags({ payload: { }}, { call, put, select }) {
      const { data } = yield call(slideBarService.fetchArticleTags, { });      
      yield put({ type: 'saveArticleTags', payload: { data:data }});       
    },    
    *fetchFriendshipLinks({ payload: { }}, { call, put, select }) {      
       const { data } = yield call(slideBarService.fetchFriendshipLinks, { });
       yield put({ type: 'saveFriendshipLinks', payload: { data:data }});
    },    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {        
         dispatch({ type: 'fetchArticleTags', payload: { } });
         dispatch({ type: 'fetchFriendshipLinks', payload: { } });
      });
    },    
  },
}
