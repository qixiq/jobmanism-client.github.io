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


function deleteUserResource(resourceId, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        resourcesToDelete: [parseInt(resourceId)]

    };
    sendJsonPostRequest(data, '/deleteUserResources', onSuccess, onError);
}

function addUserResources(formData, onSuccess, onError) {
    sendFormDataPostRequest(formData, '/addUserResources', onSuccess, onError);
}

function getUserResources(mimeType, onSuccess, onError) {
    sendGetRequest('/getUserResources?sessionId=' + getQueryParameter('sessionId') + '&mimeType=' + mimeType, onSuccess, onError);
}

function setUserPrimaryPicture(pictureId, onSuccess, onError) {
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        pictureId: parseInt(pictureId)

    };
    sendJsonPostRequest(data, '/makeUserPicturePrimary', onSuccess, onError);
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

function teleSchoolsBeginSignupWithEmail(user, pwd, email, onSuccess, onError) {

    var data = { userName: user, password: pwd, project: 'TeleSchools', emailAddress: email, completionlinkPrefix: getPathPrefix(document.location.href) + '/teleschools-completesignup.html' };
    sendJsonPostRequest(data, '/beginsignupwithemailcompletion', onSuccess, onError);
}

function yakoyoBeginSignupWithEmail(user, pwd, email, onSuccess, onError) {

    var data = { userName: user, password: pwd, project: 'Yakoyo', emailAddress: email, completionlinkPrefix: getPathPrefix(document.location.href) + '/yakoyo-completesignup.html' };
    sendJsonPostRequest(data, '/beginsignupwithemailcompletion', onSuccess, onError);
}

function jobManismBeginSignupWithEmail(user, pwd, email,  onSuccess, onError) {

    var data = { userName: user, password: pwd, emailAddress: email, project : 'JobManism',  completionlinkPrefix: getPathPrefix(document.location.href) + '/completesignup.html' };
    sendJsonPostRequest(data, '/beginsignupwithemailcompletion', onSuccess, onError);
}

function completeSignup(user, pwd,  onSuccess, onError) {
    var query = document.location.search;
    const urlParams = new URLSearchParams(query);
    var token = urlParams.get('token'); 
    var data = { userName: user, password: pwd, token: token };
    sendJsonPostRequest(data, '/completesignup', onSuccess, onError);
}

function addServiceCategory(formData, onSuccess, onError) {
    sendFormDataPostRequest(formData, '/addServiceCategory', onSuccess, onError);
}

function getAdminViewOfServiceCategories(onSuccess, onError) {

    sendGetRequest('/getAdminViewOfServiceCategories?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}


function getUserServiceCategories(onSuccess, onError) {

    sendGetRequest('/getUserServiceCategories?sessionId=' + getQueryParameter('sessionId')  , onSuccess, onError);
}

 

function registerForServiceCategory(sessionId, id, onSuccess, onError)
{
    var data =
    {
        sessionId: sessionId,
        serviceCategoryIds: [parseInt(id)]

    };
    sendJsonPostRequest(data, '/registerForServiceCategories', onSuccess, onError);
}

function unregisterFromServiceCategory(sessionId, id, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        ServicesToUnregisterFrom: [parseInt(id)]

    };
    sendJsonPostRequest(data, '/unregisterFromServiceCategory', onSuccess, onError);
}

function removeServiceCategory(sessionId, svcId, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        serviceIdsToDelete: [parseInt(svcId)]

    };
    sendJsonPostRequest(data, '/deleteServiceCategory', onSuccess, onError);
}



function publishServiceCategory(sessionId, svcId, onSuccess, onError ){
    var data =
    {
        sessionId: sessionId,
        serviceCategoryId: parseInt(svcId),
        published : 1

    };
    sendJsonPostRequest(data, '/updateServiceCategoryPublishStatus', onSuccess, onError);
}

function unPublishServiceCategory(sessionId, svcId, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        serviceCategoryId: parseInt(svcId),
        published: 0

    };
    sendJsonPostRequest(data, '/updateServiceCategoryPublishStatus', onSuccess, onError);
}

function getEvidenceTypes(onSuccess, onError) {
    sendGetRequest('/getEvidenceTypes?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function removeEvidenceType(sessionId, evidenceId, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        evidenceIdsToDelete: [parseInt(evidenceId)]

    };
    sendJsonPostRequest(data, '/deleteEvidenceType', onSuccess, onError);
}

