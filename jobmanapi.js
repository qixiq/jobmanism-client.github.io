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

function addServiceCategory(data, onSuccess, onError) {
    sendJsonPostRequest(data, '/addServiceCategory', onSuccess, onError);
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

function addBusinessObject(
    path,
    data,
    onSuccess,
    onError)
    {
        sendJsonPostRequest(data, path, onSuccess, onError);
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
    
    function     addBusinessLocation(
        businessId,
        address,
        phoneNumber,
        onSuccess,
        onError)
        {
            var data =
            {
                sessionId: getQueryParameter('sessionId'),
                address : address,
                phoneNumber, phoneNumber,
                businessId : parseInt(businessId)
            };
            sendJsonPostRequest(data, '/addBusinessLocation', onSuccess, onError);
        }

        function getBusiness  (businessId, onSuccess, onError){
            sendGetRequest('/getBusiness?sessionId=' + getQueryParameter('sessionId') + '&businessId=' + businessId ,  onSuccess, onError);
        }

        function removeBusinessLocation(sessionId, businessId, id, onSuccess, onError)
        {
            var data =
            {
                sessionId: getQueryParameter('sessionId'),
                targetId: parseInt(businessId),
                itemIds: [parseInt(id)]
            };
            sendJsonPostRequest(data, '/deleteBusinessLocations', onSuccess, onError);
        }

    function getMenuItem(menuItemId, onSuccess, onError) {
        sendGetRequest('/getMenuItem?sessionId=' + getQueryParameter('sessionId')+ '&menuItemId=' + menuItemId,  onSuccess, onError);
    }

function getMenuItemCategories(onSuccess, onError) {
    sendGetRequest('/getMenuItemCategories?sessionId=' + getQueryParameter('sessionId'),  onSuccess, onError);
}

function getFoodAndDrinkVendorTypes(onSuccess, onError){
    sendGetRequest('/getFoodAndDrinkVendorTypes?sessionId=' + getQueryParameter('sessionId') , onSuccess, onError);
} 
   
function removeMenuItemCategory(sessionId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)]
    };
    sendJsonPostRequest(data, '/deleteMenuItemCategories', onSuccess, onError);
}
  
function removeFoodAndDrinkVendorType(sessionId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)]
    };
    sendJsonPostRequest(data, '/deleteFoodAndDrinkVendorTypes', onSuccess, onError);
}

function getMenuItems(businessId, onSuccess, onError){
    sendGetRequest('/getMenuItems?sessionId=' + getQueryParameter('sessionId') + '&filter=businessId-' + businessId , onSuccess, onError);
}

function removeMenuItem(sessionId, businessId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)],
        targetId: parseInt(businessId)
    };
    sendJsonPostRequest(data, '/deleteMenuItems', onSuccess, onError);
}

function addMenuItem( 
    data,
    onSuccess,
    onError)
    {
        sendJsonPostRequest(data, '/addMenuItem', onSuccess, onError);
    }


 function removeSubject(sessionId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)]
    };
    sendJsonPostRequest(data, '/deleteSubjects', onSuccess, onError);
 }
 
 function removeDeviceType(sessionId, id, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)]
    };
    sendJsonPostRequest(data, '/deleteDeviceTypes', onSuccess, onError);
 }

 function getSubjects(onSuccess, onError){
    sendGetRequest('/getSubjects?sessionId=' + getQueryParameter('sessionId') , onSuccess, onError);
 }

 function getDeviceTypes(onSuccess, onError){
    sendGetRequest('/getDeviceTypes?sessionId=' + getQueryParameter('sessionId') , onSuccess, onError);
 }

 function getSubject(subjectId, onSuccess, onError){
    sendGetRequest('/getSubject?sessionId=' + getQueryParameter('sessionId') + '&subjectId=' + subjectId, onSuccess, onError);
 }

 function getDeviceType(deviceTypeId, onSuccess, onError){
    sendGetRequest('/getDeviceType?sessionId=' + getQueryParameter('sessionId') + '&deviceTypeId=' + deviceTypeId, onSuccess, onError);
 }

 function addSubject(
    data,
    onSuccess,
    onError)
    {
        sendJsonPostRequest(data, '/addSubject', onSuccess, onError);
    }

    function addDeviceType(
        data,
        onSuccess,
        onError)
        {
            sendJsonPostRequest(data, '/addDeviceType', onSuccess, onError);
        }

