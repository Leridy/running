$(function() {

	var nodes = {
		form: $('#form')
	};

	var data = {
		id: System.getParam('id') || 0,
		formData: {
			cover: ''
		},
	};

	var page = {
		init: function() {
			if (data.id) {
				$('#title').html('修改友情链接');
				this.getData(data.id).done(function(response) {
					if (response.res == 0) {
						data.formData = $.extend(data.formData, response.data[0]);
						data.formData.is_delete = data.formData.is_delete.data[0];
						nodes.form.html(System.template('appTpl', {
							info: data.formData
						}));
						page.bindEvents();
					}
				});
			} else {
				nodes.form.html(System.template('appTpl', {
					info: {
						is_delete: 0
					}
				}));
				this.bindEvents();
				$('#title').html('新增友情链接');
			}
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),
				submit: $('#submit'),
			});
		},
		bindEvents: function() {
			this.initNodes();
			nodes.form.on('submit', this.handleSubmit);
		},
		handleSubmit: function(event) {
			event.preventDefault();
			var formData = nodes.form.serializeObject();
			formData.id = data.id;
			if (!formData.name) {
				$.toast({
					icon: 'error',
					text: '请输入友链名称'
				});
				return;
			}
			if (!formData.link_url) {
				$.toast({
					icon: 'error',
					text: '请输入友链地址'
				});
				return;
			}
			nodes.submit.prop('disabled', true);
			return System.request({
					type: 'POST',
					url: 'manage/edit_link',
					data: formData
				})
				.done(function(response) {
					if (response.res == 0) {
						$.toast({
							icon: 'success',
							text: !formData.id ? '恭喜您发布成功' : '恭喜您修改成功'
						});
						setTimeout(function() {
							System.redirect('/pages/friend-links-list.html');
						}, 800);
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
				});
		},
		getData: function(id) {
			return System.request({
					type: 'get',
					url: 'manage/get_links_detail',
					data: {
						id: id
					}
				})
				.done(function(response) {
					if (response.res != 0) {
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
				});

		}
	}
	page.init();

});