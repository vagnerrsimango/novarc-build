var database = firebase.database();
var storage = firebase.storage();

function main() {
}

function registerListenner() {
    document.getElementById("btn_submit").disabled = true;

    const artist_id = database.ref().push().key;
    const name = document.getElementById('name').value ;
    const email = document.getElementById('email').value ;
    const phone = document.getElementById('phone').value ;
    // const art_name = document.getElementById('art_name').value ;
    const category = document.getElementById('category').value ;
    const artist_photo = document.getElementById('artist_photo').files[0] ;
    // const art_photo = document.getElementById('art_photo').files[0] ;
    const about_begin = document.getElementById('about_begin').value ;
    const about_experience = document.getElementById('about_experience').value ;
    const about_tecnique = document.getElementById('about_tecnique').value ;
    const about_inspiration = document.getElementById('about_inspiration').value ;
    // const art_price  =  document.getElementById('art_price').value ;
    // const art_desc =  document.getElementById('art_desc').value ;
    // const art_year =  document.getElementById('art_year').value ;




    const artist = {
        "id" : artist_id,
        "name" : name  ,
        "email" : email  ,
        "phone" : phone ,
        "category" : category  ,
        "avatar" : artist_photo.name  ,
        "about_begin" : about_begin ,
        "about_experience" : about_experience  ,
        "about_tecnique" : about_tecnique  ,
        "about_ispiration" : about_inspiration  ,
        "created_at": new Date().getTime() ,
        "image_ref" : artist_photo.name
    }

 // art = {
 //
 //        "artist_id" : artist_id,
 //        "art_name" : art_name ,
 //        "art_photo" : art_photo,
 //        "art_price" : art_price ,
 //        "art_desc" : art_desc ,
 //        "art_year" : art_year,
 //        "image_ref" : art_photo.name ,
 //     "created_at": new Date().getTime()
 //
 //    }

    uploadFile(artist_photo  ,artist_id , artist)
 //    writeArtistData(artist_id , artist)
 // writeArtData(art_id , art)


}

function writeArtistData(artistId, artist ) {
 database.ref('artists/' + artistId).set(artist).then(()=>{
     document.getElementById("btn_submit").disabled = false;
     alert(` ${artist.name} foi  adicionado/a com sucesso à plataforma  ! `)
     // addArt(artistId, art)
 }).catch(()=>{
     console.log('Fracasso')
 });
}

function uploadFile(file ,artist_id , artist ) {

        const ref = firebase.storage().ref();


        const name = file.name;
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
            .then((snapshot) => {
                progress(snapshot)
               return snapshot.ref.getDownloadURL()

            })
            .then((url) => {
                // alert(url);
                artist.avatar = url ;

                writeArtistData(artist_id ,artist)

            })
            .catch(console.error);



}

function addArt(artistId, art) {
    database.ref('artists/' + artistId ).push(art).then(()=>{
        document.getElementById("btn_submit_art").disabled = false;

        alert('Adicionado com sucesso ! ')
    }).catch(()=>{

    })

}
function startProgress(time) {
    /* construct manually */
    var bar1 = new ldBar("#myItem1");
    /* ldBar stored in the element */
    var bar2 = document.getElementById('myItem1').ldBar;
    bar1.set(time);
}

function getAllArtists() {

    const artist_container =  document.getElementById('artist_belog');
    artist_container.innerHTML = `<option selected>Aguarde ...</option>`;
    database.ref('artists').once('value').then(function (snapshot) {


        artist_container.innerHTML = `<option selected>Selecione o artista </option>`;
        snapshot.forEach((childSnapshot)=>{
          const artist  =  childSnapshot.val() ;
        artist_container.innerHTML += `<option id="${artist.id}">${artist.name}</option>` ;


      })
    })



}

function addArtListenner() {
    document.getElementById("btn_submit_art").disabled = true;
    const artist =  document.getElementById('artist_belog');
    const artist_id =  artist.options[artist.selectedIndex].id ;


    const art_name =  document.getElementById('art_name').value ;
    const art_price  =  document.getElementById('art_price').value ;
    const art_price2 = document.getElementById('art_price2').value ;
    const art_desc =  document.getElementById('art_desc').value ;
    const art_year =  document.getElementById('art_year').value ;
    const file  = document.getElementById('art_photo').files[0]
    art = {

        "artist_id" : artist_id,
        "art_name" : art_name ,
        "art_price": art_price,
        "art_price2" : art_price2 , 
        "art_desc" : art_desc ,
        "art_year" : art_year,
        "image_ref": file.name ,
        "created_at": new Date().getTime()

    }


    const ref = firebase.storage().ref();


    const name = file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then((snapshot) => {
            progress(snapshot)
            return snapshot.ref.getDownloadURL()

        })
        .then((url) => {
            // alert(url);


            art.art_photo =  url ;
            addArt(artist_id, art)




        })
        .catch(console.error);





}
function progress ( snapshot){
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

    startProgress(percentage)

}
function logout(){

    firebase.auth().onAuthStateChanged(function(user) {

        if(user){
            firebase.auth().signOut().then(function() {

                window.location="./auth.html";
            }).catch(function(error) {

                alert('Erro : ' + error) ;
                console.log(`Erro : ${error}`);
            })
        }
    })


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

        } else {
            window.location="./auth.html";
            console.log("no user ")
            // User is signed out.
            // ...
        }
    });
}