function addEvidenceType(
    data,
    onSuccess,
    onError) { 
    sendJsonPostRequest(data, '/addEvidenceType', onSuccess, onError);
}

function getCoveredItems(onSuccess, onError) {
    sendGetRequest('/getCoveredItems?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function removeCoveredItem(sessionId, itemId, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        itemIds: [parseInt(itemId)]

    };
    sendJsonPostRequest(data, '/deleteEvidenceType', onSuccess, onError);
}

function addCoveredItem(
    data,
    onSuccess,
    onError) {
    sendJsonPostRequest(data, '/createCoveredItem', onSuccess, onError);
}


function getWarrantyRemedies(onSuccess, onError) {
    sendGetRequest('/getWarrantyRemedies?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function removeWarrantyRemedy(sessionId, itemId, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        itemIds: [parseInt(itemId)]

    };
    sendJsonPostRequest(data, '/deleteWarrantyRemedies', onSuccess, onError);
}

function addWarrantyRemedy(
    data,
    onSuccess,
    onError) {
    sendJsonPostRequest(data, '/createWarrantyRemedy', onSuccess, onError);
}

function getUserGroups(onSuccess, onError) {
    sendGetRequest('/getDisplayInfoForGroups?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function removeUserGroup(sessionId, itemId, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        groupIdsToDelete: [parseInt(itemId)]

    };
    sendJsonPostRequest(data, '/deleteUserGroups', onSuccess, onError);
}

function addUserGroup(
    data,
    onSuccess,
    onError) {
    sendJsonPostRequest(data, '/createUserGroup', onSuccess, onError);
}

function getSchools(selector, onSuccess, onError) {
    sendGetRequest('/getSchools?sessionId=' + getQueryParameter('sessionId') + '&selector=' + selector, onSuccess, onError);
}

function removeSchool(sessionId, id, onSuccess, onError) {
    var data =
    {
        sessionId: sessionId,
        itemIds: [parseInt(id)]

    };
    sendJsonPostRequest(data, '/deleteSchools', onSuccess, onError);
}

function addSchool(data, onSuccess, onError) {
    sendJsonPostRequest(data, '/addSchool', onSuccess, onError);
}

