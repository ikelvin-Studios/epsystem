var meterData = [];
var recentDials = [];
// var meterStatement = "";


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



function loadMeters() {
  meterData = getCookie("meterData");
  if (meterData != "") {
    meterData = JSON.parse(getCookie("meterData"));
    console.log("Meters Loaded Successful");
    console.log(meterData);

  }
}

function updateMeters() {
  meterDataString = JSON.stringify(meterData);
  setCookie("meterData", meterDataString, 1095);
  console.log("MeterData Updated");

  // loadAccount();
  // window.location.assign("./");

}

function resetMeters(){
  setCookie("meterData", "", -1100);
  // window.location.reload();
}


function loadRecentDials() {
  recentDials = getCookie("recentDials");
  if (recentDials != "") {
    recentDials = JSON.parse(getCookie("recentDials"));
    console.log("recentDials Loaded Successful");
    console.log(meterData);

    $(".recentDial-list").html("");
    recentDials.forEach(function(item, index) {
      // item = JSON.parse(item);
      listItem = '<li class="" onclick="dial(\''+item+'\')"><a><i class="fa fa-external-link-square text-success"></i> <span>'+item+'</span></a></li>';

      $(".recentDial-list").prepend(listItem);

    });
// console.log(invoiceItemsList.length);

    // listItem = '<li class="" onclick="dial(\'*170#\')"><a><i class="fa fa-external-link-square text-success"></i> <span>*170#</span></a></li>';
    // $(".recentDial-list").html(listItem);

  } else {
    recentDials = [];
  }
}

function updateRecentDials() {
  recentDialsString = JSON.stringify(recentDials);
  setCookie("recentDials", recentDialsString, 1095);
  console.log("recentDials Updated");
  loadRecentDials();
  // window.location.assign("./");

}

function resetRecentDials(){
  setCookie("recentDials", "", -1100);
  // window.location.reload();
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
