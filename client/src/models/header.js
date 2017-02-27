export default {
  namespace: 'header',
  state: {
    menuKey: "home",
    pathname:'/'
  },
  reducers: {
    handleMenuClick(state, { payload: {key} }) {      
      state.menuKey = key;
      return { ...state };
    }  
  },
  effects: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
        history.listen(({ pathname }) => {          
       });
     },
  }
}