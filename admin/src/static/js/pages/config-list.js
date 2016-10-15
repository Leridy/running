$(function() {

	var nodes = {};

	var data = {};

	var page = {
		init: function() {
			this.initNodes();
			this.initData();
			nodes.table.on('click', '[node-type="delete"]', this.handleDelete);
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
		handleDelete: function() {
			var self = $(this),
				id = self.attr('data-id');
			bootbox.confirm("确认删除吗?", function(result) {
				if (result) {
					System.request({
							type: 'POST',
							url: 'manage/config/deleteConfig',
							data: {
								configId: id
							}
						})
						.done(function(response) {							
							if (response.ret == 0) {
								location.reload();
							} else {
								$.toast({
									icon: 'error',
									text: response.msg
								});
							}
						});
				}
			});

		},
		getData: function(params) {
			return System.request({
					type: 'GET',
					url: 'manage/config/getConfiglist',
					data: $.extend(data.filter, {
						offset: params.data.offset,
						limit: params.data.limit
					})
				})
				.done(function(response) {
					if (response.ret == 0) {
						var list = {
							rows: response.data.configList.data,
							total: response.data.configList.total
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
			return '<button type="button" class="btn btn-danger" node-type="delete" data-id="' + row.configId + '">删除</button>';
		},
		typeFormatter: function(value, row, index) {
			return ['', 'int', 'text', 'json'][row.type];
		}
	};

	page.init();
	window.getData = page.getData;
	window.operateFormatter = page.operateFormatter;
	window.typeFormatter = page.typeFormatter;
});