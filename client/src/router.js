import React from 'react';
import { Router, Route, browserHistory } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ToolPage from './routes/ToolPage';
import ArticleInfoPage from './routes/ArticleInfoPage';

function RouterConfig() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="/tool/" component={ToolPage} />
      <Route path="/info/:id.html" component={ArticleInfoPage} />
    </Router>
  );
}

export default RouterConfig;