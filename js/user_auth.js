// const verificationContainer =  document.getElementById('verification-code-form')
// const phoneNumberContainer = document.getElementById('sign-in-form')
// const btn_sign_in=  document.getElementById('sign-in-button')
// const btn_verify_code = document.getElementById('verify-code-button') ;
// const btn_add_user = document.getElementById('btn_add_user') ;
// const phone =  document.getElementById('phone-number') ;
// const verificationCode = document.getElementById('verification-code');
// const input_username = document.getElementById('username');
// const input_user_location = document.getElementById('user_location');
// const personalDataContainer = document.getElementById('personal_data_form');
// var database = firebase.database();
//
// function attemptLogin(evt) {
//
//     evt.preventDefault() ;
//     var phoneNumber = phone.value;
//     var appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//         .then(function (confirmationResult) {
//             // SMS sent. Prompt user to type the code from the message, then sign the
//             // user in with confirmationResult.confirm(code).
//             console.log(`confirmacao -> ${confirmationResult}`)
//             window.confirmationResult = confirmationResult;
//             hideElement(phoneNumberContainer)
//             showElement(verificationContainer)
//         }).catch(function (error) {
//             alert(error)
//         // Error; SMS not sent
//         // ...
//     });
//
// }
//
// function hideElement(element) {
//     if(element.style.display='block') element.style.display='none'
//
// }
// function showElement(element) {
//     if(element.style.display='none') element.style.display='block'
//
// }
//
// function enableElement(element) {
//     if(element.disabled) element.disabled = false ;
//
// }
//
// function disableElement(element) {
//     if(!element.disabled) element.disabled = true ;
//
// }
//
// function updateSignInButtonUI() {
//
//     if(isPhoneNumberValid()) {
//
//         enableElement(btn_sign_in)
//     }
//     else{
//         disableElement(btn_sign_in)
//     }
//
//
// }
//
// function isPhoneNumberValid() {
//     var pattern = /^\+[0-9\s\-\(\)]+$/;
//     var phoneNumber = phone.value;
//     return phoneNumber.search(pattern) !== -1;
// }
// function start() {
//
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//         'size': 'invisible',
//         'callback': function(response) {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             console.log(`response-> ${response}`)
//             onSignInSubmit();
//         }
//     });
//     hideElement(verificationContainer)
//     hideElement(personalDataContainer)
//
//     //Event binds list
//     btn_sign_in.addEventListener('click' , attemptLogin)
//     phone.addEventListener('keyup' , updateSignInButtonUI)
//     btn_verify_code.addEventListener('click' , verifyCodeListenner)
//     btn_add_user.addEventListener('click' , registerUserOnDataBaseListenner)
//
// }
// function verifyCodeListenner(e) {
//     e.preventDefault() ;
//     var code = verificationCode.value;
//     confirmationResult.confirm(code).then(function (result) {
//         // User signed in successfully.
//         var user = result.user;
//         hideElement(verificationContainer)
//         showElement(personalDataContainer)
//         console.log(user)
//
//         // ...
//     }).catch(function (error) {
//         alert(error)
//         // User couldn't sign in (bad verification code?)
//         // ...
//     });
//
// }
// function onSignInSubmit(){
//     console.log('pode autenticar com mobile')
// }
//
// function registerUserOnDataBaseListenner(e) {
//
//     e.preventDefault()
//
//
//  if(getUser()!=null){
//
//      const user = getUser() ;
//      user.displayName = input_username.value ;
//      user.location = input_user_location.value ;
//
//      writeUserData(user.uid ,user.displayName , user.location ,user.phoneNumber)
//  }
//
// }
//
// async function getUser() {
//     let user =null;
//     if (firebase.auth().currentUser.phoneNumber) {
//         user = await firebase.auth().currentUser.phoneNumber;
//     }
//     return user;
//
// }
// function writeUserData(userId, name, location,phone ) {
//    database.ref('users/' + userId).set({
//         userId:userId ,
//         username: name,
//         phone: phone,
//         location : location
//     }).then(function () {
//
//         console.log('adicionado com sucesso!')
//     }).catch(err=>console.log(err));
// }
// start();