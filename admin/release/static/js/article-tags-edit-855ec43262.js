$(function(){var t={form:$("#form")},e={id:System.getParam("id")||0,formData:{cover:""}},i={init:function(){e.id?($("#title").html("修改文章标签"),this.getData(e.id).done(function(a){0==a.res&&(e.formData=$.extend(e.formData,a.data[0]),e.formData.is_delete=e.formData.is_delete[0],t.form.html(System.template("appTpl",{info:e.formData})),i.bindEvents())})):(t.form.html(System.template("appTpl",{info:{is_delete:0}})),this.bindEvents(),$("#title").html("新增文章标签"))},initNodes:function(){$.extend(t,{wrapper:$("#wrapper"),submit:$("#submit")})},bindEvents:function(){this.initNodes(),t.form.on("submit",this.handleSubmit)},handleSubmit:function(i){i.preventDefault();var a=t.form.serializeObject();return a.id=e.id,a.tag_name?(t.submit.prop("disabled",!0),System.request({type:"POST",url:"manage/edit_article_tag",data:a}).done(function(t){0==t.res?($.toast({icon:"success",text:a.id?"恭喜您修改成功":"恭喜您发布成功"}),setTimeout(function(){System.redirect("/pages/article-tags-list.html")},800)):$.toast({icon:"error",text:t.msg})}).fail(function(){$.toast({icon:"error",text:"网络错误"})}).always(function(){t.submit.prop("disabled",!1)})):void $.toast({icon:"error",text:"请输入标签名称"})},getData:function(t){return System.request({type:"get",url:"manage/get_article_tag_detail",data:{id:t}}).done(function(t){0!=t.res&&$.toast({icon:"error",text:t.msg})}).fail(function(){$.toast({icon:"error",text:"网络错误"})})}};i.init()});