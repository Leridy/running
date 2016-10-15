$(function() {

	var nodes = {};

	var data = {};

	var page = {
		init: function() {
			this.initNodes();
			this.initData();

			nodes.search.on('submit', this.handleSearch);
			$('[node-type="dropdown-menu"]').on('click', '[data-value]', this.handleFilters);
			$('#filterTime').on('click', this.handleFilterTime);
			nodes.table.on('click', '[node-type="pass"]', this.handlePass);
			nodes.table.on('click', '[node-type="fail"]', this.handleTid);
			nodes.table.on('click', '[node-type="view"]', this.handleTid);
			nodes.table.on('click', '[data-freeze]', this.handleFressze);
			$('#viewModal').on('show.bs.modal', this.handleView);
			nodes.submit.on('click', this.handleFail);
		},
		initNodes: function() {
			$.extend(nodes, {
				wrapper: $('#wrapper'),

				filters: $('#filters'),
				keyword: $('#keyword'),
				search: $('#search'),
				table: $('#table'),
				submit: $('#submit'),
				failmsg: $('#failmsg'),
				detailBody: $('#detailBody')
			});
		},
		initData: function() {
			$.extend(data, {
				list: [],
				filter: {
					status: 1,
					keyWord: null
				}
			});
		},
		handleFressze: function(event) {
			event.preventDefault();
			var self = $(this),
				id = self.attr('data-freeze'),
				type = self.attr('data-type'),
				flag = Number(!type);

			return System.request({
				type: 'POST',
				url: 'user/admin_set_user_disable_comment',
				data: {
					userId: id,
					type: type
				}
			})
			.done(function(response) {
				if (response.ret == 0) {
					$.toast({
						icon: 'success',
						text: (type==0 ? '取消' : '') + '禁言成功'
					});

					self.attr('data-type', flag)
						.html((type==0 ? '' : '取消') + '禁言');
				} else {
					$.toast({
						icon: 'error',
						text: response.msg
					});
				}
			});
		},
		handleTid: function() {
			var self = $(this);
			data.btn = self;
			data.tid = self.attr('data-tid');
		},
		handleView: function() {
			var tid = data.tid,
				info = data.list[tid];

			nodes.detailBody.html(System.template('detailTpl', {
				info: info
			}));
		},
		handleFilters: function(event) {
			event.preventDefault();
			var self = $(this),
				wrap = $(event.delegateTarget);

			data.filter[wrap.attr('data-name')] = self.attr('data-value');
			page.refresh();

			wrap.siblings('[node-type="show"]')
				.html(self.text());

			self.parent()
				.addClass('active')
				.siblings('.active')
				.removeClass('active');
		},
		handleFilterTime: function() {
			var self = $(this),
				icon = self.children('i');

			if (icon.hasClass('glyphicon-arrow-up')) {
				data.filter.orderBy = 1;
				icon.removeClass('glyphicon-arrow-up')
					.addClass('glyphicon-arrow-down');
			} else {
				data.filter.orderBy = 0;
				icon.removeClass('glyphicon-arrow-down')
					.addClass('glyphicon-arrow-up');
			}

			page.refresh();
		},
		handleSearch: function(event) {
			event.preventDefault();
			data.filter.keyWord = $.trim(nodes.keyword.val());
			page.refresh();
		},
		refresh: function() {
			nodes.table.bootstrapTable('selectPage', 1);
			/*nodes.table.bootstrapTable('refreshOptions', {
				queryParams: function(params) {
					params.offset = 0;

					return params;
				}
			});*/
		},
		handlePass: function() {
			var self = $(this),
				tid = self.attr('data-tid');

			page.auth({
					sid: tid,
					judge: 0
				})
				.done(function(response) {
					if (response.ret == 0) {
						$.toast({
							icon: 'success',
							text: '成功设置为通过审核'
						});
						self.closest('td')
							.prev()
							.html(page.statusFormatter(null, {
								status: 2
							}));
						self.closest('td')
							.html('-');
						$('#failModal').modal('hide');
					}
				})
		},
		handleFail: function() {
			page.auth({
					sid: data.tid,
					judge: 1,
					msg: nodes.failmsg.val()
				})
				.done(function(response) {
					var self = data.btn;
					if (response.ret == 0) {
						$.toast({
							icon: 'success',
							text: '成功设置为不通过审核'
						});
						self.closest('td')
							.prev()
							.html(page.statusFormatter(null, {
								status: 1
							}));
						self.closest('td')
							.html('-');
						$('#failModal').modal('hide');
					}
				})
		},
		auth: function(formData) {
			return System.request({
					type: 'POST',
					url: 'user/examine_seller',
					data: formData
				})
				.done(function(response) {
					if (response.ret != 0) {
						$.toast({
							icon: 'error',
							text: response.msg
						});
					}
				})
		},
		getData: function(params) {
			return System.request({
					type: 'GET',
					url: 'user/get_user_list',
					data: $.extend(data.filter, {
						isPage: 1,
						begin: params.data.offset,
						limit: params.data.limit
					})
				})
				.done(function(response) {
					if (response.ret == 0) {
						var list = {
							rows: response.data,
							total: response.count
						};

						params.success(list);
						data.filter.keyWord = null;
						data.list = response.data;
					} else {
						$.toast({
							icon: 'error',
							text: response.msg
						});
					}
				})
		},
		walletFormatter: function(value, row, index) {
			return [
				'<span class="label label-default">未开通</span>',
				'<span class="label label-success">已开通</span'
			][row.wallet];
		},
		statusFormatter: function(value, row, index) {
			return [
				'<span class="label label-success">可用</span>',
				'<span class="label label-danger">禁用</span>'
			][row.status];
		},
		operateFormatter: function(value, row, index) {
			return [
				'<a href="/pages/user-info.html?id=' + row.id + '">详情</a>',
				'<a href="/pages/user-level-set.html?id=' + row.id + '">设置用户等级</a>',
				'<a href="javascript:;" data-freeze="' + row.id + '" data-type="' + (Number(!row.disableComment)) + '">' + (!row.disableComment?'禁言':'取消禁言') + '</a>'
			].join('&nbsp;');
		},	
		levelFormatter: function(value, row, index) {
			return [
				'',
				'普通用户',
				'达人用户',
				'明星用户',
				'机构用户'
			][row.level];
		}				
	};

	page.init();
	window.getData = page.getData;
	window.walletFormatter = page.walletFormatter;
	window.statusFormatter = page.statusFormatter;
	window.operateFormatter = page.operateFormatter;	
	window.levelFormatter = page.levelFormatter;
});