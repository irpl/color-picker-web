$(".copy").bind("mousedown touchstart", function () {
  $(".copyHEX").addClass("Buttonleft");
  $(".copyRGB").addClass("Buttoncenter");
  $(".copyHSL").addClass("Buttonright");
  $(".copy").hide();
});

$(".copyHEX").bind("mousedown touchstart", function () {
  $(this).addClass("ripple");
  setTimeout(function () {
    $(".copyHEX").removeClass("Buttonleft");
    $(".copyRGB").removeClass("Buttoncenter");
    $(".copyHSL").removeClass("Buttonright");
    $(".copy").show();
    $(".copyHEX").removeClass("ripple");
    $(".result").slideDown(300);
    $(".result input")
      .val(rgb2hex($("#drag").css("background-color")))
      .select();
  }, 800);
});

$(".copyRGB").bind("mousedown touchstart", function () {
  $(this).addClass("ripple");
  setTimeout(function () {
    $(".copyHEX").removeClass("Buttonleft");
    $(".copyRGB").removeClass("Buttoncenter");
    $(".copyHSL").removeClass("Buttonright");
    $(".copy").show();
    $(".copyRGB").removeClass("ripple");
    $(".result").slideDown(300);
    $(".result input").val($("#drag").css("background-color")).select();
  }, 800);
});

$(".copyHSL").bind("mousedown touchstart", function () {
  $(this).addClass("ripple");
  setTimeout(function () {
    $(".copyHEX").removeClass("Buttonleft");
    $(".copyRGB").removeClass("Buttoncenter");
    $(".copyHSL").removeClass("Buttonright");
    $(".copy").show();
    $(".copyHSL").removeClass("ripple");
    $(".result").slideDown(300);
    $(".result input").val(HSLvalue).select();
  }, 800);
});

///// Convert to hex. Source (http://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value)
var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
}
/////

var widthInitial = parseInt($("#horiz").html());
var heightInitial = parseInt($("#vert").html());
var windowWidth = $(window).width() / 100;
var windowHeight = $(window).height() / 100;

if (heightInitial >= 0 && heightInitial < 50) {
  $("#drag, .button").css("color", "white");
  $(".button").css("background", "rgba(255,255,255,0.15)");
} else if (heightInitial > 50 && heightInitial <= 100) {
  $("#drag, .button").css("color", "black");
  $(".button").css("background", "rgba(0,0,0,0.15)");
}

$("#drag").css("background", "hsla(" + widthInitial + ",85%," + heightInitial + "%,1)");

$("#drag").bind("mousedown touchstart", function (e) {
  e.preventDefault();
  var widthInitial = parseInt($("#horiz").html());
  var heightInitial = parseInt($("#vert").html());
  var xInitial = e.originalEvent.pageX;
  var yInitial = e.originalEvent.pageY;

  $(document).bind("mousemove touchmove", function (e) {
    e.preventDefault();
    $(".result").slideUp(300);
    $("#instruct").fadeOut();
    var movePos = Math.min(Math.max(parseInt(Math.round(((e.originalEvent.pageX - xInitial) / windowWidth) * 3.6) + widthInitial), 0), 360);
    var movePosVert = Math.min(Math.max(parseInt(Math.round((e.originalEvent.pageY - yInitial) / windowHeight) + heightInitial), 0), 100);

    $("#drag").css("background", "hsla(" + movePos + ",85%," + movePosVert + "%,1)");
    let rgb = $("#drag").css("background-color");
    rgb = rgb
      .substring(4, rgb.length - 1)
      .replace(/ /g, "")
      .split(",");

    // console.log(rgb);
    let request_body = {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
    };
    fetch("/color", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_body),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json(); //we only get here if there is no error
      })
      .then((json) => console.log(json));
    $(".result").css("background", "hsla(" + (movePos + 5) + ",85%," + (movePosVert + 15) + "%,1)");

    $("#horiz").html(movePos);
    $("#vert").html(movePosVert + "%");
    if (movePosVert >= 0 && movePosVert < 50) {
      $("#drag, .button").css("color", "white");
      $(".button").css("background", "rgba(255,255,255,0.15)");
    } else if (movePosVert > 50 && movePosVert <= 100) {
      $("#drag, .button").css("color", "black");
      $(".button").css("background", "rgba(0,0,0,0.15)");
    }

    HSLvalue = "hsl(" + movePos + ",85%," + movePosVert + "%)";
  });
});

$(document).bind("mouseup touchend", function (e) {
  e.preventDefault();
  $(document).unbind("mousemove touchmove");
});
