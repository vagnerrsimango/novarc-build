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


function getId () {

    const quey  = window.location.search ;
    const urlParams = new URLSearchParams(quey);
    return urlParams.get('id');


}

var artist_container = document.getElementById('artist_container');
var count  =Number(1)   ;
function start() {

    firebase.database().ref('/artists').once('value').then(function(snapshot) {


        snapshot.forEach((childSnapShot)=>{

            const artist  =  childSnapShot.val()


            artist_container.innerHTML+= `<div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <a href="./profile.html?id=${artist.id}"><img class="card-img-top" src="${artist.avatar}" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="./profile.html?id=${artist.id},window.location.search">${artist.name}</a>
                            </h4>
                          
                            <p class="card-text"><strong>${artist.category}</strong></p>
                        </div>
                        <div class="card-footer">
                            
                        </div>
                    </div>
                </div>`;


        })

        document.getElementById('progress_id_container').style.display = "none";

    })


}

function show(id){
    firebase.database().ref('/artists/'+id).once('value').then(function(snapshot) {


        const artist = snapshot.val() ;

        document.getElementById('artist_name').innerText = artist.name;
        document.getElementById('artist_category').innerText = artist.category  ;
        document.getElementById('artist_about_begin').innerText = artist.about_begin  ;
        document.getElementById('artist_inspiration').innerText = artist.about_ispiration  ;
        document.getElementById('artist_motivation').innerText = artist.about_tecnique  ;
        document.getElementById('artist_highlights').innerText = artist.about_experience  ;
        document.getElementById('artist_avatar').src = artist.avatar  ;

        snapshot.forEach(function (childSnapShot) {

            const art  =  childSnapShot.val() ;

            if(typeof art.art_name === 'undefined'){
                console.log( typeof  art.art_name)

            }
            else{

                document.getElementById('progress_id').style.display = "none";
                document.querySelector('#artist_cover').style.backgroundImage = `url('${art.art_photo}') `
                document.getElementById('artist_art_list').innerHTML+=` <li>
                  <div class="row">
                    <div class="col-lg-2 col-md-4 col-4 ml-auto mr-auto">
                      <img src="${art.art_photo}" alt="Circle Image" class="img-circle img-no-padding img-responsive">
                    </div>
                    <div class="col-lg-7 col-md-4 col-4  ml-auto mr-auto">
                      <h6>${art.art_name}
                        <br/>
                        <small>${art.art_year}</small>
                      </h6>
                    </div>

                  </div>
                </li>
                <hr />`;
            }


        })
    }

    )


}
show(getId())


start()