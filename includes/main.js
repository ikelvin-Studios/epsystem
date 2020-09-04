var count = 0;
var digits = '';

$(".digit").on('click', function() {
  var num = ($(this).clone().children().remove().end().text());
  if (count < 11) {
    $("#output").append('<span>' + num.trim() + '</span>');
    digits += num.trim();
    count++
  }
});

$('.fa-long-arrow-left').on('click', function() {
  $('#output span:last-child').remove();
  count--;
})

function dial(target){
  if (target == '*961#') {
    $("#mainUSSDModal").modal("show");
  } else {
    $("#noServiceModal").modal("show");
  }

}

function dialInput(){
  // digits = $("#output").val();
  if (digits != '') {
    alert("Digits are "+ digits);
    dial(digits);
  } else {
    alert("There is nothing");
  }

}

function sendRequest(){
  choice = $("#choice").val();
  
}
