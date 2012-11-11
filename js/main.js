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

$(function() {
    var url = 'http://www.maipersonalmood.com';

    $.twitter.nshares(url).then(function(data) {
        var elem = $('#twitter-shares');
        elem.html(data);
        elem.attr('title', 'This page has been shared ' + data + ' times. View these Tweets.');
    });

    $.facebook.nshares(url).then(function(data) {
        $('#facebook-shares').html(data);
    });

});
