$(function() {

	var nodes = {};

	var data = {};

	var page = {
		init: function() {
			this.initNodes();
			this.initData();

			nodes.mobile.on('change', this.handleMobileWatch);
			nodes.pwd.on('change', this.handlePwdWatch);
			nodes.verifycode.on('change', this.handleVerifycodeWatch);
			nodes.form.on('submit', this.handleSubmit);
			$('#refreshCode').on('click', function() {
				nodes.imgcode.attr('src', System.api.url + 'tools/get_img_code?t=' + Date.now());
			});

			System.localStorage.set('env', System.getParam('env') || '');
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),
				form: $('#form'),
				mobile: $('#mobile'),
				pwd: $('#pwd'),
				verifycode: $('#verifycode'),
				submit: $('#submit'),
				imgcode: $('#imgcode')
			});
		},
		initData: function() {
			$.extend(data, {
				formData: {
					username: $.trim(nodes.mobile.val()),
					password: $.trim(nodes.pwd.val()),
					code: $.trim(nodes.verifycode.val())
				}
			});
		},
		handleMobileWatch: function() {
			var v = nodes.mobile.val();
			nodes.mobile.val(v);
			data.formData.username = v;
		},
		handlePwdWatch: function() {
			data.formData.password = $.trim(nodes.pwd.val());
		},
		handleVerifycodeWatch: function() {
			data.formData.code = $.trim(nodes.verifycode.val());
		},
		handleSubmit: function(event) {
			event.preventDefault();
			var formData = $.extend({}, data.formData);

			if (!formData.username) {
				$.toast({
					icon: 'warning',
					text: '请输入管理员'
				});
				nodes.mobile.focus();
				return;
			}
			if (!formData.password) {
				$.toast({
					icon: 'warning',
					text: '请输入密码'
				});
				nodes.pwd.focus();
				return;
			}

			formData.password = md5(formData.password);
			nodes.submit.prop('disabled', true);
			System.request({
					type: 'POST',
					data: formData,
					url: 'manage/login'
				})
				.done(function(response) {
					var data = response.data,
						url;
					if (response.res == 0) {
						System.localStorage.set('auth', response.data);
						System.redirect('index.html');
					} else if (response.res == 2103) {
						$.toast({
							icon: 'error',
							text: '验证码不正确'
						});
						nodes.verifycode.val('');
						$('#refreshCode').trigger('click');
					} else {
						$.toast({
							icon: 'error',
							text: response.msg
						});
					}
				})
				.always(function() {
					nodes.submit.prop('disabled', false);
				})
		}
	};

	page.init();

});