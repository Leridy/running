$(function(){var t={form:$("#form")},e={id:System.getParam("id")||0,formData:{id:0,photo:"",is_admin:1},filters:{picture:[{title:"jpg files",extensions:"jpg"},{title:"jpg files",extensions:"jpeg"},{title:"jpg files",extensions:"png"}]}},o={init:function(){e.id?(this.getUserData(e.id).done(function(r){0==r.res&&(e.formData=$.extend(e.formData,r.data[0]),e.formData.is_admin=e.formData.is_admin.data[0],t.form.html(System.template("appTpl",{info:e.formData})),o.initNodes(),o.bindEvents())}),$("#title").html("修改用户")):(t.form.html(System.template("appTpl",{info:e.formData})),$("#title").html("添加用户"),this.initNodes(),this.bindEvents())},initNodes:function(){$.extend(t,{wrapper:$("#wrapper"),submit:$("#submit"),prviewImg:$("#prview-img"),modalImgCropper:$("#modal-img-cropper"),CropperImg:$("#cropper-img"),showPickfileBtn:$('[data-action="showpickfile"]'),modalReplySure:$("#modal-reply-sure"),modalSetSize:$("#modal-set-size"),$dataX:$("#dataX"),$dataY:$("#dataY"),$dataHeight:$("#dataHeight"),$dataWidth:$("#dataWidth"),modalJustUpload:$("#modal-just-upload")})},handleCropperImgLoad:function(){t.CropperImg.cropper({aspectRatio:1,data:{x:420,y:50,width:640,height:360},preview:".preview",done:function(e){t.$dataX.val(e.x),t.$dataY.val(e.y),t.$dataHeight.val(e.height),t.$dataWidth.val(e.width)},build:function(t){},built:function(t){},dragstart:function(t){},dragmove:function(t){},dragend:function(t){}})},initData:function(){$.parseJSON(System.localStorage.get("auth"))},bindEvents:function(){this.formUpload(),t.showPickfileBtn.on("click",this.handleShowPickFile),t.modalReplySure.on("click",this.handleReplySure),t.submit.on("click",this.handleSubmitForm),t.CropperImg.on("load",this.handleCropperImgLoad),t.modalJustUpload.on("clck",this.handleJustUpload)},getUserData:function(t){return System.request({type:"get",url:"manage/get_user",data:{id:t}}).done(function(t){0!=t.res&&$.toast({icon:"error",text:t.msg})}).fail(function(){$.toast({icon:"error",text:"网络错误"})})},handleSubmitForm:function(o){o.preventDefault();var r=$.extend(e.formData,t.form.serializeObject());if(r.id=e.id,!r.name)return void $.toast({icon:"error",text:"请输入昵称"});if(!r.photo)return void $.toast({icon:"error",text:"请上传头像"});if(0==r.id||r.pwd1||r.pwd){if(!r.pwd1)return void $.toast({icon:"error",text:"请输入密码"});if(!r.pwd)return void $.toast({icon:"error",text:"请输入确认密码"});if(r.pwd1!=r.pwd)return void $.toast({icon:"error",text:"两次密码输入不一致"});r.pwd1=md5(r.pwd1),r.pwd=md5(r.pwd)}return r.login_name?(r.pwd1||delete r.pwd1,r.pwd||delete r.pwd,t.submit.prop("disabled",!0),System.request({type:"POST",url:"manage/edit_user",data:r}).done(function(t){0==t.res?($.toast({icon:"success",text:r.id?"恭喜您修改成功":"恭喜您发布成功"}),setTimeout(function(){System.redirect("/pages/user-list.html")},800)):$.toast({icon:"error",text:t.msg})}).fail(function(){$.toast({icon:"error",text:"网络错误"})}).always(function(){t.submit.prop("disabled",!1)})):void $.toast({icon:"error",text:"请输入登录名"})},handleReplySure:function(){var o=t.CropperImg.cropper("getData",!0),r=e.formData.photo;o.width&&e.formData.photo&&(r.indexOf("?imageMogr2")==-1?r+="?imageMogr2/crop/!%sx%sa%sa%s".printf(o.width,o.height,o.x,o.y):(r=r.substring(0,r.indexOf("?")),r+="?imageMogr2/crop/!%sx%sa%sa%s".printf(o.width,o.height,o.x,o.y))),e.formData.photo=r,t.prviewImg.attr("src",r),t.modalImgCropper.modal("hide")},handleJustUpload:function(){var o=t.CropperImg.cropper("getData",!0);e.formData.photo=o,t.prviewImg.attr("src",o),t.modalImgCropper.modal("hide")},handleShowPickFile:function(e){e.preventDefault(),t.modalImgCropper.modal("show")},formUpload:function(){var o=null,r=Qiniu.uploader({runtimes:"html5,flash,html4",browse_button:"upload-photo",uptoken_func:function(t){var e=null;return System.request({type:"GET",async:!1,data:{},url:"utils/get_upload_token"}).done(function(t){e=t.data}),e},filters:e.filters.picture,get_new_uptoken:!0,domain:"<Your bucket domain>",container:"container",max_file_size:"100mb",flash_swf_url:"/static/bower_components/plupload/js/Moxie.swf",max_retries:0,dragdrop:!0,drop_element:"container",auto_start:!0,multi_selection:!0,init:{FilesAdded:function(t,e){plupload.each(e,function(t){})},BeforeUpload:function(t,e){var r=t.getOption("browse_button")[0];r.disabled=!0,o||(o=r.innerHTML)},UploadProgress:function(t,e){var o=t.getOption("browse_button")[0];o.innerHTML="已上传%s%".printf(e.percent)},FileUploaded:function(r,i,a){var n=$.parseJSON(a);btn=r.getOption("browse_button")[0],t.CropperImg.attr("src")&&t.CropperImg.cropper("destroy"),t.CropperImg.attr("src",n.url),e.formData.photo=n.url,btn.innerHTML=o,btn.disabled=!1},Error:function(t,e,r){var i=$.parseJSON(e.response),a=t.getOption("browse_button")[0];$.toast({icon:"error",text:i.error}),a.disabled=!1,a.innerHTML=o},UploadComplete:function(){},Key:function(t,e){var o=void 0;return o}}});e.uploader=r}};o.init()});