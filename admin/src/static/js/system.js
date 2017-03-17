// Global
(function(win, undefined) {
	var System = win.System ? win.System : win.System = {};

	System.localStorage = {
		usable: function() {
			return ('localStorage' in window);
		},
		set: function(key, value) {
			if (!this.usable()) return null;

			if (Object.prototype.toString.call(key) === '[object Object]') {
				for (var i in key) {
					localStorage.setItem(i, key[i]);
				}

				return key;
			}

			if (typeof(value) === 'object') {
				value = JSON.stringify(value);
			}

			return localStorage.setItem(key, value);
		},
		get: function(key, parseJSON) {
			var value;
			if (!this.usable()) return null;

			value = localStorage.getItem(key);

			if (parseJSON) {
				value = !value && value !== 0 ? {} : $.parseJSON(value);
			}

			return value;
		},
		del: function(key) {
			if (!this.usable()) return null;

			if (typeof(key) === 'object') {
				for (var i in key) {
					localStorage.removeItem(i);
				}
			} else {
				localStorage.removeItem(key);
			}

			return this;
		}
	};

	System.api = {
		url: location.host.indexOf('admin.runningdreamer.com') > -1 ? 'http://api.runningdreamer.com/' : '//127.0.0.1:8083/'
	};

	Date.prototype.format = function(format) {
		var list = {
			w: this.getDay(),
			s: this.getSeconds(),
			i: this.getMinutes(),
			H: this.getHours(),
			d: this.getDate(),
			M: this.getMonth() + 1,
			Y: this.getFullYear()
		};
		list.W = ['日', '一', '二', '三', '四', '五', '六'][list.w];
		list.h = list.d > 12 ? list.d - 12 : list.d;
		list.m = list.M < 10 ? "0" + list.M : list.M;
		list.y = +list.Y.toString().substr(-2);
		return String(format)
			.replace(/\w/g, function(index) {
				return list[index] || list[index] === 0 ? list[index] : index;
			});
	};

	String.prototype.printf = function() {
		var i = 0,
			str = this,
			args = Array.prototype.slice.call(arguments);

		if (args[0] instanceof Array) {
			args = args[0];
		}

		return str.replace(/%s/g, function(m) {
			return args[i] === undefined ? m : (i++, args[i - 1]);
		});
	};

	Object.values = function(obj) {
		var rs = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				rs.push(obj[i]);
			}
		}

		return rs;
	};

	if (!Object.keys) {
		Object.keys = (function() {
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({
					toString: null
				}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;

			return function(obj) {
				if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

				var result = [];

				for (var prop in obj) {
					if (hasOwnProperty.call(obj, prop)) result.push(prop);
				}

				if (hasDontEnumBug) {
					for (var i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
					}
				}
				return result;
			}
		})();
	};

	System.IE = (navigator.userAgent.match(/MSIE (\d+)/) || [])[1];

	System.each = function(obj, iterator, fn) {
		var flag, isFn = typeof fn === 'function';
		if (typeof obj !== 'object') {
			isFn && fn();
		} else {
			for (var k in obj) {
				flag = true;
				if (obj.hasOwnProperty(k) && iterator(obj[k], k) === false) break;
			}
		}
		if (isFn) flag || fn();
	};

	System.nodeType = function(name, type) {
		return '[%s="%s"]'.printf(type || 'node-type', name);
	};

	System.joinUrlParams = function(obj, a, f) {
		var uri = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				uri.push([i, encodeURIComponent(obj[i])].join(a || '='));
			}
		}

		return uri.join(f || '&');
	};

	System.request = function(options) {
		/*var apiTokenStr = System.localStorage.get('auth'),
			apiToken = !apiTokenStr ? {} : jQuery.parseJSON(apiTokenStr);

		options = jQuery.extend({
			type: 'GET',
			data: {}
		}, options);
		$.extend(options.data, apiToken);*/
		options.url = System.api.url + options.url;
		var userInfo = System.localStorage.get('auth', true);
		if (!!userInfo && options.url.indexOf('manage/login') == -1) {
			options.data = options.data || {};
			options.url += '?uid=' + userInfo.uid + '&token=' + userInfo.token;
			// if (typeof(options.data) == 'object') {
			// 	options.data.token = userInfo.token;
			// 	options.data.managerId = userInfo.managerId;
			// } else {
			// 	options.data += '&managerId=' + userInfo.managerId + '&token=' + userInfo.token;
			// }
		}

		return jQuery.ajax(jQuery.extend({
			dataType: 'json'
				/*,
								xhrFields: {
									withCredentials: true
								}*/
		}, options));
	};

	System.getParam = function(n, t) {
		var i = new RegExp('(?:^|\\?|#|&)' + n + '=([^&#]*)(?:$|&|#)', 'i'),
			o = i.exec(t || location.href);
		return o ? decodeURIComponent(o[1]) : '';
	};

	// SYSTEM
	System.url = function(url, params, strict) {
		var uri = [];

		url = String(url);

		for (var i in params) {
			url = url.replace(new RegExp('(\\?|\\&)' + i + '\\=(.*?)[^\\&]', 'g'), '$1');
		}

		uri.push(url.replace(/\?$/, '').replace(/\?\&/, '?').replace(/\&\&/, '&'));
		params && uri.push(jQuery.param(params));
		return (!~uri[0].indexOf('?') ? uri.join('?') : uri.join('&'));
	};

	System.redirect = function(url, params, strict) {
		return (win.location.href = this.url(url, params, strict));
	};

	/**
	 * 预定义的字符转换为 HTML 实体
	 * @param html 转换的字符串
	 * @returns {string}
	 */
	System.HTMLEncode = function(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	};

	/**
	 * 预定义的 HTML 实体转换为字符
	 * @param html 转换的字符串
	 * @returns {string}
	 */
	System.HTMLDecode = function(str) {
		return String(str)
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&')
			.replace(/&quot;/g, '"')
			.replace(/&#039;/, "'");
	};

	/**
	 * 单词首字母大写
	 * @param {string} word 单词
	 */
	System.ucfirst = function(word) {
		return word = String(word), (word.charAt(0) && word.charAt(0).toUpperCase() + word.substr(1));
	};

	/**
	 * 计算年龄
	 * @param  {[int|string]} timestamp [出生时间]
	 * @return {[type]}		   [岁数]
	 */
	System.getAge = function(timestamp) {
		var nd = new Date(+String(timestamp).replace(/\-/g, '/')),
			ny = nd.getFullYear(),
			cd = new Date(),
			month = cd.getMonth() - nd.getMonth();
		if (month < 0) {
			ny++;
		} else if (month == 0 && cd.getDate() - nd.getDate() < 0) {
			ny++;
		}

		return cd.getFullYear() - ny;
	}

	/**
	 * 在对象中查找值
	 * @param {value} value 需要查找的值
	 * @param {object} obj 对象
	 * @param {field} field 查找对象属性的值
	 * @param {boolean} strict 是否开启严格模式
	 * @param {boolean} all 是否查找全部，为false查找一个结果就返回
	 * @returns {Array}
	 */
	System.objectSearch = function(value, obj, field, strict, all) {
		var tmp, arr = [];
		if (Object.prototype.toString.call(obj) === '[object Object]') return null;
		for (var i in obj) {
			tmp = (field ? obj[i][field] && (strict ? obj[i][field] === value : obj[i][field] == value) :
				(strict ? obj[i] === value : obj[i] == value)) ? obj[i] : null;
			if (!all && tmp) return tmp;
			arr.push(tmp);
		}
		return arr;
	};

	/**
	 * 查询所有结果集
	 * @param {value} value 需要查找的值
	 * @param {object} obj 对象
	 * @param {field} field 查找对象属性的值
	 * @param {boolean} strict 是否开启严格模式
	 * @returns {Array}
	 */
	System.objectSearchAll = function(value, obj, field, strict) {
		return System.objectSearch(value, obj, field, strict, true);
	};

	/**
	 * 地理位置距离计算
	 * @param  {int} lat1 纬度1
	 * @param  {int} lng1 经度1
	 * @param  {int} lat2 纬度2
	 * @param  {int} lng2 经度2
	 * @return {int}	  距离km/m
	 */
	System.getGreatCircleDistance = function(lat1, lng1, lat2, lng2) {
		if (!lat1 || !lng1 || !lat2 || !lng2) return '';
		var PI = Math.PI,
			radLat1 = lat1 * PI / 180,
			radLat2 = lat2 * PI / 180,
			a = radLat1 - radLat2,
			b = lng1 * PI / 180 - lng2 * PI / 180,
			s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = Math.round(s * 6378137);
		s = s > 1000 ? Math.round(s / 1000) + 'km' : s + 'm';
		return s;
	};

	/**
	 * 格式化文件单位
	 * @param  {int}	 size 文件大小
	 * @param  {boolean} type 为ture返回数组
	 * @return {mixed}		格式化的结果
	 */
	System.formatBytes = function(size, type) {
		var rs, units = ['B', 'KB', 'MB', 'GB', 'TB'];
		for (var i = 0, len = units.length; i < len && size >= 1024; i++) {
			size /= 1024;
		}
		rs = [+size.toFixed(2), units[i]];
		return type ? rs : rs.join('');
	};

	/**
	 * 跳转到邮箱登录地址
	 * @param  {[type]} email [description]
	 * @return {[type]}	   [description]
	 */
	System.mailTo = function(email) {
		var u, d = {
			'qq': 'http://mail.qq.com',
			'foxmail': 'http://mail.qq.com',
			'gmail': 'http://gmail.google.com',
			'126': 'http://mail.126.com',
			'163': 'http://mail.163.com',
			'yahoo': 'http://mail.yahoo.com',
			'sina': 'http://mail.sina.com.cn',
			'live': 'http://live.cn'
		};

		u = String(email).replace(/^([\w_]{1,32})@(\w*)\.(\w*)$/, function(e0, e1, e2, e3) {
			return d[e2] || ('http://www.' + e2 + '.' + e3);
		});
		win.open(u);
	};

	System.WineUnitChange = function(amount) {
		amount = parseInt(amount);

		if (amount < 10)
			return amount + '两';
		if (amount >= 10 && amount % 10 == 0)
			return parseInt(amount / 10) + '斤';

		return parseInt(amount / 10) + '斤' + amount % 10 + '两';
	}


	// DOM
	System.getStyle = function(elem, property) {
		var style = document.defaultView ? document.defaultView.getComputedStyle(elem) : elem.currentStyle;
		return property ? style[property] : style;
	};

	System.ANIMATION_END_EVENT_NAMES = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	System.animationEndEvent = function(node, fn) {
		var animationEnds = System.ANIMATION_END_EVENT_NAMES;

		if (node instanceof jQuery) {
			typeof fn === 'function' && node.on(animationEnds, fn);

			return this;
		}

		animationEnds = animationEnds.split(' ');
		for (var i = 0, len = animationEnds.length; i < len; i++) {
			typeof fn === 'function' && node.addEventListener(animationEnds[i], fn);
		}

		return this;
	};

	System.scrollToTop = function() {
		jQuery('body').animate({
			scrollTop: 0
		});
	};
})(window);

