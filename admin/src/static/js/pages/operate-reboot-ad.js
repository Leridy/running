$(function() {

	var nodes = {
		form: $('#form')
	};

	var data = {
		formData: {}
	};

	var page = {
		init: function() {
			$('#title').html('添加APP启动页广告');
			nodes.form.html(System.template('appTpl', {info: {}}));
			this.bindEvents();
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),
				timeWrap: $('#timeWrap'),
				formName: $('#formName'),
				formUrl: $('#formUrl'),
				submit: $('#submit')
			});
		},
		initData: function() {
			var auth = $.parseJSON(System.localStorage.get('auth')) || {};
			$.extend(data, {
				auth: auth,
				uploaderConfig: {
					auto: true,
					fileVal: 'upfile',
					formData: {
						uid: auth.uid,
						token: auth.token
					},
				    pick: {
				    	id: '#upload',
				    	label: '选择图片'
				    },
				    chunked: true, // 开起分片上传。
				    accept: {
				    	title: 'Image',
				    	extensions: 'jpg,jpeg,png',
					    mimeTypes: 'image/*,video/*'
				    },
				    thumb: {
				    	width: 200,
				    	height: 200,
				    	crop: false,
				    	allowMagnify: false
				    },
				    disableGlobalDnd: true,
				    server: System.api.url + '/tools/upload_img',
				    fileNumLimit: 2,
				    swf: '/static/bower_components/fex-webuploader/dist/Uploader.swf'
				}
			});
		},
		bindEvents: function() {
			this.initNodes();
			this.initData();

			this.formUpload();
		},
		getFormData: function(id) {
			return System.request({
				type: 'GET',
				url: '/perform/detail',
				data: {id: id}
			})
			.done(function(response) {
				if( response.ret == 0 ) {
					data.formData = response.data;
					nodes.form.html(System.template('appTpl', {info: response.data}));
					page.bindEvents();
				} else {
					$.toast({
						icon: 'error',
						text: response.msg
					});
				}
			})
			.fail(function() {
				nodes.form.html('<h4 class="text-muted text-center">网络错误</h4>');
			});
		},
		handleSubmit: function(event) {
			event.preventDefault();
			var formData = $.extend(data.formData, nodes.form.serializeObject());

			if( !formData.large ) {
				$.toast({
					icon: 'error',
					text: '请上传首页图片'
				});
				return;
			}

			nodes.submit.prop('disabled', true);
			return System.request({
				type: 'POST',
				url: 'perform/admin_' + (!formData.performId ? 'add' : 'edit') + '_perform',
				data: formData
			})
			.done(function(response) {
				if( response.ret == 0 ) {
					$.toast({
						icon: 'success',
						text: !formData.performId ? '恭喜您发布成功' : '恭喜您修改成功'
					});
					setTimeout(function() {
						System.redirect('/pages/perform-list.html');
					}, 1000);
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
		},
		formUpload: function() {
			var width = 690;
			var height = 390;
			data.uploaderConfig.pick.id = '#formUpload';
			var uploader = new WebUploader.Uploader($.extend(data.uploaderConfig, {
			    thumb: {
			    	width: width,
			    	height: height,
			    	crop: false,
			    	allowMagnify: false
			    }
			}))
			.on('fileQueued', function(file) {
				$('#formThumb')
					.show()
					.find('img')
					.attr({
						'width': 128,
						'height': 128,
						'src': '/static/images/loading.gif'
					});
				data.file && uploader.removeFile(data.file, true);
				data.file = file;
			})
			.on('uploadSuccess', function(file, response) {
				if( response.ret == 0 ) {
					data.formData.large = response.data.imgUrl;
					$('#formThumb')
						.show()
						.find('img')
						.attr({
							'width': width,
							'height': height,
							'src': data.formData.large
						});
				} else {
					$.toast({
						icon: 'error',
						text: response.msg
					});
					uploader.removeFile(file, true);
				}
			})
			.on('error', function(code) {
				switch(code)
				{
					case 'Q_EXCEED_SIZE_LIMIT':
					break;
					case 'Q_TYPE_DENIED':
						$.toast({
							icon: 'error',
							text: '文件类型不支持'
						});
					break;
				}
			});
		}
	};

	page.init();
	window.getData = page.getData;

});