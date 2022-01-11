//// VK open API

console.log('VK ', VK);

let userId;

VK.init({ apiId: 8042738 });

const authBtn = document.getElementById('auth');
const getPostsBtn = document.getElementById('gPosts');
const searchRepostBtn = document.getElementById('sRepost');

authBtn.addEventListener('click', function () {
    VK.Auth.login(function(response) {
        console.log('response ', response);
        userId = response.session.user.id;
    }, 270338);
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

//// Facebook JS SDK

let facebookUserId;
let facebookAccessToken;

window.fbAsyncInit = function() {
    FB.init({
        //appId            : 600483301017617,
        appId            : 629658518237499,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v12.0'
    });

    //FB.AppEvents.logPageView();
};

console.log('FB ', FB);

const faceAuthBtn = document.getElementById('faceAuth');
const getFacebookPostsBtn = document.getElementById('getFacebookPosts');
const facebookSearchRepostBtn = document.getElementById('facebookSearchRepost');

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
    }, {scope: 'user_posts,email,public_profile'});
});

getFacebookPostsBtn.addEventListener('click', function () {
    FB.api(`/me/posts`, {access_token : facebookAccessToken}, function(response) {
        console.log('getFacebookPostsBtn response ', response);
    });
    // FB.api(`${facebookUserId}/posts`, {access_token : facebookAccessToken}, function(response) {
    //     console.log('getFacebookPostsBtn response ', response);
    // });
});

facebookSearchRepostBtn.addEventListener('click', function () {
    const postId = document.getElementById('facebookPostId').value;
    FB.api(`${postId}/sharedposts`, {access_token : facebookAccessToken}, function(response) {
        console.log('facebookSearchRepostBtn response ', response);
    });
});
