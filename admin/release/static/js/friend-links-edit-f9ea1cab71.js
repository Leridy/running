$(function(){var t={form:$("#form")},e={id:System.getParam("id")||0,formData:{cover:""}},i={init:function(){e.id?($("#title").html("修改友情链接"),this.getData(e.id).done(function(n){0==n.res&&(e.formData=$.extend(e.formData,n.data[0]),e.formData.is_delete=e.formData.is_delete.data[0],t.form.html(System.template("appTpl",{info:e.formData})),i.bindEvents())})):(t.form.html(System.template("appTpl",{info:{is_delete:0}})),this.bindEvents(),$("#title").html("新增友情链接"))},initNodes:function(){$.extend(t,{wrapper:$("#wrapper"),submit:$("#submit")})},bindEvents:function(){this.initNodes(),t.form.on("submit",this.handleSubmit)},handleSubmit:function(i){i.preventDefault();var n=t.form.serializeObject();return n.id=e.id,n.name?n.link_url?(t.submit.prop("disabled",!0),System.request({type:"POST",url:"manage/edit_link",data:n}).done(function(t){0==t.res?($.toast({icon:"success",text:n.id?"恭喜您修改成功":"恭喜您发布成功"}),setTimeout(function(){System.redirect("/pages/friend-links-list.html")},800)):$.toast({icon:"error",text:t.msg})}).fail(function(){$.toast({icon:"error",text:"网络错误"})}).always(function(){t.submit.prop("disabled",!1)})):void $.toast({icon:"error",text:"请输入友链地址"}):void $.toast({icon:"error",text:"请输入友链名称"})},getData:function(t){return System.request({type:"get",url:"manage/get_links_detail",data:{id:t}}).done(function(t){0!=t.res&&$.toast({icon:"error",text:t.msg})}).fail(function(){$.toast({icon:"error",text:"网络错误"})})}};i.init()});