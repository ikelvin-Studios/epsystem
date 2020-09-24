var request= '';
var currentConnection = '';
var sampleMSISDN = '0549500940';



function networkAccess(request){
  console.log(request);
  // if (request != '') {
  //
  // } else {
  //
  // }
  if (currentConnection == '') {
    if (checkEndpointAccess(request)) {
      request = request;
      currentConnection = request;
      $("#mainUSSDModal").modal("show");
      endpointAccess(currentConnection, sampleMSISDN, request, 1);

    } else {
      $("#noServiceModal").modal("show");
    }
  } else {
    // $("#mainUSSDModal").modal("hide");
    // $("#mainUSSDModal").modal("show");
    endpointAccess(currentConnection, sampleMSISDN, request, 0);

  }

  return true;
}




function subscriberAccess(userID, sampleMSISDN,  msg, msgType = 1){
  if (msgType == true) {
    $("#view-area").html(msg);
    $(".flow-items").show();
    $(".trigger-items").hide();
  } else {
    $("#view-area").html(msg);
    $(".flow-items").hide();
    $(".trigger-items").show();
  }
}

function terminateAccess(){
  currentConnection = '';
  $("#mainUSSDModal").modal("hide");
}
