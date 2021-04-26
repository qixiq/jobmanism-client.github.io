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

function isStringAndEmpty(val) {
    return val == null || val === "";
}

function getResourceUrl(id) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var sessionId = urlParams.get('sessionId');
    return host + '/getresource?id=' + id + '&sessionId=' + sessionId;
}

function deleteUserAddress(addressId, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        addressesToDelete: [parseInt(addressId)]

    };
    sendJsonPostRequest(data, '/deleteUserAddresses', onSuccess, onError);
}

function addUserAddress(address, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        addresses: [address]

    };
    sendJsonPostRequest(data, '/addUserAddresses', onSuccess, onError);
}

function getUserAddresses(onSuccess, onError) {
    sendGetRequest('/getUserAddresses?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function setUserPrimaryAddress(addressId, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        addressId:  parseInt(addressId)

    };
    sendJsonPostRequest(data, '/makeUserAddressPrimary', onSuccess, onError);
}

function deleteUserPhoneNumber(phoneNumberId, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        phoneNumbersToDelete: [parseInt(phoneNumberId)]

    };
    sendJsonPostRequest(data, '/deleteUserPhoneNumbers', onSuccess, onError);
}

function addUserPhoneNumber(phoneNumber, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        phoneNumbers: [phoneNumber]

    };
    sendJsonPostRequest(data, '/addUserPhoneNumbers', onSuccess, onError);
}

function getUserPhoneNumbers(onSuccess, onError) {
    sendGetRequest('/getUserPhoneNumbers?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function setUserPrimaryPhoneNumber(phoneNumberId, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        phoneNumberId: parseInt(phoneNumberId)

    };
    sendJsonPostRequest(data, '/makeUserPhoneNumberPrimary', onSuccess, onError);
}

function getPathPrefix(current) { 
    var n = current.lastIndexOf('/'); 
    return current.substring(0, n);
}

function getQueryParameter(variableName) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    return urlParams.get(variableName);
}

function updateUserNames(firstName, middleNames, lastName, onSuccess, onError) {
    var data =
    {
        userNames: { firstName: firstName, middleNames: middleNames, lastName: lastName },
        sessionId : getQueryParameter('sessionId')
    } 
    sendJsonPostRequest(data, '/updateNamesForProfile', onSuccess, onError);
}

function getUserProfile(onSuccess, onError) { 
    sendGetRequest('/getUserProfile?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}
function login(user, pwd, onSuccess, onError) {
    var data = { userName: user, password : pwd};
    sendJsonPostRequest(data, '/login', onSuccess, onError);
}

function beginSignupWithEmail(user, pwd, email, onSuccess, onError) {

    var data = { userName: user, password: pwd, emailAddress: email, completionlinkPrefix: getPathPrefix(document.location.href) + '/completesignup.html' };
    sendJsonPostRequest(data, '/beginsignupwithemailcompletion', onSuccess, onError);
}

function completeSignup(user, pwd,  onSuccess, onError) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var token = urlParams.get('token'); 
    var data = { userName: user, password: pwd, token: token };
    sendJsonPostRequest(data, '/completesignup', onSuccess, onError);
}