// template & author: Sanonz <sanonz@126.com>
(function(System, undefined) {
	var cache = {};

	function compileTpl(id, tpl) {
		var elem, start = 0,
			tmp = "",
			t;
		if (tpl) {
			tpl = String(tpl);
		} else {
			elem = document.getElementById(id);
			if (!elem) return;
			tpl = elem.tagName == "INPUT" || elem.tagName == "TEXTAREA" ? elem.value : elem.innerHTML;
			elem.parentNode.removeChild(elem);
		}
		tpl = tpl.replace(/[\n\t\r]/g, '');
		tpl.replace(/<%(.+?)%>/g, function(e1, e2, e3, e4) {
			t = e4.substr(start, e3 - start).replace(/(^\s+|\s+$)/g, ' ');
			t && (tmp += "_.push('" + t + "');");
			tmp += parseTpl(e2);
			start = e3 + e1.length;
		});
		t = tpl.substr(start);
		t && (tmp += "_.push('" + t + "');");
		return tmp;
	}

	function parseTpl(str) {
		var match;
		if (match = str.match(/^=\s*(.+?)\s*$/)) return "_.push(" + match[1] + ");";
		if (match = str.match(/^\s*(if|else\s*if)\s+(.+?)$/)) return (match[1] == "if" ? "if" : "}else if") + "(" + match[2] + "){";
		if (match = str.match(/^\s*switch\s+(.+?)$/)) return "switch(" + match[1] + "){";
		if (match = str.match(/^\s*case\s+(.+?)$/)) return "case " + match[1] + ":";
		if (match = str.match(/^\s*include\s+(.+?)$/)) return loadTemplate(match[1], null, true);
		if (match = str.match(/^\s*each\s+(\S+)\s+(\S+)(\s+(\S+))?\s*/)) return "System.each(" + match[1] + ",function(" + (match[4] ? match[4] + "," : "") + match[2] + "){";
		if (/^\s*else\s*$/.test(str)) return "}else{";
		if (/^\s*eachElse\s*$/.test(str)) return "},function(){";
		if (/^\s*\/each\s*$/.test(str)) return "});";
		if (/^\s*break\s*$/.test(str)) return "return false;";
		if (/^\s*\/case\s*$/.test(str)) return "break;";
		if (/^\s*continue\s*$/.test(str)) return "return true;";
		if (/^\s*\/(if|switch)\s*$/.test(str)) return "}";
		return str + ";";
	}

	function loadTemplate(id, tpl, wrap) {
		var tmp = wrap ? "" : "var _=[];with(vars){";
		tmp += cache[id] || (cache[id] = compileTpl(id, tpl));
		wrap || (tmp += "};return _.join('');");
		return tmp;
	}

	System.template = function(id, args, tpl) {
		return Function("vars", loadTemplate(id, tpl))(args || {});
	};

	System.template.insert = function(elem, tpl, type) {
		if (type === undefined) {
			type = true;
		}
		return elem[type ? 'html' : 'append'](tpl);
	};
})(System);

jQuery.fn.serializeObject = function() {
	var list = {};
	jQuery(this).serializeArray().map(function(item) {
		if (list[item.name]) {
			if (typeof(list[item.name]) === 'string') {
				list[item.name] = [list[item.name]];
			}
			list[item.name].push(item.value);
		} else {
			list[item.name] = item.value;
		}
	});

	return list;
};