function getSchool(schoolId, onSuccess, onError) {
    sendGetRequest('/getSchool?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId, onSuccess, onError);
}


function getSchoolAddresses(schoolId, onSuccess, onError){
    sendGetRequest('/getSchoolAddresses?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId, onSuccess, onError);
}

 
function  deleteSchoolAddress(schoolId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        itemIds: [parseInt(id)],
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/deleteSchoolAddresses', onSuccess, onError);
 
}

function setSchoolPrimaryAddress(schoolId,id, onSuccess,  onError)
{
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        itemId: parseInt(id),
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/makeAddressPrimaryForSchool', onSuccess, onError);
}

function addSchoolAddress( schoolId,address,onSuccess,onError)
{
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        addresses: [address],
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/addSchoolAddresses', onSuccess, onError);
}

function getSchoolPhoneNumbers(schoolId, onSuccess, onError){
    sendGetRequest('/getSchoolPhoneNumbers?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId, onSuccess, onError);
}

 
function  deleteSchoolPhoneNumber(schoolId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        itemIds: [parseInt(id)],
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/deleteSchoolPhoneNumbers', onSuccess, onError);
 
}

function setSchoolPrimaryPhoneNumber(schoolId,id, onSuccess,  onError)
{
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        itemId: parseInt(id),
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/makePhoneNumberPrimaryForSchool', onSuccess, onError);
}

function addSchoolPhoneNumber( schoolId,phoneNumber,onSuccess,onError)
{
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        PhoneNumbers: [phoneNumber],
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/addSchoolPhoneNumbers', onSuccess, onError);
}

function updateSchool( data,onSuccess,onError)
{ 
    sendJsonPostRequest(data, '/updateSchool', onSuccess, onError);
}


function addSchoolLevels(  schoolId, levels,
            onSuccess,
            onError)
            {
                var data =
                {
                    sessionId: getQueryParameter('sessionId'),
                    levels: levels,
                    schoolId : parseInt(schoolId)
            
                };
                sendJsonPostRequest(data, '/addSchoolLevels', onSuccess, onError);
            }



function getSchoolLevels(schoolId, onSuccess, onError){
    sendGetRequest('/getSchoolLevels?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId, onSuccess, onError);
}

function deleteSchoolLevel(schoolId, levelId,  onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        itemIds: [parseInt(levelId)],
        targetId : parseInt(schoolId)

    };
    sendJsonPostRequest(data, '/deleteSchoolLevels', onSuccess, onError);
}

function getSchoolLevel(levelId, onSuccess, onError){
    sendGetRequest('/getSchoolLevel?sessionId=' + getQueryParameter('sessionId') + '&levelId=' + levelId, onSuccess, onError);
}


function addSchoolLevelArms(
    schoolId,
    levelId,
    arms,
    onSuccess,
    onError)
    {
        var data =
        {
            sessionId: getQueryParameter('sessionId'),
            arms: arms,
            levelId : parseInt(levelId)
    
        };
        sendJsonPostRequest(data, '/addSchoolLevelArms', onSuccess, onError);
    }
 
function deleteSchoolLevelArms(schoolId, id,
init,
onError)
{
    var data =
    {
        sessionId: getQueryParameter('sessionId'),
        itemIds: [parseInt(id)]
    };
    sendJsonPostRequest(data, '/deleteSchoolLevelArms', onSuccess, onError);
}

       
function getSchoolStaff(schoolId, onSuccess, onError){
    sendGetRequest('/getSchoolStaff?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId, onSuccess, onError);
}


function  deleteSchoolStaff(schoolId, id,
        onSuccess,
        onError){
            var data =
            {
                sessionId: getQueryParameter('sessionId'),
                itemIds: [parseInt(id)],
                targetId : parseInt(schoolId)
            };
            sendJsonPostRequest(data, '/deleteSchoolStaff', onSuccess, onError);
        }

        function addSchoolStaff(
            schoolId,
            staffIds,
            onSuccess,
            onError)

            {
                var data =
                {
                    sessionId: getQueryParameter('sessionId'),
                    itemIds: staffIds,
                    targetId : parseInt(schoolId)
                };
                sendJsonPostRequest(data, '/addSchoolStaff', onSuccess, onError);
            }

function  addSchoolTeacher(schoolId, id,
    onSuccess,
        onError){ 
            var data =
            {
                sessionId: getQueryParameter('sessionId'),
                itemIds: [parseInt(id)],
                targetId : parseInt(schoolId)
            };
            sendJsonPostRequest(data, '/addSchoolStaffAsTeacher', onSuccess, onError);
        }

function  removeSchoolTeacher(schoolId, id,
    onSuccess,
        onError)
        {
            var data =
            {
                sessionId: getQueryParameter('sessionId'),
                itemIds: [parseInt(id)],
                targetId : parseInt(schoolId)
            };
            sendJsonPostRequest(data, '/deleteSchoolStaffAsTeacher', onSuccess, onError);
        }

function  getSchoolStudents(schoolId, onSuccess, onError){
    sendGetRequest('/getSchoolStudents?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId, onSuccess, onError);
}
        
function  deleteSchoolStudents(schoolId, id,
    onSuccess,
                onError)
                {
                    var data =
                    {
                        sessionId: getQueryParameter('sessionId'),
                        itemIds: [parseInt(id)],
                        targetId : parseInt(schoolId)
                    };
                    sendJsonPostRequest(data, '/deleteStudentsFromSchool', onSuccess, onError);
                }

function addSchoolStudents(
            schoolId,
            studentIds,
            onSuccess,
            onError)
            {
                var data =
                {
                    sessionId: getQueryParameter('sessionId'),
                    itemIds: studentIds,
                    targetId : parseInt(schoolId)
                };
                sendJsonPostRequest(data, '/addStudentsToSchool', onSuccess, onError);
            }

function addBusiness(
    data,
    onSuccess,
    onError)
    {
        sendJsonPostRequest(data, '/addBusiness', onSuccess, onError);
    }

    function getBusinesses (selector, onSuccess, onError){
        sendGetRequest('/getBusinesses?sessionId=' + getQueryParameter('sessionId') ,  onSuccess, onError);
    }

    function removeBusiness(sessionId, id, onSuccess, onError)
    {
        var data =
        {
            sessionId: getQueryParameter('sessionId'),
            itemIds: [parseInt(id)]
        };
        sendJsonPostRequest(data, '/deleteBusinesses', onSuccess, onError);
    }


