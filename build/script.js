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
    VK.Api.call('wall.getReposts', { owner_id: userId, v:"5.131", getReposts: postId }, function(r) {
        console.log('R', r);
    });
});