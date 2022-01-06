console.log('VK ', VK);

VK.init({ apiId: 8042738 });

const authBtn = document.getElementById('auth');
authBtn.addEventListener('click', function () {
    VK.Auth.login(function(response) {
        console.log('response ', response);
    }, 270338);
});