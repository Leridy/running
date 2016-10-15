$(function() {
    var auth = $.parseJSON(System.localStorage.get('auth'));
    if (auth) {
        System.request({
                type: 'GET',
                async: true,
                url: 'manage/manager/getMangerInfo'
            })
            .done(function(response) {                
                if (response.ret == 0) {
                    return;
                    var user = response.data;
                    var role = !user.role ? '' : '(' + user.role + ')';
                    $('#userInfo').show().find('[node-type="nick"]').text(user.admin + role);
                    System.localStorage.set('user', user);

                    var menu = $('#side-menu'),
                        item;
                    for (var i in user.show) {
                        item = menu.find('[data-id="' + i + '"]').show();

                        for (var c = 0, len = user.show[i].length; c < len; c++) {
                            item.find('[data-sub-id="' + user.show[i][c] + '"]').show();
                        }
                    }

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
            type: 'GET',
            url: 'manage/manager/logout'         
        }).done(function() {
            System.localStorage.del('auth');
            alert('退出成功');
            System.redirect('/login.html');
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