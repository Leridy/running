$(function() {
    var auth = $.parseJSON(System.localStorage.get('auth'));
    if( auth ) {
        if( auth.status == 1 ) {
            System.request({
                type: 'GET',
                url: 'user/info',
                async: true,
                data: {id: auth.uid}
            })
            .done(function(response) {
                if( response.ret == 0 ) {
                    var user = response.data;
                    $('#userInfo').show().find('[node-type="nick"]').text(user.nick);
                    System.localStorage.set('user', user);
                    $('#wrapper').removeClass('blur');
                } else {
                    System.localStorage.del('auth');
                    System.localStorage.del('user');
                    System.redirect('/login.html');
                }
            });
        } else {
            System.redirect('/merchant-post.html');
        }
    } else {
        System.redirect('/login.html');
    }
});

$(function() {

    $('#side-menu').on('click', '>li>a', function(e) {
        var self = $(this);
        e.preventDefault();
        self.parent().toggleClass('active');
        self.next().toggleClass('collapsing').stop().toggle(0, function() {
            $(this).toggleClass('collapsing in');
        });
    });

    $('#logout').on('click', function(e) {
        e.preventDefault();

        System.localStorage.del('auth');
        System.redirect('/login.html');
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
});