function updateSubject(
            data,
            onSuccess,
            onError){
                sendJsonPostRequest(data, '/updateSubject', onSuccess, onError);
            }

function updateDeviceType(
    data,
    onSuccess,
    onError){
        sendJsonPostRequest(data, '/updateDeviceType', onSuccess, onError);
    }

function getLevelArmStudents(armId, onSuccess, onError){
    sendGetRequest('/getLevelArmStudents?sessionId=' + getQueryParameter('sessionId') + '&armId=' + armId, onSuccess, onError);
}
            
    
 
function getClassTeacherForLevelArm(armId, onSuccess, onError){
    sendGetRequest('/getClassTeacherForLevelArm?sessionId=' + getQueryParameter('sessionId') + '&armId=' + armId, onSuccess, onError);
}

function getFoodAndDrinkVendorLocation(sessionId, locationId, onSuccess, onError){
    sendGetRequest('/getFoodAndDrinkVendorLocation?sessionId=' + getQueryParameter('sessionId') + '&locationId=' + locationId, onSuccess, onError);
}
 
function removeStudentFromLevelArm(sessionId, id, armId, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)],
        targetId : parseInt(armId)
    };
    sendJsonPostRequest(data, '/deleteStudentsFromLevelArm', onSuccess, onError);
}

function     addStudentsToLevelArm(
    armId,
    schoolId,
    studentIds,
    onSuccess,
    onError)
    {
        var data =
        {
            sessionId: getQueryParameter('sessionId'), 
            itemIds: studentIds,
            targetId : armId,
            schoolId : schoolId
        };
        sendJsonPostRequest(data, '/addStudentsToLevelArm', onSuccess, onError);
    }

    function removeClassTeacherFromLevelArm(sessionId, classTeacherId, armId, onSuccess, onError)
    {
        var data =
        {
            sessionId: sessionId, 
            itemId: parseInt(classTeacherId),
            targetId : parseInt(armId)
        };
        sendJsonPostRequest(data, '/deleteClassTeachersForLevelArms', onSuccess, onError);
    }

    function assignClassTeacherForLevelArm(
        armId,
        schoolId,
        userId,
        onSuccess,
        onError)
    {
        var data =
        {
            sessionId: getQueryParameter('sessionId'), 
            itemId: userId,
            targetId : armId
        };
        sendJsonPostRequest(data, '/assignClassTeacherForLevelArm', onSuccess, onError);
    }

    function getMenuItemsNotAvailableInLocation(businessId, locationId, onSuccess, onError){
        sendGetRequest('/getMenuItemsNotAvailableInLocation?sessionId=' + getQueryParameter('sessionId') + '&locationId=' + locationId + '&businessId=' + businessId, onSuccess, onError);
    }

    function getVendorTypesNotAvailableInLocation(locationId, onSuccess, onError){
        sendGetRequest('/getVendorTypesNotAvailableInLocation?sessionId=' + getQueryParameter('sessionId') + '&locationId=' + locationId  , onSuccess, onError);
    }


    function addMenuItemToLocation(
        data,
        onSuccess,
        onError){
            sendJsonPostRequest(data, '/addMenuItemsToLocation', onSuccess, onError);
        }


        function addFoodAndDrinkVendorTypesToLocation(
            locationId,
            itemIds,
            onSuccess,
            onError)
            {
                var data =
                {
                    sessionId: getQueryParameter('sessionId'), 
                    itemIds: itemIds,
                    targetId : parseInt(locationId)
                };

                sendJsonPostRequest(data, '/addFoodAndDrinkVendorTypesAtLocation', onSuccess, onError);
            }

function removeMenuItemFromLocation(sessionId, id, locationId, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)],
        targetId : parseInt(locationId)
    };

    sendJsonPostRequest(data, '/deleteMenuItemsFromLocation', onSuccess, onError);
}
    
function removeVendorTypeFromLocation(sessionId, id, locationId, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)],
        targetId : parseInt(locationId)
    };

    sendJsonPostRequest(data, '/deleteFoodAndDrinkVendorTypesFromLocation', onSuccess, onError);
    
}

