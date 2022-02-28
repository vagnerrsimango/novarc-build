verifyUser();
var table_row = document.getElementById('table');
var table_row_art = document.getElementById('table_art');
var artist_container = document.getElementById('artist_container');
var count  =Number(1)   ;
var count_art  =Number(1)   ;



function start() {
    // var x = document.getElementById("limit").getAttribute("aria-valuemax");
    // console.log(x)

    firebase.database().ref('visitors').on('value' , function (snapshot) {
        console.log(snapshot.val().count)
        document.getElementById("limit").setAttribute("aria-valuenow" , snapshot.val())
        document.getElementById('last_seen').innerText ="útima visita : " + new Date(snapshot.val().last_seen)  ;
        document.getElementById('visitors').innerText = snapshot.val().count ;




    })

    firebase.database().ref('/artists').once('value').then(function(snapshot) {


        snapshot.forEach((childSnapShot)=>{
           const artist  =  childSnapShot.val()

            document.getElementById('count').innerHTML = count ;
           document.getElementById('limit_artistas').setAttribute("aria-valuenow" , count) ;
           const date =  new Date(artist.created_at);



            table_row.innerHTML += `<tr><th scope="row">${count}</th><td>${artist.name}</td><td>${artist.category}</td><td>${ artist.phone}</td> <td>${date}</td> <td id="${artist.id}" onclick="deleteArtist(this.id)"> <i class="fa fa-close"></i></td></tr>` ;

            artist_container+= `          <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="${artist.avatar}" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="#">${artist.name}</a>
                            </h4>
                            <h5>18.135,00 MT</h5>
                            <p class="card-text">Por : <strong>Arqueiro</strong></p>
                        </div>
                        <div class="card-footer">
                            
                        </div>
                    </div>
                </div>`;

           count++ ;
        })

    })

    getAllArtWork() ;

}

function deleteArtist(id){


    const answer  =    confirm('Pretende eliminar ?')


    if(answer){


        const ref =  firebase.database().ref('artists/'+id);

        ref.once('value' , function (snapshot) {



            if(snapshot.val()){
                console.log(snapshot.val().image_ref)

                const image_to_delete  =  snapshot.val().image_ref


                deleteImage(image_to_delete ) // Delete Artist image .

            }



        }).then(()=>{


            ref.remove().then(()=>{
                alert('Artista removido com sucesso ! , recarregue a pagina para visualizar .  ')

            }).catch((error)=>{
                alert('Erro ao remover , verifique a conexão e tente novamente !')
                console.log(`Error ${error}`)
            })

        })






    }else {
        console.log('deixa estar ')
    }




}
function deleteArtWork(id){

const ref  =     firebase.database().ref('/artists').once('value').then(function(snapshot) {


        snapshot.forEach(function (childSnapShot) {

            childSnapShot.forEach(function (childChildSnapShot) {
                if(typeof  childChildSnapShot.val().art_name !== 'undefined' ){
                  if(childChildSnapShot.key===id){

                      const answer  =    confirm(`Pretende eliminar a obra ${childChildSnapShot.val().art_name} ?`)


                      if(answer){

                          const image_ref =  childChildSnapShot.val().image_ref
                          console.log(`art image ref :  ${image_ref}` )



                          childChildSnapShot.ref.remove().then(()=>{
                              deleteImage(image_ref)
                              alert('Obra removida com sucesso ! , recarregue a pagina para visualizar .  ')

                          }).catch((error)=>{
                              alert('Erro ao remover , verifique a conexão e tente novamente !')
                              console.log(`Error ${error}`)
                          })





                      }else {
                          console.log('deixa estar ')
                      }




                  }
                }

            })



        })


    })


}

function getAllArtWork(){
    firebase.database().ref('/artists').once('value').then(function(snapshot) {

var art  = {} ;
        snapshot.forEach(function (chilSnapShot) {

            chilSnapShot.forEach(function (childChildSnapShot) {

             if(typeof childChildSnapShot.val().art_name !== 'undefined'){

              art =  childChildSnapShot.val()
                 table_row_art.innerHTML += `<tr><th scope="row">${count_art}</th><td>${art.art_name}</td><td>${art.art_price}</td><td> <img src="${art.art_photo}"  width="50px" height="50px" alt="imagem da obra" class="img-circle img-no-padding img-responsive"></td> <td>${art.art_year}</td> <td>${new Date(art.created_at)}</td> <td id="${childChildSnapShot.key}" onclick="deleteArtWork(this.id)"> <i class="fa fa-close"></i></td></tr>` ;

                 count_art ++ ;

             }
                document.getElementById('total_art').innerHTML = count_art-1 ;
                document.getElementById('limit_obras').setAttribute("aria-valuenow" , count_art-1) ;
            })
        })
    })

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

function deleteImage(imageFullName){
    const storageRef = firebase.storage().ref();

    // Create a reference to the file to delete
    // var desertRef = storageRef.child('Kratos_God_of_War_III.png');
     var desertRef = storageRef.child(`${imageFullName}`);

// Delete the file
    desertRef.delete().then(function() {
        // File deleted successfully
        console.log('sucesso a apagar imagem')
    }).catch(function(error) {
        console.log(error.message)
        // Uh-oh, an error occurred!
    });
}
start()