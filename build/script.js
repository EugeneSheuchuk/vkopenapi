//// VK open API

console.log('VK ', VK);

let userId;

VK.init({ apiId: 8042738 });

const authBtn = document.getElementById('auth');
const getPostsBtn = document.getElementById('gPosts');
const searchRepostBtn = document.getElementById('sRepost');
const getURLPostBtn = document.getElementById('urlPost');

authBtn.addEventListener('click', function () {
    VK.Auth.login(function(response) {
        console.log('response ', response);
        userId = response.session.user.id;
    }, 270354); // friends(2), video(16), wall(8192), groups(262144)
});


getPostsBtn.addEventListener('click', function() {
    console.log('Get Posts ');
    VK.Api.call('wall.get', { owner_id: userId, v:"5.131" }, function(r) {
        console.log('R', r);
    });
});

searchRepostBtn.addEventListener('click', function() {
    console.log('Get Reposts ');
    const postId = +document.getElementById('postId').value;
    console.log('postId ', postId);
    VK.Api.call('wall.getReposts', { owner_id: userId, v:"5.131", post_id: postId }, function(r) {
        console.log('R', r);
    });
});

getURLPostBtn.addEventListener('click', function() {
    console.log('Get Posts ');
    const link = document.getElementById('postURL').value;
    const postId = link.slice(link.indexOf('wall') + 4);
    console.log('postId ', postId);
    VK.Api.call('wall.getById', { posts: postId, v:"5.131" }, function(res) {
        console.log('Response ', res);
        const videoData = res?.response[0]?.attachments[0]?.video;
        console.log('videoData ', videoData);
        VK.Api.call('video.get', { videos: `${videoData.owner_id}_${videoData.id}`, v:"5.131" }, function(videoRes) {
            console.log('videoRes ', videoRes);
        });
    });
});

//// Facebook JS SDK

let facebookUserId;
let facebookAccessToken;

// window.fbAsyncInit = function() {
//     console.log('FB ', FB);
//     FB.init({
//         //appId            : 600483301017617,
//         appId            : 629658518237499,
//         autoLogAppEvents : true,
//         xfbml            : true,
//         version          : 'v12.0'
//     }, function (resp) {
//         console.log('resp ', resp);
//     });
//
//     //FB.AppEvents.logPageView();
// };

console.log('FB ', FB);
FB.init({
    //appId            : 600483301017617,
    appId            : 629658518237499,
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v12.0'
}, function (resp) {
    console.log('resp ', resp);
});

const faceAuthBtn = document.getElementById('faceAuth');
// const getFacebookPostsBtn = document.getElementById('getFacebookPosts');
// const getFacebookPermissionsBtn = document.getElementById('getFacebookPermissions');
// const facebookSearchRepostBtn = document.getElementById('facebookSearchRepost');
const facebookSearchPostBtn = document.getElementById('facebookSearchPost');

faceAuthBtn.addEventListener('click', function () {
    FB.login(function(response) {
        console.log('Facebook response ', response);
        if (response.authResponse) {
            console.log('Facebook response.authResponse ', response.authResponse);
            facebookUserId = response.authResponse.userID;
            facebookAccessToken = response.authResponse.accessToken;
            console.log('facebookUserId ', facebookUserId);
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'user_posts,public_profile', return_scopes: true});

});

// getFacebookPermissionsBtn.addEventListener('click', function () {
//     FB.api(`${facebookUserId}/permissions`, {access_token : facebookAccessToken}, function(response) {
//         console.log('getFacebookPermissionsBtn response ', response);
//     });
// });
//
// getFacebookPostsBtn.addEventListener('click', function () {
//     FB.api(`${facebookUserId}/posts`, {access_token : facebookAccessToken}, function(response) {
//         console.log('getFacebookPostsBtn response ', response);
//     });
//     // FB.api(`${facebookUserId}/posts`, {access_token : facebookAccessToken}, function(response) {
//     //     console.log('getFacebookPostsBtn response ', response);
//     // });
// });
//
// facebookSearchRepostBtn.addEventListener('click', function () {
//     const postId = document.getElementById('facebookPostId').value;
//     FB.api(`${postId}/sharedposts`, {access_token : facebookAccessToken}, function(response) {
//         console.log('facebookSearchRepostBtn response ', response);
//     });
// });

facebookSearchPostBtn.addEventListener('click', function () {
    const postId = document.getElementById('facebookIdPost').value;
    FB.api(`${postId}`, {access_token : facebookAccessToken}, function(response) {
        console.log('postInfo response ', response);
    });
});


//// Ok JS SDK

console.log('OKSDK ', OKSDK);

const okAuthBtn = document.getElementById('okAuth');

okAuthBtn.addEventListener('click', function() {
    const config = {
        app_id: 512000980948, // id ????????????????????
        app_key: 'CFNIPDKGDIHBABABA' // ?????????????????? ???????? ????????????????????
    };
    OKSDK.init(config, function() {
        console.log('Success');
        // OKSDK.REST.call(
        //     "mediatopic.getByIds",
        //     {
        //                 "topic_ids": "154288026513516",
        //                 "fields": "video.OWNER_ID,attachment_movie.AUTHOR_REF,media_topic.MEDIA_URL,attachment_movie.URL,attachment_movie.HD_NO_CROP_THUMBNAIL_URL,attachment_movie.THUMBNAIL_URL,attachment_movie.SMALL_THUMBNAIL_URL,attachment_movie.URL_PROVIDER,media_topic.MEDIA_URL,media_topic.MEDIA,video.URL"
        //             },
        //     function (status, data, error) {
        //         console.log('status ', status);
        //         console.log('data ', data);
        //         console.log('error ', error);
        //     }
        // );


        OKSDK.REST.call(
            "url.getInfo",
            {
                        "url": "https://ok.ru/profile/68282463084/statuses/154288026513516",
                    },
            function (status, data, error) {
                console.log('status ', status);
                console.log('data ', data);
                console.log('error ', error);
            }
        );
    }, function() {
        console.log('Error')
    });
});

