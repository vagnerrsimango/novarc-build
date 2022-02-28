

function performLogin(){
    firebase.auth().signInWithEmailAndPassword(document.getElementById('login-username').value, document.getElementById('login-password').value).then(function () {

        verifyUser();
    }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        console.log(` error ${errorMessage}`)
    });
}

function verifyUser() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...





                window.location="./main.html";
        } else {

            console.log("no user ")
            // User is signed out.
            // ...
        }
    });
}

verifyUser();
//Xvg1458abc