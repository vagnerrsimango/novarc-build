function init() {


    var config = {
        apiKey: "AIzaSyBMZsaOG85rAAwERZW1YPhHWfFcjfP67VY",
        authDomain: "conedarte-e6cec.firebaseapp.com",
        databaseURL: "https://conedarte-e6cec.firebaseio.com",
        projectId: "conedarte-e6cec",
        storageBucket: "conedarte-e6cec.appspot.com",
        messagingSenderId: "228173133239",
        appId: "1:228173133239:web:c354b0c371df2ee5c3e432"
    };

    firebase.initializeApp(config);



}init()
var database = firebase.database();

function countVisitors(){

    database.ref('visitors').once('value' , function (snapshot) {

        const count = Number(snapshot.val().count) + 1;

        const guest  =  {
            "count" : count ,
            "last_seen" : new Date().getTime() ,
            "device":"J4"
        }



        database.ref('visitors').set(guest).then(()=>{

            console.log('contagem')

        }).catch(error => console.log(error))

    })


}

