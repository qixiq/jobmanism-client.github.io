
function AddStaff(){
    document.location.href = getPathPrefix(document.location.href) + '/manage-staff.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId') ;  
}

function goHome(){
            document.location.href = getPathPrefix(document.location.href) + '/school-admin-landing-page.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId');
        }
        function goToLevel(id){

            document.location.href = getPathPrefix(document.location.href) + '/school-year.html?sessionId='  + getQueryParameter('sessionId') + '&levelId=' + id + '&schoolId=' + getQueryParameter('schoolId');

        }

        function goToEditTeacherFromClassTeachers(id){
            document.location.href = getPathPrefix(document.location.href) + '/manage-staff.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId') + '&userId=' + id + '&isAcademic=1&returnAction=1';
        }

        function goToEditStaffFromAdministrativeStaff(id){
            document.location.href = getPathPrefix(document.location.href) + '/manage-staff.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId') + '&userId=' + id + '&isAcademic=1&returnAction=2';
        }

        function goToStudent(id){

        }

        function goToStaff(id){

        }

        function goToYears(){
            
        }

        function goToArms(){

        }

        function goToAdministrativeStaff(){
            document.location.href = getPathPrefix(document.location.href) + '/school-officers.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId');
        }

        function goToAcademicStaff(){
            document.location.href = getPathPrefix(document.location.href) + '/class-teachers.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId');

        }


        function goToLevelArm(id){
            document.location.href = getPathPrefix(document.location.href) + '/school-arm.html?sessionId='  + getQueryParameter('sessionId')  + '&schoolId=' + getQueryParameter('schoolId') + '&armId=' + id;
        }
        
        function getSchoolArmPageInfoWithDate(schoolId, armId, date, onSuccess, onError){
            sendGetRequest('/getSchoolArmPageInfo?sessionId=' + getQueryParameter('sessionId')+ '&armId=' +armId + '&schoolId='+ schoolId + '&date=' + date, onSuccess, onError);
        }

        function getSchoolArmPageInfo(schoolId, armId, onSuccess, onError){ 
            var d = new Date();
            var date = d.getFullYear() * 10000 + d.getMonth()* 100 + d.getDate();
            getSchoolArmPageInfoWithDate(schoolId, armId, date, onSuccess, onError);
        }

        function getSchoolOfficersPageInfo(schoolId,  onSuccess, onError){
            sendGetRequest('/getSchoolOfficersPageInfo?sessionId=' + getQueryParameter('sessionId')+  '&schoolId='+ schoolId , onSuccess, onError);
        }

        function getClassTeachersPageInfo(schoolId,  onSuccess, onError){
            sendGetRequest('/getClassTeachersPageInfo?sessionId=' + getQueryParameter('sessionId')+  '&schoolId='+ schoolId , onSuccess, onError);
        }

        function getSchoolYearPageInfo(schoolId, levelId, onSuccess, onError){
            sendGetRequest('/getSchoolYearPageInfo?sessionId=' + getQueryParameter('sessionId')+ '&levelId=' +levelId + '&schoolId='+ schoolId , onSuccess, onError);
        }

        function addLandingPagePersonRow(person, isStaff, rowWidth){
            var markup = '<tr><td><table><colgroup><col style="width:' ;
            if(rowWidth)
            {
                markup += (rowWidth - 85);
            }
            else{
                    markup += '415';
            }
            markup +=  'px"></col><col style="width: 60px"></col><col style="width: 25px"></col><col></col></colgroup><tr><td><a href="javascript:' ;

 
            markup += isStaff ? 'goToStaff' : 'goToStudent';
            markup +=  '(\'' + person.userId + '\')">' + person.fullName + '</a></td><td>' ;
                if(person.levelArm){
                    markup += '<a href="javascript:goToLevelArm(\'' + person.armId + '\')">';
                    markup +=  person.levelArm ;
                    markup += '</a>';
                }
                
                markup +=  '</td><td><img style=" width:20px; height:15px" src="email.png"></td><td style=" background: green;">&nbsp;&nbsp;</td></tr></table></td></tr>';
                return markup;
        }