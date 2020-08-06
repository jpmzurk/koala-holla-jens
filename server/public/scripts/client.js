console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', saveKoala);
  $('#viewKoalas').on('click', '.readyTransferBtn', putKoala);
}


function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    appendKoalas(response);
  }).catch(function (error) {
    console.log('error in GET:', error);
  });
};

function appendKoalas(bears) {
  console.log('inside append the bears')
  $('#viewKoalas').empty();
  for (let i = 0; i < bears.length; i++) {
    let bear = bears[i];
    console.log(bear);
    let $tr = $(`<tr></tr>`);
    $tr.data('bear', bear);
    $tr.append(`<td>${bear.name}</td>`);
    $tr.append(`<td>${bear.age}</td>`);
    $tr.append(`<td>${bear.gender}</td>`);
    $tr.append(`<td>${bear.ready_to_transfer}<button class="readyTransferBtn">Ready/Not Ready for Transfer</button></td>`);
    $tr.append(`<td>${bear.notes}</td>`);
    $tr.append(`<td><button class="deleteBtn">Delete</button></td>`)
    $('#viewKoalas').append($tr);
  };
}
function saveKoala() {
  console.log('in saveKoala',);
  // ajax call to server to get koalas
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  };
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then(function (response) {
    console.log('the Response from server', response)
    getKoalas()
  }).catch(function (error) {
    console.log('error in POST', error)
    alert('unable to add koala to server, please tray again later')
  })
}


function putKoala() {
  let clickedId = $(this).closest('tr').data('bear').id;
  let bear = $(this).closest('tr').data('bear');

  console.log(clickedId, bear);

  $.ajax({
    method: 'PUT',
    url: `/koalas/${clickedId}`,
    data: bear

  }).then(function (response) {
    console.log('in putKoala', response);
    getKoalas();

  }).catch(function (error) {
    console.log('this is the error', error);
  })

}