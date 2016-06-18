define(['knockout', 'underscore'], function(ko, _) {
    function MapMarker(post, marker) {
        var mm = this;

        mm.baseId = post.id;
        mm.latitude = post.latitude;
        mm.longitude = post.longitude;
        mm.postMap = {};
        mm.postMap[post.id()] = post;

        mm.marker = marker;
        mm.weightedLocation = {
            location: mm.marker.getPosition(),
            weight: mm.postMap.length
        };

        mm.addPost = function(post) {

            mm.postMap[post.id()] = post;
        };

        mm.buildContentForInfoWindow = function() {
            var markupStr = '<div id="infoWindowBox">';
            var postCount = _.keys(mm.postMap).length;
            if (postCount > 1) {
                markupStr = markupStr + '<div id="infoWindowTitle">(' + postCount + ') posts near this location</div>';
            }
            _.each(_.keys(mm.postMap), function(key, index) {
                var postDate = mm.postMap[key].humanFriendlyTime();
                var postTitle = mm.postMap[key].postTitle;
                markupStr = markupStr + '<div class="postInfoLine link" onclick="$.sc.bindPost(' + key + ')"><span>'
                + postDate + '</span> - <span class="infoWindowPostCaption">' + postTitle + '</span></div>';

            });
            return markupStr + '</div>';
        };

        mm.postCount = ko.computed(function() {
            return _.keys(mm.postMap).length;
        });
    }

    return MapMarker;
});
