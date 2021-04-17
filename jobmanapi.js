var host = 'https://obatalademo.azurewebsites.net';
function sendPostRequest(body, path, onSuccess, onError) {
    fetch(host + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
           onSuccess( data);
        })
        .catch((error) => {
            console.log(error);
           onError(error);
        });
}
function login(user, pwd, onSuccess, onError) {
    var data = { userName: user, password : pwd};
    sendPostRequest(data, '/login', onSuccess, onError);
}

function beginSignupWithEmail(user, pwd, email, onSuccess, onError) {
    var path = document.location.href; 
    var n = path.lastIndexOf('/'); 
    var prefix = path.substring(0, n);
    var data = {userName : user, password : pwd, emailAddress : email, completionlinkPrefix : prefix + '/completesignup.html' };
    sendPostRequest(data, '/beginsignupwithemailcompletion', onSuccess, onError);
}

function completeSignup(user, pwd,  onSuccess, onError) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(queryString);
    var token = urlParams.get('token'); 
    var data = { userName: user, password: pwd, token: token };
    sendPostRequest(data, '/completesignup', onSuccess, onError);
}
