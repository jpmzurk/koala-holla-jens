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
  $('#viewKoalas').on('click', '.deleteBtn', deleteBear);
  $('#viewKoalas').on('click', '.edit', editABear);
  $('#viewKoalas').on('click', '.cancel', editABear);
}


function submitEditedBear (bear){

  $.ajax({
    method: 'PUT',
    url: `/koalas/reSubmit`,
    data: bear

  }).then(function (response) {
    console.log('in resubmitBear', response);
    getKoalas();

  }).catch(function (error) {
    console.log('this is the error', error);
  })
}


function editABear() {
  let $currentRow = $(this).closest('tr');
  let $thisTd = $(this).closest('tr').children('td');
  let disableEditable = ($currentRow).prop('contenteditable', false);
  let enableEditable = ($currentRow).prop('contenteditable', true);
  let cancelButton = '<td> <button class="cancel btn btn-outline-secondary"> Cancel </button> </td>';
  let cancelButtonLocation = ($currentRow).children('td').eq(7);
  
  let stringOfTd = $thisTd.eq(3).text();;
  let readyToTransfer = stringOfTd.replace(/ .*/,'');

  if (readyToTransfer == 'NoReady/Not' ){
    readyToTransfer === 'No';
  } else if(readyToTransfer == 'YesReady/Not'){
    readyToTransfer === 'Yes';
  }
  

  if ($(this).text() == 'Done' ){
      $(disableEditable);
      //change name of button
      $(this).html('Edit');
      //pull in edited text
      let bear = {};
      bear.id = $(this).closest('tr').data('bear').id;
      bear.name = $thisTd.eq(0).text();
      bear.age = Number($thisTd.eq(1).text());
      bear.gender = $thisTd.eq(2).text();
      bear.ready_to_transfer = readyToTransfer;
      bear.notes = $thisTd.eq(4).text();

      //update data-bear object
      $currentRow.data('bear', bear);
      //remove cancel button
      $(cancelButtonLocation).remove();
      //running resubmit function
      submitEditedBear(bear);
     
  } else if ($(this).text() == 'Edit' ) {
      $(enableEditable);
      //change name of button
      $(this).html('Done')
      //add Cancel Button
      $currentRow.append(cancelButton)
  }
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('current list of bears ', response);
    
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
    let $tr = $(`<tr></tr>`);
    $tr.data('bear', bear);
    $tr.append(`<td class="bearStuff">${bear.name}</td>`);
    $tr.append(`<td class="bearStuff">${bear.age}</td>`);
    $tr.append(`<td class="bearStuff">${bear.gender}</td>`);
    $tr.append(`<td class="bearStuff" >${bear.ready_to_transfer}<button class="readyTransferBtn btn btn-outline-secondary">Ready/Not Ready for Transfer</button></td>`);
    $tr.append(`<td class="bearStuff">${bear.notes}</td>`);
    $tr.append(`<td><button class="deleteBtn btn btn-outline-secondary">Delete</button></td>`);
    $tr.append(`<td><button class="edit btn btn-outline-secondary">Edit</button></td>`);                                    //ADDED EDIT                     
    $('#viewKoalas').append($tr);
  };
}
function saveKoala() {
  console.log('in saveKoala');
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

    $('#nameIn').val(''); 
    $('#ageIn').val('');
    $('#genderIn').val('');
    $('#readyForTransferIn').val('')
    $('#notesIn').val('')

  }).catch(function (error) {
    console.log('error in POST', error)
    alert('unable to add koala to server, please tray again later')
  })
}

function putKoala() {
  let bear = $(this).closest('tr').data('bear');
  console.log(bear);

  $.ajax({
    method: 'PUT',
    url: `/koalas/`,
    data: bear

  }).then(function (response) {
    console.log('in putKoala', response);
    getKoalas();

  }).catch(function (error) {
    console.log('this is the error', error);
  })
}

function deleteBear () {
  let clickedId = $(this).closest('tr').data('bear').id;
// :( sad
  console.log(clickedId);

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${clickedId}`,
  }).then(function (response) {
    console.log('in putKoala', response);
    getKoalas();

  }).catch(function (error) {
    console.log('this is the error', error);
  })
}