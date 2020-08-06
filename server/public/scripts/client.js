console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', saveKoala);
  $('#viewKoalas').on('click', '.readyTransferBtn', putKoala);
}


function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function(response) {
    appendKoalas(response);
  }).catch(function(error) {
    console.log('error in GET:', error);
  });
};

function appendKoalas(bears) {
  $('#viewKoalas').empty();
  for(let i = 0; i < bears.length; i++) {
    let bear = bears[i];
    $('#viewKoalas').append(`<tr data-id="${bear}">
    <td>bear.name</td>
    <td>bear.age</td>
    <td>bear.gender</td>
    <td>bear.ready_for_transfer<button class="readyTransferBtn">Ready/Not Ready for Transfer</button></td>
    <td>bear.notes</td>
    <td><button class="deleteBtn">Delete</button></td>
  </tr>`)
  };
};

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