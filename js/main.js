$.twitter = {
    nshares: function(url) {
        var deferred = $.Deferred();
        $.ajax({
            url: 'http://urls.api.twitter.com/1/urls/count.json',
            data: { url: url },
            dataType: 'jsonp',
            success: function(data) {
                deferred.resolve(data.count);
            }
        });
        return deferred.promise();
    },
    // FIXME: bug
    nfollowers: function(account_name) {
        var deferred = $.Deferred();
        $.ajax({
            url: 'http://api.twitter.com/1/users/show.json',
            data: { screen_name: account_name },
            dataType: 'jsonp',
            success: function(data) {
                deferred.resolve(data.followers_count);
            }
        });
        return deferred.promise();
    },
    search: function(query) {
        var deferred = $.Deferred();
        $.ajax({
         url: 'http://search.twitter.com/search.json',
         data: { q: query },
         dataType: 'jsonp',
         success: deferred.resolve
        });
        return deferred.promise();
    }
};

$.facebook = {
    nshares: function(url) {
        var deferred = $.Deferred();
        var url = encodeURIComponent(url);
        $.ajax({
            url: 'http://graph.facebook.com/' + url,
            dataType: 'jsonp',
            success: function(data) {
                deferred.resolve(data.shares);
            }
        });
        return deferred.promise();
    }
};

$.wait = function(time) {
    return $.Deferred(function(dfd) {
        setTimeout(dfd.resolve, time);
    });
}

// $.lightmenu = {
//     init: function(id_name, default_opt) {
//         var btns = $('#' + id_name + ' > .btn');
//         var num_opts = btns.length;
//         default_opt = typeof default_opt !== 'undefined' ? default_opt : 1;
//         default_opt = default_opt > num_opts ? 1 : default_opt;
//         btns.each(function(k, v) {
//             $(v).click($.lightmenu.toggle);
//         });
//         // TODO: chiamare in toggle!
//         $(btns[default_opt - 1]).addClass('active');
//         $(btns[default_opt - 1]).addClass('disabled'); // TODO: disabilitare evento click (oltre alla classe che può anche essere rimossa)
//     },
//     toggle: function(evt) {
//         console.log(evt);
//         console.log('toggle called!');
//     }
// };

$(function() {
    // $.lightmenu.init('light-menu', 1);
    
    var url = 'http://www.maipersonalmood.com';

    $.twitter.nshares(url).then(function(data) {
        var elem = $('#twitter-shares');
        elem.html(data);
        elem.attr('title', 'This page has been shared ' + data + ' times. View these Tweets.');
    });

    $.facebook.nshares(url).then(function(data) {
        $('#facebook-shares').html(data);
    });

    var buttons = $('#buttons > span').children().tooltip({
        placement: 'top'
    });


});

