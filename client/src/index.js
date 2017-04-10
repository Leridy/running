import dva from 'dva';
import './index.less';
import '../node_modules/animate.css/animate.css';
import {
	browserHistory
} from 'dva/router';

import './utils/util';

import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
	history: browserHistory
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/header'));
app.model(require("./models/Index"));
app.model(require("./models/ArticleInfo"));
app.model(require("./models/SlideBar"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');