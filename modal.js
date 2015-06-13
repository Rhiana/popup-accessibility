function modal_set_up(buttonID, modalID) {
  // To keep tab focus when exiting the modal
  var that = this;
  that.$refocus = null;

  // Clicking the button opens the modal and saves tab focus
  $('#' + buttonID).on('click', function() {
    showModal($('#' + modalID));
    that.$refocus = ($(this));
    return false;
  });

  // Pressing enter on the button opens the modal and saves tab focus
  $('#' + buttonID).on('keydown', function(event) {
    var keycode = event.charCode || event.keyCode;
    if (keycode == 13) {
      showModal($('#' + modalID));
      that.$refocus = ($(this));
      return false;
    }
  });

  // Changes certain keys whilst the modal is open
  $('#' + modalID).on('keydown', function(event) {
    keyHandeler($(this), event);
  });

  // Closing the modal closes the modal and resumes tab focus
  $('.modalCloseButton').on('click', function() {
    hideModal($('#' + modalID), that.$refocus);
  });
}

function keyHandeler($obj, evt) {
  // Close on esc key
  // Key the tab contained to the modal only
  // Allow enter and space key for forms and closing modal
  // Disable other key presses
  var keycode = evt.charCode || evt.keyCode;
  var $focused        = $(':focus')[0]; // focusable added in jquery ui
  var $focusable      = $obj.find(":focusable");
  var $currentFocus   = $.inArray($focused, $focusable);

  if (keycode == 27) {
    $('.modalCloseButton').click();
    return false;
  } else if (keycode == 9 && $focusable.length > 1) {
    if (evt.shiftKey) {
      if ($currentFocus == 0) {
        $focusable.get($focusable.length -1).focus();
      }
    } else {
      if ($currentFocus == $focusable.length - 1) {
        $focusable.eq(0).focus();
      }
    }
  } else if (keycode == 13 || keycode == 32) {
      return true;
  } else {
      evt.preventDefault();
  }
}

function mouseHandler($obj) {
  // Disable scroll wheel and touchscreen scrolling
  $obj.on('mousewheel touchmove', function(){
    return false;
  });
}

function showModal($modelID) {
  $modelID.modal(); //sets up using bootstrap modal code
  mouseHandler($('.modal-backdrop'));
  mouseHandler($modelID);

  $modelID.on('shown.bs.modal', function (e) {
    $(".start_dialog").focus(); //tab focus to start at heading
    $('body').attr('aria-hidden', 'true');
  });
}

function hideModal($modelObj, $re) {
  $modelObj.on('hidden.bs.modal', function (e) {
    $('body').attr('aria-hidden', 'false');
  });
  $re.focus(); //return to current tab focus
}
