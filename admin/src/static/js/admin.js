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