function searchForFoodAndDrinkVendorLocations( 
    data,
    onSuccess,
    onError){
        sendJsonPostRequest(data, '/searchForFoodAndDrinkVendorLocations', onSuccess, onError);
    }

function addSchoolGroup(
        data,
        onSuccess,
        onError)
        {
            sendJsonPostRequest(data, '/addSchoolGroup', onSuccess, onError);
        }

function getSchoolGroups(schoolId, onSuccess, onError){
    sendGetRequest('/getSchoolGroups?sessionId=' + getQueryParameter('sessionId') + '&filter=schoolId-' + schoolId  , onSuccess, onError);

}

function getUsersInSchoolGroups(schoolId, onSuccess, onError){
    sendGetRequest('/getUsersInSchoolGroup?sessionId=' + getQueryParameter('sessionId') + '&filter=schoolId-' + schoolId  , onSuccess, onError);

}

function removeSchoolGroup(sessionId, id, schoolId, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemIds: [parseInt(id)],
        targetId : parseInt(schoolId)
    };

    sendJsonPostRequest(data, '/deleteSchoolGroups', onSuccess, onError);
}

function getSchoolGroup(groupId, onSuccess, onError){
    sendGetRequest('/getSchoolGroup?sessionId=' + getQueryParameter('sessionId') + '&groupId=' + groupId  , onSuccess, onError);
}

function deleteSchoolGroupMember(groupId , memberId,
        onSuccess,
        onError){
            var data =
            {
                sessionId: getQueryParameter('sessionId'), 
                itemIds: [parseInt(memberId)],
                targetId : parseInt(groupId)
            };
        
            sendJsonPostRequest(data, '/deleteUsersFromSchoolGroup', onSuccess, onError);
        }

function addUsersToSchoolGroup(
            groupId,
            memberIds,
            onSuccess,
            onError)
            {
                var data =
                {
                    sessionId: getQueryParameter('sessionId'), 
                    itemIds: memberIds,
                    targetId : parseInt(groupId)
                };

                sendJsonPostRequest(data, '/addUsersToSchoolGroup', onSuccess, onError);
            }

function getSchoolUsersNotInGroup(schoolId, groupId, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        itemId: parseInt(groupId),
        targetId : parseInt(schoolId)
    };

    sendJsonPostRequest(data, '/getSchoolUsersNotInGroup', onSuccess, onError);
}

function  getTeachersAssignedSubjectsForLevelArms(armId, onSuccess, onError){
    sendGetRequest('/getTeacherAssignedSubjectsForLevelArms?sessionId=' + getQueryParameter('sessionId') + '&selector=armId-' + armId  , onSuccess, onError);
}

function addTeacherSubjects(
    data,
    onSuccess,
    onError)
    {
        sendJsonPostRequest(data, '/assignTeacherSubjectsForLevelArms', onSuccess, onError);
        
    }


function removeTeacherSubject(userId, armId, subjectId, onSuccess, onError){
    var data =
    {
        sessionId: getQueryParameter('sessionId'), 
        subjects: [{armId : parseInt(armId), userId : parseInt(userId), subjectId : parseInt(subjectId)}]
    };

    sendJsonPostRequest(data, '/deleteTeacherAssignedSubjectsForLevelArms', onSuccess, onError);
}

function getDeviceDetailsForSingleUser(schoolId, userId, onSuccess, onError){
    sendGetRequest('/getDeviceDetailsForSingleUser?sessionId=' + getQueryParameter('sessionId') + '&schoolId=' + schoolId + '&personId=' + userId , onSuccess, onError);
}

function assignNewDevicesToUsers( 
    data,
    onSuccess,
    onError){
        sendJsonPostRequest(data, '/assignNewDevicesToUsers ', onSuccess, onError);
    }

function removeUserDevice(sessionId, schoolId,userId, deviceTypeId, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        devices: [{schoolId : parseInt(schoolId), userId : parseInt(userId), deviceTypeId : parseInt(deviceTypeId)}]
    };

    sendJsonPostRequest(data, '/deleteUserAssignedDevices', onSuccess, onError);
}


function getDigitalAssetTypes(onSuccess, onError){
    sendGetRequest('/getDigitalAssetTypes?sessionId=' + getQueryParameter('sessionId') , onSuccess, onError);
}

