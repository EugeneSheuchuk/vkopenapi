console.log('VK ', VK);

let userId;

VK.init({ apiId: 8042738 });

const authBtn = document.getElementById('auth');
const getPostsBtn = document.getElementById('gPosts');

authBtn.addEventListener('click', function () {
    VK.Auth.login(function(response) {
        console.log('response ', response);
        userId = response.user.id;
    }, 270338);
});

getPostsBtn.addEventListener('click', function() {
    VK.Api.call('wall.get', { owner_id: userId, v:"5.73" }, function(r) {
        console.log('R', r);
    });
});