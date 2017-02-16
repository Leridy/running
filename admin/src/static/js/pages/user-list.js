$(function() {

	var nodes = {};

	var data = {};

	var page = {
		init: function() {
			this.initNodes();
			this.initData();
			this.bindEvent();
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
					status: 1
				}
			});
		},
		bindEvent: function() {
			nodes.table.on('click', '[data-action]', this.handleAction);
		},
		handleAction: function(event) {
			event.preventDefault();
			var self = $(this);
			action = self.attr('data-action');

			switch (action) {						
				case 'delete':
					bootbox.confirm("确认删除?", function(result) {
						if (result) {
							page.handleDelete(self, action);
						}
					});
					break;
			}
		},
		handleDelete: function(self, type) {
			var id = self.attr('data-id');			
			return System.request({
					type: 'POST',
					url: 'manage/delete_user',
					data: {
						id: id
					}
				})
				.done(function(response) {
					if (response.res == 0) {
						$.toast({
							icon: 'success',
							text: '删除成功'
						});

						nodes.table.bootstrapTable('refresh');
					} else {
						$.toast({
							icon: 'error',
							text: response.msg
						});
					}
				});
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
		getData: function(params) {
			return System.request({
					type: 'GET',
					url: 'manage/get_user_list',
					data: $.extend(data.filter, {
						begin: params.data.offset,
						limit: params.data.limit
					})
				})
				.done(function(response) {
					if (response.res == 0) {
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
		managerFormatter: function(value, row, index) {
			return [
				'否',
				'是'
			][row.is_admin.data];
		},
		statusFormatter: function(value, row, index) {
			return [
				'<span class="label label-success">可用</span>',
				'<span class="label label-danger">禁用</span>'
			][row.status];
		},
		operateFormatter: function(value, row, index) {
			return [
				'<a href="/pages/user-info-edit.html?id=' + row.id + '">编辑</a>',
				'<a href="javascript:void(0)" data-action="delete" data-id="' + row.id + '">删除</a>',
			].join('&nbsp;');
		},
		timeFormatter: function(value, row, index) {
			return new Date(row.reg_time * 1000).format('Y年M月d日 H:m:s');
		}
	};

	page.init();
	window.getData = page.getData;
	window.managerFormatter = page.managerFormatter;
	window.timeFormatter = page.timeFormatter;
	window.operateFormatter = page.operateFormatter;
});