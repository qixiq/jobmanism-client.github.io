
        function goToLevel(id){

            document.location.href = getPathPrefix(document.location.href) + '/school-year.html?sessionId='  + getQueryParameter('sessionId') + '&levelId=' + id + '&schoolId=' + getQueryParameter('schoolId');

        }

        function goToStudent(id){

        }

        function goToStaff(id){

        }

        function goToYears(){
            
        }

        function goToArms(){

        }

        function goToAdmininstrativeStaff(){

        }

        function goToAcademicStaff(){

        }


        function goToLevelArm(id){

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