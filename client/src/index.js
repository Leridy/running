import dva from 'dva';
import './index.less';
import {
	browserHistory
} from 'dva/router';

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

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');