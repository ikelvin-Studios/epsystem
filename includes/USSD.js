var ussdCode = '*961#';

var requestString = '';
var currentMenu = 'mainMenu';
var previousMenu = '';
var menuStep = 0;
var flowData = [];
flowData["amount"] = 0;
flowData["meter_no"] = "";
flowData["meter_list"] = [];

function checkEndpointAccess(userID){
  if (ussdCode == userID) {
    return true;
  } else {
    return false;
  }
}

function endpointAccess(userID, sampleMSISDN, userData, msgType = 1){
  if (msgType != 1) {
    USSDFlow(userData);
  } else {
    currentMenu = 'mainMenu';
    subscriberAccess(ussdCode, sampleMSISDN, showMenu('mainMenu'), 1);
  }
}

function showMenu(menuName, menuStep = 1){
  if (menuName == 'mainMenu') {
    output = '<div id="main-view" class=""> WELCOME TO E-BASED SMART PREPAID SYSTEM <ol> <li>Top Up Credit</li> <li>Check Balance</li> <li>Statement Request</li> <li>Contact Us</li> </ol> </div>';
  } else if (menuName == 'topupMenu') {
    if (menuStep == 1) {
      output = '<div id="topup-view-step-1" class=""> Enter Amount of Choice </div>';
    } else if (menuStep == 2) {
      output = '<div id="topup-view-step-2" class=""> <ol> <li>Add Meter Number</li>'+' <li>Pi33535</li> <li>Pi54366</li> </ol> </div>';
    } else if (menuStep == 3) {
      output = '<div id="topup-view-step-3" class=""> Enter Meter Number </div>';
    } else if (menuStep == 4) {
      output = '<div id="topup-view-step-4" class=""> Confirm topup to Meter Number: #Pi33535 <ol> <li>Confirm Meter Number</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 5) {
      output = '<div id="topup-view-step-5" class=""> Thanks For Purchasing Credit, You will see a Mobile Money Prompt Soon</div>';
    } else if (menuStep == 6) {
      output = '<div id="topup-view-step-6" class=""> Authorize Payment of GHS 10.00 from your account to EpSystem for Prepaid Top Up Service. Enter MMpin to continue. </div>';
    } else if (menuStep == 7) {
      output = '<div id="topup-view-step-7" class=""> <ol> <li>Confirm Purchase</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 8) {
      output = '<div id="topup-view-step-7" class=""> Purchase of GHS10.00 credit wat a success </div>';
    } else {
      output = '<div id="topup-view-error" class=""> Your option does not exist </div>';
    }

  } else if (menuName == 'balanceMenu') {
    if (menuStep == 1) {
      output = '<div id="balance-view-step-1" class=""> <ol> <li>Add Meter Number</li> <li>Previous Meter 1</li> <li>Previous Meter 2</li> </ol> </div>';
    } else if (menuStep == 2) {
      output = '<div id="balance-view-step-2" class=""> Enter Meter Number </div>';
    } else if (menuStep == 3) {
      output = '<div id="balance-view-step-3" class=""> Confirm Meter Number: #Pi33535 <ol> <li>Confirm Meter Number</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 4) {
      output = '<div id="balance-view-step-4" class=""> Your Meter Balance is #GHS Amount </div>';
    } else {
      output = '<div id="balance-view-error" class=""> Your option does not exist </div>';
    }

  } else if (menuName == 'statementMenu') {
    if (menuStep == 1) {
      output = '<div id="statement-view-step-1" class=""> <ol> <li>Add Meter Number</li> <li>Previous Meter 1</li> <li>Previous Meter 2</li> </ol> </div>';
    } else if (menuStep == 2) {
      output = '<div id="statement-view-step-2" class=""> Enter Meter Number </div>';
    } else if (menuStep == 3) {
      output = '<div id="statement-view-step-3" class=""> Confirm Meter Number: #Pi33535 <ol> <li>Confirm Meter Number</li> <li>Cancel</li> </ol> </div>';
    } else if (menuStep == 4) {
      if (true) {
        output = '<div id="statement-view-step-4" class=""> Recent Topup records for Meter Number: #Pi33535 <ol> <li>#GHS Amount on Date </li> <li>#GHS Amount on Date </li> </ol> </div>';
      } else {
        output = '<div id="statement-view-step-5" class=""> There is no recent Topup records for Meter Number: #Pi33535 </div>';
      }
    } else {
      output = '<div id="statement-view-error" class=""> Your option does not exist </div>';
    }

  } else if (menuName == 'contactMenu') {
    output = '<div id="contact-view" class=""> Send Us SMS via: 0244162072 <br/> 0. Back To HomeScreen</div>';

  } else if (menuName == 'abort') {
    output = '<div id="abort-view" class=""> Connection Aborted </div>';

  } else {
    output = 'Invalid Input Entered, Retry';
  }
// alert("hey: "+menuName+"; Step: "+menuStep);
// alert("Output: "+output);
// $("#view-area").html(output);
return output;

}

