var host = 'https://obatalademo.azurewebsites.net';
function sendJsonPostRequest(body, path, onSuccess, onError) {
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

function sendFormDataPostRequest(body, path, onSuccess, onError) {
    fetch(host + path, {
        method: 'POST', 
        body: body,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            onSuccess(data);
        })
        .catch((error) => {
            console.log(error);
            onError(error);
        });
}

function sendGetRequest(path, onSuccess, onError) {
    fetch(host + path, {
        method: 'GET' 
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            onSuccess(data);
        })
        .catch((error) => {
            console.log(error);
            onError(error);
        });
}

function getResourceUrl(id) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var sessionId = urlParams.get('sessionId');
    return host + '/getresource?id=' + id + '&sessionId=' + sessionId;
}

function deleteUserAddress(addressId, onSuccess, onError) {

}

function addUserAddress(data, onSuccess, onError) {

}

function getUserAddresses(onSuccess, onError) {

}

function setUserPrimaryAddress(addressId, onSuccess, onError) {

}

function updateUserProfile(formData, onSuccess, onError) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var sessionId = urlParams.get('sessionId');
    formData.append('sessionId', sessionId );
    sendFormDataPostRequest(formData, '/updateUserProfile', onSuccess, onError);
}

function getUserProfile(onSuccess, onError) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var sessionId = urlParams.get('sessionId');
    sendGetRequest('/getUserProfile?sessionId=' + sessionId, onSuccess, onError);
}
function login(user, pwd, onSuccess, onError) {
    var data = { userName: user, password : pwd};
    sendJsonPostRequest(data, '/login', onSuccess, onError);
}

function beginSignupWithEmail(user, pwd, email, onSuccess, onError) {
    var path = document.location.href; 
    var n = path.lastIndexOf('/'); 
    var prefix = path.substring(0, n);
    var data = {userName : user, password : pwd, emailAddress : email, completionlinkPrefix : prefix + '/completesignup.html' };
    sendJsonPostRequest(data, '/beginsignupwithemailcompletion', onSuccess, onError);
}

function completeSignup(user, pwd,  onSuccess, onError) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var token = urlParams.get('token'); 
    var data = { userName: user, password: pwd, token: token };
    sendJsonPostRequest(data, '/completesignup', onSuccess, onError);
}
