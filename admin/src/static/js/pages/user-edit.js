$(function() {

	var nodes = {
		form: $('#form')
	};

	var data = {
		id: System.getParam('id') || 0,
		formData: {
			id: 0,
			photo: '',
			is_admin: 1
		},
		filters: {
			picture: [{
				title: "jpg files",
				extensions: "jpg"
			}, {
				title: "jpg files",
				extensions: "jpeg"
			}, {
				title: "jpg files",
				extensions: "png"
			}]
		}
	};

	var page = {
		init: function() {
			if (data.id) {
				this.getUserData(data.id).done(function(response) {
					if (response.res == 0) {
						data.formData = $.extend(data.formData, response.data[0]);
						data.formData.is_admin = data.formData.is_admin.data[0];
						nodes.form.html(System.template('appTpl', {
							info: data.formData
						}));
						page.initNodes();
						page.bindEvents();
					}
				});
				$('#title').html('修改用户');
			} else {
				nodes.form.html(System.template('appTpl', {
					info: data.formData
				}));
				$('#title').html('添加用户');
				this.initNodes();
				this.bindEvents();
			}
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),
				submit: $('#submit'),
				prviewImg: $('#prview-img'),
				modalImgCropper: $('#modal-img-cropper'),
				CropperImg: $('#cropper-img'),
				showPickfileBtn: $('[data-action="showpickfile"]'),
				modalReplySure: $('#modal-reply-sure'),
				modalSetSize: $('#modal-set-size'),
				$dataX: $("#dataX"),
				$dataY: $("#dataY"),
				$dataHeight: $("#dataHeight"),
				$dataWidth: $("#dataWidth"),
				modalJustUpload: $("#modal-just-upload")
			});
		},
		handleCropperImgLoad: function() {
			nodes.CropperImg.cropper({
				aspectRatio: 1 / 1,
				// autoCropArea: 1,
				data: {
					x: 420,
					y: 50,
					width: 640,
					height: 360,
				},
				preview: ".preview",
				done: function(data) {
					nodes.$dataX.val(data.x);
					nodes.$dataY.val(data.y);
					nodes.$dataHeight.val(data.height);
					nodes.$dataWidth.val(data.width);
				},

				build: function(e) {
					//console.log(e.type);
				},

				built: function(e) {
					//console.log(e.type);
				},
				dragstart: function(e) {
					//console.log(e.type);
				},
				dragmove: function(e) {
					//console.log(e.type);
				},
				dragend: function(e) {
					//console.log(e.type);
				}
			});
		},
		initData: function() {
			var auth = $.parseJSON(System.localStorage.get('auth'));
		},
		bindEvents: function() {
			this.formUpload();
			nodes.showPickfileBtn.on('click', this.handleShowPickFile);
			nodes.modalReplySure.on('click', this.handleReplySure);
			nodes.submit.on('click', this.handleSubmitForm);
			nodes.CropperImg.on('load', this.handleCropperImgLoad);
			nodes.modalJustUpload.on('clck', this.handleJustUpload);
		},
		getUserData: function(id) {
			return System.request({
					type: 'get',
					url: 'manage/get_user',
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

		},
		handleSubmitForm: function(event) {
			event.preventDefault();
			var formData = $.extend(data.formData, nodes.form.serializeObject());
			formData.id = data.id;
			if (!formData.name) {
				$.toast({
					icon: 'error',
					text: '请输入昵称'
				});
				return;
			}
			if (!formData.photo) {
				$.toast({
					icon: 'error',
					text: '请上传头像'
				});
				return;
			}
			if (formData.id == 0 || formData.pwd1 || formData.pwd) {
				if (!formData.pwd1) {
					$.toast({
						icon: 'error',
						text: '请输入密码'
					});
					return;
				}
				if (!formData.pwd) {
					$.toast({
						icon: 'error',
						text: '请输入确认密码'
					});
					return;
				}
				if (formData.pwd1 != formData.pwd) {
					$.toast({
						icon: 'error',
						text: '两次密码输入不一致'
					});
					return;
				}
				formData.pwd1 = md5(formData.pwd1);
				formData.pwd = md5(formData.pwd);
			}
			if (!formData.login_name) {
				$.toast({
					icon: 'error',
					text: '请输入登录名'
				});
				return;
			}
			if (!formData.pwd1) {
				delete formData.pwd1;
			}
			if (!formData.pwd) {
				delete formData.pwd;
			}
			nodes.submit.prop('disabled', true);
			return System.request({
					type: 'POST',
					url: 'manage/edit_user',
					data: formData
				})
				.done(function(response) {
					if (response.res == 0) {
						$.toast({
							icon: 'success',
							text: !formData.id ? '恭喜您发布成功' : '恭喜您修改成功'
						});
						setTimeout(function() {
							System.redirect('/pages/user-list.html');
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
		handleReplySure: function() {
			var imgData = nodes.CropperImg.cropper("getData", true);
			var pictureUrl = data.formData.photo;
			if (imgData.width && data.formData.photo) {
				if (pictureUrl.indexOf('?imageMogr2') == -1) {
					pictureUrl = pictureUrl + '?imageMogr2/crop/!%sx%sa%sa%s'.printf(imgData.width, imgData.height, imgData.x, imgData.y);
				} else {
					pictureUrl = pictureUrl.substring(0, pictureUrl.indexOf('?'));
					pictureUrl = pictureUrl + '?imageMogr2/crop/!%sx%sa%sa%s'.printf(imgData.width, imgData.height, imgData.x, imgData.y);
				}
			}
			data.formData.photo = pictureUrl;
			nodes.prviewImg.attr('src', pictureUrl);
			nodes.modalImgCropper.modal('hide');
		},
		handleJustUpload: function() {
			var imgData = nodes.CropperImg.cropper("getData", true);
			data.formData.photo = imgData;
			nodes.prviewImg.attr('src', imgData);
			nodes.modalImgCropper.modal('hide');
		},
		handleShowPickFile: function(event) {
			event.preventDefault();
			nodes.modalImgCropper.modal('show');
		},
		formUpload: function() {
			var width = 690;
			var height = 390;
			var btnText = null;
			var uploader = Qiniu.uploader({
				runtimes: 'html5,flash,html4', // 上传模式，依次退化
				browse_button: 'upload-photo', // 上传选择的点选按钮，必需
				// 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
				// 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
				// 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
				// uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
				// uptoken_url: '/uptoken',		 // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
				uptoken_func: function(file) { // 在需要获取uptoken时，该方法会被调用
					var token = null;
					System.request({
							type: 'GET',
							async: false,
							data: {},
							url: 'utils/get_upload_token'
						})
						.done(function(response) {
							token = response.data;
						});
					return token;
				},
				filters: data.filters.picture,
				get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的uptoken
				// downtoken_url: '/downtoken',
				// Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
				// unique_names: true,			  // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
				// save_key: true,				  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
				domain: '<Your bucket domain>', // bucket域名，下载资源时用到，必需
				container: 'container', // 上传区域DOM ID，默认是browser_button的父元素
				max_file_size: '100mb', // 最大文件体积限制
				flash_swf_url: '/static/bower_components/plupload/js/Moxie.swf', //引入flash，相对路径
				max_retries: 0, // 上传失败最大重试次数
				dragdrop: true, // 开启可拖曳上传
				drop_element: 'container', // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
				// chunk_size: '4mb',				  // 分块上传时，每块的体积
				auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
				multi_selection: true,
				init: {
					'FilesAdded': function(up, files) {
						plupload.each(files, function(file) {
							// 文件添加进队列后，处理相关的事情
						});
					},
					'BeforeUpload': function(up, file) {
						var btn = up.getOption('browse_button')[0];
						btn.disabled = true;
						if (!btnText) {
							btnText = btn.innerHTML;
						}
					},
					'UploadProgress': function(up, file) {
						var btn = up.getOption('browse_button')[0];
						btn.innerHTML = '已上传%s%'.printf(file.percent);
					},
					'FileUploaded': function(up, file, info) {
						var result = $.parseJSON(info);
						btn = up.getOption('browse_button')[0];
						if (nodes.CropperImg.attr('src')) {
							nodes.CropperImg.cropper('destroy');
						}
						nodes.CropperImg.attr('src', result.url);
						data.formData.photo = result.url;
						btn.innerHTML = btnText;
						btn.disabled = false;
					},
					'Error': function(up, err, errTip) {
						var result = $.parseJSON(err.response),
							btn = up.getOption('browse_button')[0];
						$.toast({
							icon: 'error',
							text: result.error
						});

						btn.disabled = false;
						btn.innerHTML = btnText;
					},
					'UploadComplete': function() {
						//队列文件处理完毕后，处理相关的事情
					},
					'Key': function(up, file) {
						// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
						// 该配置必须要在unique_names: false，save_key: false时才生效

						var key = undefined;
						// do something with key here
						return key
					}
				}
			});
			data.uploader = uploader;
		},
	}
	page.init();
});