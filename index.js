function loginpage(){
    var nameElement = document.getElementById("username");
    var passwordElement = document.getElementById("password");
    var nameofTheUser =nameElement.value;
    var passwordofTheUser =passwordElement.value;
    if (nameofTheUser = passwordofTheUser && nameofTheUser.length > 1){
        alert("Login Successful!");
        localStorage.setItem('login', 'true');
        }else{
            alert("Please enter valid credentials"); 
        }
}

var loginvalue= localStorage.getItem('login'); 
if(loginvalue =='true'){ 
    location.assign('orders.html')
}