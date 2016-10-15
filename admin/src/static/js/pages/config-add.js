$(function() {

	var nodes = {
		form: $('#form')
	};

	var data = {
		id: System.getParam('id')
	};

	var page = {
		init: function() {
			if (data.id) {
				$('#title').html('修改配置');
			} else {
				nodes.form.html(System.template('appTpl', {
					info: {}
				}));
				this.bindEvents();
				$('#title').html('新增配置');
			}
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),
				types: $('#type'),
				name: $('#name'),
				value: $('#value'),
				version: $('#version'),
				description: $('#description'),
				submit: $('#submit'),
				inputJsonModel: $('#modal-input-json'),
				jsonKey: $('#json-key'),
				jsonValue: $('#json-value'),
				jsonAddBtn: $('#json-add'),
				jsonBtn: $('#json-btn'),
				valueResetBtn: $('#value-reset'),
				jsonSure: $('#json-sure'),
				jsonResult: $('#json-result'),
				jsonResultReset: $('#reset-json-result')
			});
		},
		bindEvents: function() {
			this.initNodes();
			this.initType();
			nodes.form.on('submit', this.handleSubmit);
			nodes.types.on('change', this.typesChange);
			nodes.jsonBtn.on('click', this.submitJson);
			nodes.value.on('click', this.valueClick);
			nodes.valueResetBtn.on('click', this.valueReset);
			nodes.jsonSure.on('click', this.jsonSure);
			nodes.jsonResultReset.on('click', this.handleResetJsonResult);
		},
		handleResetJsonResult: function() {
			nodes.jsonResult.html('');
		},
		jsonSure: function() {
			var key = nodes.jsonKey.val();
			var value = nodes.jsonValue.val();
			if ($.trim(key).length == 0) {
				$.toast({
					icon: 'error',
					text: '请输入键'
				});
				return;
			}
			if ($.trim(value).length == 0) {
				$.toast({
					icon: 'error',
					text: '请输入值'
				});
				return;
			}
			var jsonStr = '{"' + key + '":"' + value + '"}';
			var oldValue = nodes.jsonResult.html();
			try {
				if ((oldValue && !JSON.parse(oldValue)) || parseInt(oldValue)) {
					$.toast({
						icon: 'error',
						text: '已有值不是json格式字符串'
					});
					return;
				}
			} catch (err) {
				$.toast({
					icon: 'error',
					text: '已有值不是json格式字符串'
				});
				return;
			}
			if (oldValue) {
				nodes.jsonResult.html(JSON.stringify($.extend(JSON.parse(oldValue), JSON.parse(jsonStr))));
			} else {
				oldValue = jsonStr;
				nodes.jsonResult.html(jsonStr);
			}
			nodes.jsonKey.val('');
			nodes.jsonValue.val('');
		},
		valueReset: function(event) {
			event.preventDefault();
			nodes.value.val('');
		},
		valueClick: function(event) {
			if (nodes.value.attr('readOnly')) {
				nodes.inputJsonModel.modal('show');
			}
		},
		submitJson: function() {
			var oldValue = nodes.value.val(),
				code, arr;
			if (oldValue) {
				try {
					if (!JSON.parse(oldValue) || parseInt(oldValue)) {
						$.toast({
							icon: 'error',
							text: '已有值不是json格式字符串'
						});
						return;
					} else {
						arr = JSON.parse(oldValue);
					}
				} catch (err) {
					$.toast({
						icon: 'error',
						text: '已有值不是json格式字符串'
					});
					return;
				}
			} else {
				arr = new Array();
			}
			code = nodes.jsonResult.html(), code = JSON.parse(code);
			arr.push(code);
			nodes.value.val(JSON.stringify(arr));
			nodes.inputJsonModel.modal('hide');
		},
		typesChange: function(event) {
			var type = $(event.target).val();
			if (type == 3) {
				nodes.inputJsonModel.modal('show');
				nodes.value.attr('readOnly', 'true');
			} else {
				nodes.value.removeAttr('readOnly');
			}
		},
		initType: function() {
			return System.request({
					type: 'GET',
					url: 'manage/config/getconfigInfo',
					data: {
						configName: "hh_config.type"
					}
				})
				.done(function(response) {
					if (response.ret == 0 && response.data.configInfo.length > 0) {
						data.typeList = response.data.configInfo[0].value;
						nodes.types.html(System.template('tplTypes', {
							types: data.typeList
						}));
					} else {
						$.toast({
							icon: 'error',
							text: '分类为空'
						});
					}
				})
				.fail(function() {
					nodes.form.html('<h4 class="text-muted text-center">网络错误</h4>');
				});
		},
		handleSubmit: function(event) {
			event.preventDefault();
			data.formData = nodes.form.serialize();
			if (!data.formData.value) {
				if (!nodes.value.val()) {
					$.toast({
						icon: 'error',
						text: '请设置值'
					});
					nodes.inputJsonModel.modal('show');
					return;
				} else {
					data.formData.value = nodes.value.val();
				}
			}
			console.log(data.formData);

			nodes.submit.prop('disabled', true);
			return System.request({
					type: 'POST',
					url: 'manage/config/addConfig',
					data: data.formData
				})
				.done(function(response) {
					if (response.ret == 0) {
						$.toast({
							icon: 'success',
							text: '恭喜您发布成功'
						});
					} else {
						$.toast({
							icon: 'error',
							text: response.msg
						});
					}
				})
				.fail(function() {
					$.toast({
						icon: 'error',
						text: '网络错误'
					});
				})
				.always(function() {
					nodes.submit.prop('disabled', false);
				})
		}
	}

	page.init();
	window.getData = page.getData;

});