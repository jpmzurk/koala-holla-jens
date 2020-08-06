console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  
    // call saveKoala with the new object
    // saveKoala( koalaToSend );

} 


function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
function putKoala() {
  let clickedId = $(this).closest('tr').data('bear').id;
  let bear = $(this).closest('tr').data('bear')

  console.log(clickedId, bear);
  
  $.ajax({
    method: 'PUT',
    url: `/koalas/${clickedId}`,
    data: bear
    
  }).then (function (response) {
    console.log('in putKoala', response);
    getKoalas();

  }).catch(function(error){
    console.log('this is the error', error);
  })
  
}