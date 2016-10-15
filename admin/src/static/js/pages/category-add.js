$(function() {

	var nodes = {
		form: $('#form')
	};

	var data = {
		id: System.getParam('id')
	};

	var page = {
		init: function() {
			if( data.id ) {
				this.getPerform(data.id);
				$('#title').html('修改分类');
			} else {
				nodes.form.html(System.template('appTpl', {info: {}}));
				this.bindEvents();
				$('#title').html('添加分类');
			}
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),
				timeWrap: $('#timeWrap'),
				performer: $('#performer'),
				price: $('#price'),
				time: $('#time'),
				name: $('#name'),
				city: $('#city'),
				place: $('#place'),
				address: $('#address'),
				type: $('#type'),
				ticketTags: $('#ticketTags'),
				auctionTags: $('#auctionTags'),
				desc: $('#desc'),
				postTimeWrap: $('#postTimeWrap'),
				postype: $('input[name="postype"]'),
				submit: $('#submit'),	
			});
		},
		initData: function() {
			var auth = $.parseJSON(System.localStorage.get('auth'));
			$.extend(data, {
				auth: auth,
				date: new Date(),
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
					    mimeTypes: 'image/*'
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

			if( !data.formData || !data.formData.id ) {
				$.extend(data, {
					formData: {
						category: '演唱会'
					}
				});
			}
		},
		bindEvents: function() {
			
		},
		handleTimeWatch: function(e) {
			if( this.value ) {
				data.formData.time = this.value;				
			} else {				
				data.formData.time = moment(e.date).format('YYYY-MM-DD HH:mm');
			}			
		},
		handlePerformerWatch: function() {
			var self = $(this);

			data.formData.performer = self.val();
		},
		handlePriceDescWatch: function() {
			var self = $(this),
				price = self.val();

			data.formData.priceDesc = price;
			self.val(price);
		},
		handleNameWatch: function() {
			var self = $(this);

			data.formData.name = self.val();
		},
		handleCityWatch: function() {
			var self = $(this);

			data.formData.city = self.val();
		},
		handlePlaceWatch: function() {
			var self = $(this);

			data.formData.place = self.val();
		},
		handleAddressWatch: function() {
			var self = $(this);

			data.formData.address = self.val();
		},
		handleTypeWatch: function() {
			var self = $(this);

			data.formData.category = self.val();
		},
		handleDescWatch: function() {
			var self = $(this);

			data.formData.description = self.val();
		},
		getPerform: function(id) {
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
			var formData = $.extend({}, data.formData);
			formData.time || (formData.time = nodes.time.val());
			if( !formData.time ) {
				$.toast({
					icon: 'error',
					text: '请选择演出时间'
				});
				return;
			}
			formData.upload = nodes.postype.filter(':checked').val();
			formData.ticketTags = nodes.ticketTags.tagsinput('items').join('|');
			formData.auctionTags = nodes.auctionTags.tagsinput('items').join('|');

			if( !formData.large ) {
				$.toast({
					icon: 'error',
					text: '请上传首页图片'
				});
				return;
			}
			if( !formData.small ) {
				$.toast({
					icon: 'error',
					text: '请上传演出详情小图'
				});
				return;
			}
			if( !formData.medium ) {
				$.toast({
					icon: 'error',
					text: '请上传演出详情大图'
				});
				return;
			}
			//if( !formData.seatMap ) {
			//	$.toast({
			//		icon: 'error',
			//		text: '请上传座位图'
			//	});
			//	return;
			//}

			formData.performId = formData.id;
			delete formData.id;
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
		performUpload: function() {
			var auth = $.parseJSON(System.localStorage.get('auth'));
			var width = 690;
			var height = 390;
			data.uploaderConfig.pick.id = '#performUpload';
			var uploader = new WebUploader.Uploader($.extend(data.uploaderConfig, {
			    thumb: {
			    	width: width,
			    	height: height,
			    	crop: false,
			    	allowMagnify: false
			    }
			}))
			.on('fileQueued', function(file) {
				$('#performThumb')
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
					$('#performThumb')
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
		},
		smallUpload: function() {
			var auth = $.parseJSON(System.localStorage.get('auth'));
			var width = 208;
			var height = 280;
			data.uploaderConfig.pick.id = '#smallUpload';
			var uploader = new WebUploader.Uploader($.extend(data.uploaderConfig, {
			    thumb: {
			    	width: width,
			    	height: height,
			    	crop: false,
			    	allowMagnify: false
			    }
			}))
			.on('fileQueued', function(file) {
				$('#smallThumb')
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
					data.formData.small = response.data.imgUrl;
					$('#smallThumb')
						.show()
						.find('img')
						.attr({
							'width': width,
							'height': height,
							'src': data.formData.small
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
		},
		largeUpload: function() {
			var auth = $.parseJSON(System.localStorage.get('auth'));
			var width = 750;
			var height = 1010;
			data.uploaderConfig.pick.id = '#largeUpload';
			var uploader = new WebUploader.Uploader($.extend(data.uploaderConfig, {
			    thumb: {
			    	width: width,
			    	height: height,
			    	crop: false,
			    	allowMagnify: false
			    }
			}))
			.on('fileQueued', function(file) {
				$('#largeThumb')
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
					data.formData.medium = response.data.imgUrl;
					$('#largeThumb')
						.show()
						.find('img')
						.attr({
							'width': width,
							'height': height,
							'src': data.formData.medium
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
		},
		ticketUpload: function() {
			var auth = $.parseJSON(System.localStorage.get('auth'));
			var width = 750;
			var height = 750;
			data.uploaderConfig.pick.id = '#ticketUpload';
			var uploader = new WebUploader.Uploader($.extend(data.uploaderConfig, {
			    thumb: {
			    	width: width,
			    	height: height,
			    	crop: false,
			    	allowMagnify: false
			    }
			}))
			.on('fileQueued', function(file) {
				$('#ticketThumb')
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
					data.formData.seatMap = response.data.imgUrl;
					$('#ticketThumb')
						.show()
						.find('img')
						.attr({
							'width': width,
							'height': height,
							'src': data.formData.seatMap
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