var request= '';
var currentConnection = '';
var sampleMSISDN = '0549500940';

function networkAccess(request){
  if (currentConnection == '') {
    if (request == '*961#') {
      request = '*961#';
      currentConnection = '*961#';
      endpointAccess(currentConnection, sampleMSISDN, request, 1);
      $("#mainUSSDModal").modal("show");
    } else {
      $("#noServiceModal").modal("show");
    }
  } else {
    endpointAccess(currentConnection, sampleMSISDN, request, 0);
  }


  return true;
}
