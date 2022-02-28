var name ;
var phone ;
var mail ;
var address ;
var password ;
var password2 ;
const btnSubmit = document.getElementById('btn-submit-auth')
var database = firebase.database();




function registerUserListenner() {
    name = document.getElementById('input-name').value ;
   phone = document.getElementById('input-phone').value ;
   mail = document.getElementById('input-mail').value;
   address = document.getElementById('input-address').value ;
   password = document.getElementById('input-password').value ;
   password2 = document.getElementById('input-password2').value ;

    console.log('mail->' , mail)
    btnSubmit.innerText='Aguarde...'
    firebase.auth().createUserWithEmailAndPassword(mail, password).then(function () {



        attemptLogin(mail,password)



    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log({
            "code" : errorCode ,
            "message" : errorMessage
        })
        // ...
    });

}

function attemptLogin(email , password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        firebase.auth().onAuthStateChanged(function(user) {

            if(user){
                writeUserData(user.uid , email , phone , name , address)
                btnSubmit.innerText='Feito'
                alert('logado com suesso !')
            }

        })



    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });


}

async function writeUserData(userId, email , phone,name ,address) {

    firebase.database().ref('users/' + userId).set({
        id:await userId,
        email: email,
        phone : phone ,
        displayName: name,
        address :address

    });


}
  function checkUser() {


      firebase.auth().onAuthStateChanged(function(user) {
         if(user) {
             console.log('user',user)
             return user ;
         }

     })


}

function start() {

    if(checkUser()){
        const user = checkUser();
        console.log('start',user)
    }else{
        console.log('no user')
    }

}
start()
// checkUser().then(r => console.log(r));