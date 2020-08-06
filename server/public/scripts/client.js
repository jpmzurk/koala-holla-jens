console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#getKoalas')
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    saveKoala( );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );

} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
   let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  };
  // ajax call to server to get koalas
$.ajax({
  method: 'POST',
  url: '/koalas',
  data: koalaToSend
}).then(function(response) {
  console.log('the Response from server', response)
  getKoalas()
}).catch(function (error) {
  console.log('error in POST', error)
  alert('unable to add koala to server, please tray again later')
})
}
