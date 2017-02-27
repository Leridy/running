import React from 'react';
import { Router, Route, browserHistory } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ToolPage from './routes/ToolPage';

function RouterConfig() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="/tool/" component={ToolPage} />
    </Router>
  );
}

export default RouterConfig;
