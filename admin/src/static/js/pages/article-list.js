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
				table: $('#table'),
				search:("#search")
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
			nodes.search.on('submit',this.handleSearch);
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
					type: 'get',
					url: 'manage/delete_article',
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
		handleSearch:function(event) {
			event.preventDefault();
		},
		getData: function(params) {
			return System.request({
					type: 'GET',
					url: 'manage/get_article_list',
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
				'<a href="/pages/article-edit.html?id=' + row.id + '">编辑</a>',
				'<a href="javascript:void(0)" data-action="delete" data-id="' + row.id + '">删除</a>'
			].join('&nbsp;');
		},
		timeFormatter: function(value, row, index) {
			return new Date(row.create_time * 1000).format('Y年M月d日 H:m:s');
		},
	};

	page.init();
	window.getData = page.getData;
	window.operateFormatter = page.operateFormatter;
	window.timeFormatter = page.timeFormatter;
});