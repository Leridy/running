$(function() {
    var auth = $.parseJSON(System.localStorage.get('auth'));
    if (auth) {
        System.request({
                type: 'GET',
                async: true,
                url: 'manage/get_manager_info'
            })
            .done(function(response) {
                if (response.res == 0) {
                    var user = response.data[0];                    
                    $('#userInfo').show().find('[node-type="nick"]').text(user.name);
                    System.localStorage.set('user', user);
                    $('#wrapper').removeClass('blur');
                } else {
                    System.localStorage.del('auth');
                    System.localStorage.del('user');
                    System.redirect('/login.html');
                }
            });
    } else {
        System.redirect('/login.html');
    }
});

$(function() {

    var menuList = $('#menuList');

    $('#menuTabs').on('click', '[data-tab]', function(e) {
        e.preventDefault();
        var self = $(this),
            tab = self.attr('data-tab');

        self.addClass('active').parent().siblings().find('.active').removeClass('active');
        menuList.children('[data-tab=' + tab + ']').show().siblings().hide();
    });

    menuList.on('click', '[data-tab]>li>a', function(e) {
        var self = $(this);
        e.preventDefault();
        self.parent().toggleClass('active');
        self.next().toggleClass('collapsing').stop().toggle(0, function() {
            $(this).toggleClass('collapsing in');
        });
    });

    $('#logout').on('click', function(e) {
        e.preventDefault();
        System.request({
            type: 'post',
            url: 'manage/logout'
        }).done(function() {
            System.localStorage.del('auth');
            bootbox.alert('退出成功', function() {
                System.redirect('/login.html');
            });
        });
    });

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-content").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }

    $('#wrapper').removeClass('blur');
});