function removeDigitalAssetType(sessionId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)]
    };

    sendJsonPostRequest(data, '/deleteDigitalAssetTypes', onSuccess, onError);
}

function addDigitalAssetType( 
    data,
    onSuccess,
    onError){
        sendFormDataPostRequest(data, '/addDigitalAssetType', onSuccess, onError);
    }


function  addDigitalAssetToBusiness( 
        data,
        onSuccess,
        onError)
{
    sendJsonPostRequest(data, '/addDigitalAssetTypeToBusiness', onSuccess, onError);
}

function removeBusinessDigitalAsset(sessionId, businessId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(businessId)
    };

    sendJsonPostRequest(data, '/deleteDigitalAssetTypesFromBusiness', onSuccess, onError);
}

function removeMenuItemAnnotation(sessionId, menuItemId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(menuItemId)
    };

    sendJsonPostRequest(data, '/deleteAnnotationsFromMenuItem', onSuccess, onError);
}


function addMenuItemAnnotation( 
    data,
    onSuccess,
    onError){
        sendFormDataPostRequest(data, '/addAnnotationToMenuItem', onSuccess, onError);
}


function removeBusinessAnnotation(sessionId, businessId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(businessId)
    };

    sendJsonPostRequest(data, '/deleteAnnotationsFromBusiness', onSuccess, onError);
}

function removeLocationAnnotation(sessionId, locationId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(locationId)
    };

    sendJsonPostRequest(data, '/deleteAnnotationsFromBusinessLocation', onSuccess, onError);
}

function addBusinessAnnotation( 
    data,
    onSuccess,
    onError)
    {
        sendFormDataPostRequest(data, '/addAnnotationToBusiness', onSuccess, onError);
    }

function addBusinessLocationAnnotation( 
        data,
        onSuccess,
        onError)
        {
            sendFormDataPostRequest(data, '/addAnnotationToBusinessLocation', onSuccess, onError);
        }

function addLocationOperatingHours(data, onSuccess, onError){

    sendJsonPostRequest(data, '/addBusinessHoursToLocation', onSuccess, onError);
}

function getDayOfWeekName(index){
    switch(index){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';

    }

    return '';
}

function getTwoDigitPaddedNumber(num){
    var padded = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
    return num <= 9 ? padded[num] : num;
}

function removeLocationOperatingHours(sessionId, locationId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(locationId)
    };

    sendJsonPostRequest(data, '/deleteLocationBusinessHours', onSuccess, onError);
}

function getUserAddress(addressId, onSuccess, onError){
    sendGetRequest('/getUserAddress?sessionId=' + getQueryParameter('sessionId') + '&addressId=' + addressId, onSuccess, onError);
}

function getUserPhoneNumber(phoneNumberId, onSuccess, onError){
    sendGetRequest('/getUserPhoneNumber?sessionId=' + getQueryParameter('sessionId') + '&phoneNumberId=' + phoneNumberId, onSuccess, onError);
}

function getServiceCategoryDetails(serviceId, onSuccess, onError){
    sendGetRequest('/getServiceCategoryDetails?sessionId=' + getQueryParameter('sessionId') + '&serviceId=' + serviceId, onSuccess, onError);
}

function updateAddress(address, targetId, onSuccess, onError) {
    var data =
    {
        address: address,
        targetId : targetId,
        sessionId : getQueryParameter('sessionId')
    } 
    sendJsonPostRequest(data, '/updateUserAddress', onSuccess, onError);
}

function updatePhoneNumber( phoneNumber, targetId, onSuccess, onError){
    var data =
    {
        phoneNumber: phoneNumber,
        targetId : targetId,
        sessionId : getQueryParameter('sessionId')
    } 
    sendJsonPostRequest(data, '/updateUserPhoneNumber', onSuccess, onError);
}

function removeServiceCategoryAnnotation(sessionId, serviceId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(serviceId)
    };

    sendJsonPostRequest(data, '/deleteAnnotationsFromServiceCategory', onSuccess, onError);
}

function addServiceCategoryAnnotation( 
    data,
    onSuccess,
    onError)
    {
        sendFormDataPostRequest(data, '/addAnnotationToServiceCategory', onSuccess, onError);
    }

