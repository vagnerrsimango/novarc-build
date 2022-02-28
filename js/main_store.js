var database = firebase.database();
const btnPayment = document.getElementById('btn-submit-payment');
//TODO :  debug dos artistas .
function start() {
    getAllArtWork()
    getNewArtWork()

}
function getAllArtists() {

    const artist_container =  document.getElementById('artist_belog');

    artist_container.innerHTML = `<option selected>Aguarde ...</option>`;

    database.ref('artists').once('value').then(function (snapshot) {

        artist_container.innerHTML = `<option selected>Selecione o artista </option>`;
        snapshot.forEach((childSnapshot)=>{
            const artist  =  childSnapshot.val() ;

            artist_container.innerHTML += `<option id="${artist.id}" name="${artist.name}">${artist.name}</option>` ;


        })
    })



}

function addArt(artistId, art) {
    database.ref('store/').push(art).then(()=>{
        document.getElementById("btn_submit_art").disabled = false;

        alert('Adicionado com sucesso ! ')
    }).catch(()=>{

    })

}

function addArtListenner() {
    const btn =  document.getElementById("btn_submit_art") ;
    btn.disabled = true;
    btn.innerText = 'aguarde...' ;
    const artist =  document.getElementById('artist_belog');
    const artist_id =  artist.options[artist.selectedIndex].id ;
    const artist_name =  artist.options[artist.selectedIndex].value;
    const art_name =  document.getElementById('art_name').value ;
    const art_price  =  document.getElementById('art_price').value ;
    const art_price2  =  document.getElementById('art_price2').value ;
    const art_desc =  document.getElementById('art_desc').value ;
    const art_desc2 =  document.getElementById('art_desc2').value ;
    const art_year =  document.getElementById('art_year').value ;
    const file  = document.getElementById('art_photo').files[0]
    art = {

        "artist_id" : artist_id,
        "art_name" : art_name ,
        "art_price" : art_price ,
        "art_price2" : art_price2 ,
        "art_desc" : art_desc ,
        "art_desc2" : art_desc ,
        "art_year" : art_year,
        "image_ref": file.name ,
        "artist_name":artist_name ,
        "created_at": new Date().getTime()

    }


    const ref = firebase.storage().ref('store');

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

function closeModal() {
    $(function () {

        $('#add_art_modal').modal('hide');
    })
}

function startProgress(time) {
const btn = document.getElementById('btn_submit_art');
    btn.innerHTML = time + "%" ;
    if(time==100){
        closeModal()
    }
}

function getNewArtWork(){

    firebase.database().ref('/store').orderByChild( "created_at" ).limitToFirst(9).once('value').then(function(snapshot) {

        var art  = {} ;



        snapshot.forEach(function (chilSnapShot) {


            art = chilSnapShot.val();

            document.getElementById('art_work_store').innerHTML+=`     <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <a href="${art.art_photo}"><img class="card-img-top" src="${art.art_photo}" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="#">${art.art_name}</a>
                            </h4>
                            <h6>${art.art_desc}</h6>
                            <h5>${art.art_price} MT</h5>
                             <h6>${art.art_price} MT (${art.art_desc} )</h6>
                            
                            <p class="card-text">Por : <strong>${art.artist_name}</strong></p>
                        </div>
                        <div class="card-footer">

                        </div>
                    </div>
                </div>`
        })
    })

}

function getAllArtWork(){


    firebase.database().ref('/store').orderByChild("art_desc").once('value').then(function(snapshot) {

        var art  = {} ;


        snapshot.ref.orderByChild("art_desc");
     

        snapshot.forEach(function (chilSnapShot) {

          

            art = chilSnapShot.val();

            document.getElementById('art_work_store_all').innerHTML+=`     <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <a href="${art.art_photo}"><img class="card-img-top" src="${art.art_photo}" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="#">${art.art_name}</a>
                            </h4>
                            <h6>${art.art_desc}</h6>
                            <h5>${art.art_price} MT</h5>
                            <p class="card-text">Por : <strong>${art.artist_name}</strong></p>
                             <button type="submit" class="btn btn-round btn--danger" onclick="performPaymentListener(${art.art_price})">comprar</button>
                        </div>
                        <div class="card-footer">


                        </div>
                    </div>
                </div>`
        })
    })

}

function performPaymentListener(price){
    document.getElementById('paymentAmountText').innerText=price;
    $("#paymentModalForm").modal('show')


}
function verifyUser() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            const id = user.uid ;

            // getUserData(id)


            // ...
        } else {

            // hide(use_display)

            // User is signed out.
            // ...
        }
    });


}

// verifyUser()

start()

function getUserData(id) {

    const starCountRef =  database.ref('users/'+id);
    starCountRef.on('value', function(snapshot) {
        const user = snapshot.val() ;
        console.log(snapshot.val().displayName)

        document.getElementById('payment-name').value=user.displayName;
        document.getElementById('payment-mail').value=user.email;
        document.getElementById('payment-phone').value=user.phone;
        document.getElementById('payment-address').value=user.address;


    });

}

function payListenner() {

    console.log('requesting')
    document.getElementById('btn-submit-payment').innerText = 'consulte o celular'
    const phone = document.getElementById('payment-phone').value ;
    const amount = document.getElementById('paymentAmountText').innerText;
    console.log(phone)
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','*');

    fetch(`http://192.168.157.1:8002/v1/pay?number=258${phone}&amount=${amount}`)
        .then(response =>response.json())
        .then((json)=>{
            console.log('response=>' , json)
            document.getElementById('btn-submit-payment').innerText='Pagamento efectuado com sucesso !'
          
            setTimeout(()=>{
                $("#successModal").modal('show')
            }, 1500)
           
        }).catch('error=>' , err=>console.log(err));

}