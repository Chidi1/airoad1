function login(){
    
 var datareq = {
    UserName: $('input[name=UserName]').val(),
    UserPassword: $('input[name=UserPassword]').val(),
 }
 if(datareq.UserName === '' || datareq.UserPassword === ''){
     alert("Invalid username/password");
 }

 console.log('Submitting form...' );
 var responseText = '';
//  {"UserName":"SA","UserPassword":"super@admin"}
            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: 'https://api-admin.azurewebsites.net/api/token/verifyuser', // the url where we want to POST
                    data: JSON.stringify(datareq), // our data object
                    datatype : "text/plain",
                    contentType: "application/json"              
                })        
                 // using the done promise callback
                .done(function(data) 
                 {
                    window.localStorage.setItem('access_token', data);
                    getUsers();
                      
                 }).error(function(data){
                     console.log(data.responseText);
                     alert(data.responseText)
                 })
            //window.localStorage.getItem(access_token);
 }  
 function getUsers(){
   const token = window.localStorage.getItem('access_token');
   let newData = {
       id: 0,
       fullName:'',
       rid:0,
       creationDate:'',
       userType:''
   }
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: 'https://api-admin.azurewebsites.net/api/airoadminconsole/getusers', // the url where we want to POST
        headers: {
            'Authorization': `Bearer ${token}`,
        }, // our data object
        datatype : "json",           
    })        
     // using the done promise callback
    .done(function(data) 
     {
        let ids = data.map( (item) => item.id);
        let fullName = data.map((item) => item.fullName);
        let rid = data.map((item) => item.rid);
        let creationDate = data.map((item) => item.creationDate);
        newData.id = ids;
        newData.fullName = fullName;
        newData.rid = rid;
        newData.creationDate = creationDate;
        window.location.href = "/index";
        
    //   console.log(newData);
        // window.location.href = "index.html";
     });
 }


 function CreateUser(){
    const token = window.localStorage.getItem('access_token');
    var datareq = {
       FullName: $('input[name=FullName]').val(),
       UserName: $('input[name=UserName]').val(),
       UserPassword: $('input[name=UserPassword]').val(),
    }
   
    console.log('Submitting form...' );
    //var response = '';
   //  {"UserName":"SA","UserPassword":"super@admin"}
               $.ajax({
                       type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                       url: 'https://api-admin.azurewebsites.net/api/airoadminconsole/adduser', // the url where we want to POST
                       headers: {
                        'Authorization': `Bearer ${token}`,
                       }, 
                       data: JSON.stringify(datareq), // our data object
                       datatype : "json",
                       contentType: "application/json"              
                   })        
                    // using the done promise callback
                   .done(function(data) 
                    {
                        //console.log(data)
                        if (data.status === 'failed'){
                            alert(data.response)
                        }else{
                            alert(data.response)

                        }

                         
                    }).error(function(data){
                        console.log(data.responseText);
                        alert(data.responseText)
                    })
               //window.localStorage.getItem(access_token);

               /*.done(function(data) 
               {
                  newData.id = ids;
                  newData.FullName = FullName;
                  newData.UserName = UserName;
                  newData.UserPassword = UserPassword;
                  window.location.href = "/login";
                  
              //   console.log(newData);
                  // window.location.href = "index.html";
               });*/
            
    }  

   