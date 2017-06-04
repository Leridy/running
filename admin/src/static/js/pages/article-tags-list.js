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
				table: $('#table')
			});
		},
		initData: function() {
			$.extend(data, {
				list: [],
				filter: {
					offset: 0,
					limit: 10
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
				case 'operate':
					page.handleOperate(self, action);
					break;
				case 'delete':
					page.deleteTags(self);
					break;
			}
		},
		deleteTags: function(self) {
			var id = self.attr('data-id');
			return System.request({
					type: 'post',
					url: 'manage/delete_article_tag_info',
					data: {
						id: id
					}
				})
				.done(function(response) {
					if (response.res == 0) {
						$.toast({
							icon: 'success',
							text: '操作成功'
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
		handleOperate: function(self, type) {
			var id = self.attr('data-id'),
				isDelete = self.attr('data-delete') == 1 ? 0 : 1;
			return System.request({
					type: 'post',
					url: 'manage/show_or_hide_article_tag_info',
					data: {
						id: id,
						isDelete: isDelete
					}
				})
				.done(function(response) {
					if (response.res == 0) {
						$.toast({
							icon: 'success',
							text: '操作成功'
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
		getData: function(params) {
			return System.request({
					type: 'GET',
					url: 'manage/get_article_tag_list',
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
		operateFormatter: function(value, row, index) {
			return [
				'<a href="/pages/article-tags-edit.html?id=' + row.id + '">编辑</a>',
				'<a href="javascript:void(0)" data-action="operate" data-id="' + row.id + '" data-delete="' + row.is_delete.data[0] + '">' + (row.is_delete.data[0] == 1 ? '显示' : '隐藏') + '</a>',
				'<a href="javascript:void(0)" data-action="delete" data-id="' + row.id + '">删除</a>'
			].join('&nbsp;');
		},
		showFormatter: function(value, row, index) {
			return ['显示', '隐藏'][row.is_delete.data[0]];
		},
	};

	page.init();
	window.getData = page.getData;
	window.operateFormatter = page.operateFormatter;
	window.showFormatter = page.showFormatter;
});