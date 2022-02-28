$(function () {


    $( "#send" ).on( "click", function(event) {

        const subject  =  $('input[name=area]:checked', '#myform').val() ;
        const about =  $('#about_you').val();
        $(this).attr('href', `mailto:conedarte@conedarte.com?subject=${subject} ( ${about})`);
    });
})