function USSDFlow(userData) {
  // subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu');

  if (currentMenu == 'mainMenu') {
    if (userData == 1) {
      currentMenu = 'topupMenu';
      menuStep = 1;
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 2) {
      currentMenu = 'balanceMenu';
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('balanceMenu'), 1);
    } else if (userData == 3) {
      currentMenu = 'statementMenu';
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('statementMenu'), 1);
    } else if (userData == 4) {
      currentMenu = 'contactMenu';
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('contactMenu'), 1);
    } else {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('invalid'), 1);
    }

  } else if (currentMenu == 'topupMenu') {
    //TODO: Do something with userData
    if (menuStep == 1) {
      // Enter Amount of Choice
      flowData["amount"] = userData;
      flowData["meter_list"] = getMeterNo();
      menuStep = 2;
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 2), 1);
    } else if (menuStep == 2) {
      if (userData == 1) {
        menuStep = 3;
        subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 3), 1);
      } else {
        // TODO: Get UserData as selection of and fetch as Meter Number
        // flowData[meter_no] = getMeterNo(userData);
        menuStep = 4;
        subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 4), 1);
      }
    } else if (menuStep == 3) {
      // TODO: Get UserData as Meter Number
      flowData[meter_no] = addMeterNo(userData);
      menuStep = 4;
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 4), 1);
    } else if (menuStep == 4) {
      if (userData == 1) {
        menuStep = 5;
        subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 5), 0);
      } else {
        subscriberAccess(ussdCode, sampleMSISDN, showMenu('abort'), 0);
      }
    } else if (menuStep == 5) {
      menuStep = 6;
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 6), 1);
    } else if (menuStep == 6) {
      // TODO: Take Momo Pin check if its 4 digits
      menuStep = 7;
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 7), 1);
    } else if (menuStep == 7) {
        if (userData == 1) {
          menuStep = 8;
        subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu', 8), 1);
      } else {
        subscriberAccess(ussdCode, sampleMSISDN, showMenu('abort'), 0);
      }
    } else {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('invalid'), 1);
    }

  } else if (currentMenu == 'balanceMenu') {
    if (userData == 1) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 2) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 3) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 4) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('invalid'), 1);
    }

  } else if (currentMenu == 'statementMenu') {
    if (userData == 1) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 2) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 3) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else if (userData == 4) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('topupMenu'), 1);
    } else {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('invalid'), 1);
    }

  } else if (currentMenu == 'contactMenu') {
    if (userData == 0) {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('mainMenu'), 1);
    } else {
      subscriberAccess(ussdCode, sampleMSISDN, showMenu('invalid'), 1);
    }

  } else {
    subscriberAccess(ussdCode, sampleMSISDN, showMenu('invalid'), 1);
  }
  // if (currentMenu == 'mainMenu') {
  //
  //
  // } else {
  //
  // }

}

function getMeterNo(targetMeter = ""){
  if (targetMeter != "") {
    // code

  } else {


  }


}

function addMeterNo(userData) {

}