function addJob( 
    data,
    onSuccess,
    onError)
    {
        sendJsonPostRequest(data, '/addJobRequisition', onSuccess, onError);
    }

   function addEvidenceRequirementForServiceCategory( 
        data,
        onSuccess,
        onError)
        {
            sendJsonPostRequest(data, '/addEvidenceRequirementForServiceCategory', onSuccess, onError);
        }

function removeServiceCategoryEvidenceSpecification(sessionId, serviceId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        serviceCategoryId : parseInt(serviceId),
        evidenceTypeId : parseInt(id)
    };

    sendJsonPostRequest(data, '/removeEvidenceRequirementForServiceCategory', onSuccess, onError);
}

function removeJob(sessionId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)]
    };

    sendJsonPostRequest(data, '/deleteJobRequisitions', onSuccess, onError);
}

function removeJobAnnotation(sessionId, jobId, id, onSuccess, onError){
    var data =
    {
        sessionId: sessionId, 
        itemIds: [parseInt(id)],
        targetId : parseInt(jobId)
    };

    sendJsonPostRequest(data, '/deleteAnnotationsFromJobRequisition', onSuccess, onError);
}

function getUserJobRequisitions(onSuccess, onError){
    sendGetRequest('/GetJobRequisitions?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function getInfoForNewJobCreation(onSuccess, onError){
    sendGetRequest('/getInfoForNewJobCreation?sessionId=' + getQueryParameter('sessionId'), onSuccess, onError);
}

function getTextForJobRequisitionStatus(status){
    switch(status)
    {
        case 1:
            return 'Published';
            case 2:
                return 'Active';
                case 3:
                    return 'Completed';
    }

    return 'Not Published';
}

function getJobRequisitionDetails(jobId, onSuccess, onError){
    sendGetRequest('/getJobRequisition?sessionId=' + getQueryParameter('sessionId') + '&requisitionId=' + jobId, onSuccess, onError);
}

function getStudentSubjects(armId, studentId, onSuccess, onError)
{
    sendGetRequest('/getSubjectsForStudent?sessionId=' + getQueryParameter('sessionId') + '&armId=' + armId + '&studentId=' + studentId, onSuccess, onError);
}

function getSchoolLocations(onSuccess, onError){
    sendGetRequest('/getSchoolLocations?sessionId=' + getQueryParameter('sessionId') , onSuccess, onError);
}

function getSchoolsByLocation(
    country,
    state,
    county,
    onSuccess,
    onError)
    {
        var url = '/getSchools?sessionId=' + getQueryParameter('sessionId') + '&selector=';

        if(country && country !== '')
        {
            url += 'country-' + encodeURIComponent(country);
        }

        if(state && state !== '')
        {
            url += ':state-' + encodeURIComponent(state);
        }

        if(county && county !== '')
        {
            url += ':county-' + encodeURIComponent(county);
        }
        sendGetRequest( url, onSuccess, onError)
    }


function addJobRequisitionAnnotation( 
    data,
    onSuccess,
    onError)
    {
        sendFormDataPostRequest(data, '/addAnnotationToJobRequisition', onSuccess, onError);
    }

function getSubjectsNotAssignedToStudent(armId, studentId, onSuccess, onError){
    sendGetRequest('/getSubjectsNotAssignedToStudent?sessionId=' + getQueryParameter('sessionId') + '&armId=' + armId + '&studentId=' + studentId, onSuccess, onError);
    }
        

    function addStudentSubjects(
        studentId,
        armId,
        subjectIds,
        onSuccess,
        onError)
        {
            var subjects = [];
            for(var i = 0; i < subjectIds.length; ++i){
                subjects.push(
                    {
                        userId : parseInt(studentId),
                        subjectId : subjectIds[i],
                        armId : parseInt(armId)
                    }
                );
            }
            var data =
            {
                sessionId: sessionId, 
                subjects: subjects
            };
        
            sendJsonPostRequest(data, '/assignStudentsSubjects', onSuccess, onError);
        }


function removeStudentSubject(userId, armId, subjectId, onSuccess, onError){
    var subjects = [{
        userId : parseInt(userId),
        subjectId : parseInt(subjectId),
        armId : parseInt(armId)
    }]; 
    var data =
    {
        sessionId: sessionId, 
        subjects: subjects
    };

    sendJsonPostRequest(data, '/deleteStudentsFromSubject', onSuccess, onError);
}