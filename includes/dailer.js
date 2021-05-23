var count = 0;
var digits = '';
triggerVal = "";
// var requestString = '';
// var currentMenu = '';
// var previousMenu = '';
loadRecentDials();
loadMeters();

$(".digit").on('click', function() {
  var num = ($(this).clone().children().remove().end().text());
  if (count < 11) {
    $("#output").append('<span>' + num.trim() + '</span>');
    digits += num.trim();
    console.log(digits);
    count++
  }
});

$('.fa-long-arrow-left').on('click', function() {
  $('#output span:last-child').remove();
  digits = digits.slice(0, -1);
  console.log(digits);
  count--;
})

function dial(target){
  addRecentDial(target)
  sendRequest(target);
}

function dialInput(){
  // digits = $("#output").val();
  if (digits != '') {
    // alert("Digits are "+ digits);
    dial(digits);
    digits = "";
    $("#output").html("");
  } else {
    alert("There is nothing");
  }

}


function next(){
  sendRequest(getRequest());

}

function getRequest(){
  requestString = $("#requestString").val();
  $("#requestString").val("");
  return requestString;
}

function sendRequest(request){
  networkAccess(request)
  return true;
}


function trigger(){
  if (triggerVal != "") {
    sendRequest(triggerVal);
  } else {
    terminateAccess();

  }
}

$('#mainUSSDModal').on("hidden.bs.modal", function() {
  trigger();
});

function addRecentDial(target){
  recentDials.push(target);
  console.log("New Recent Dial: "+target);
  updateRecentDials();
}
