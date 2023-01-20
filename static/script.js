var names = [
  "Abe",
  "Abraham",
  "Addison",
  "Adelaide",
  "Adeline",
  "Agatha",
  "Agnes",
  "Albert",
  "Alejandra",
  "Alice",
  "Alma",
  "Amara",
  "Ambrose",
  "Amos",
  "Anita",
  "Ansel",
  "Archie",
  "Aron",
  "Arthur",
  "Artie",
  "Atticus",
  "August",
  "Barron",
  "Bea",
  "Beatrix",
  "Beau",
  "Benedict",
  "Bennett",
  "Bernadette",
  "Bernard",
  "Bertie",
  "Bessie",
  "Birdie",
  "Blaine",
  "Blevins",
  "Blythe",
  "Bonnie",
  "Brady",
  "Calliope",
  "Camille",
  "Carlo",
  "Carole",
  "Cassady",
  "Celia",
  "Clara",
  "Clarence",
  "Clellon",
  "Clifford",
  "Cole",
  "Colette",
  "Connie",
  "Cornelius",
  "Cyrus",
  "Dahlia",
  "Daisy",
  "Damion",
  "Darcy",
  "Dean",
  "Denton",
  "Dessie",
  "Dodie",
  "Dominic",
  "Dora",
  "Doris",
  "Dorothy",
  "Earl",
  "Edison",
  "Edith",
  "Edmund",
  "Edwin",
  "Elaine",
  "Eleanor",
  "Elijah",
  "Ellis",
  "Elmer",
  "Elon",
  "Elrod",
  "Emile",
  "Emily",
  "Emma",
  "Emmett",
  "Enid",
  "Ernest",
  "Erwin",
  "Ethel",
  "Etta",
  "Eugenie",
  "Evangeline",
  "Evelyn",
  "Ezra",
  "Faith",
  "Fanny",
  "Faye",
  "Felix",
  "Fletcher",
  "Flora",
  "Florence",
  "Frances",
  "Francis",
  "Frank",
  "Gabrielle",
  "Gael",
  "Galatea",
  "Genevieve",
  "George",
  "Georgia",
  "Gerald",
  "Gert",
  "Gertrude",
  "Gracy",
  "Greta",
  "Gunther",
  "Gus",
  "Harmon",
  "Harold",
  "Harper",
  "Harriet",
  "Harvey",
  "Hattie",
  "Hayden",
  "Hazel",
  "Hector",
  "Henrietta",
  "Henry",
  "Herbert",
  "Hester",
  "Hilda",
  "Holden",
  "Hope",
  "Howard",
  "Hugh",
  "Ian",
  "Ignatius",
  "Imogen",
  "Inez",
  "Irene",
  "Iris",
  "Isabella",
  "Jane",
  "Jarrett",
  "Jasper",
  "Jedediah",
  "Jerry",
  "Joan",
  "Jocelyn",
  "Joel",
  "Josephine",
  "Joyce",
  "Julien",
  "Katherine",
  "Kenneth",
  "Kingsley",
  "Lacey",
  "Lacy",
  "Langston",
  "Laura",
  "Lee",
  "Lincoln",
  "Liza",
  "Lorraine",
  "Louis",
  "Lucas",
  "Lucille",
  "Lucinda",
  "Luisa",
  "Lydia",
  "Margaret",
  "Marjorie",
  "Marshall",
  "Martha",
  "Mathilde",
  "Maxine",
  "Mickey",
  "Milton",
  "Minnie",
  "Miriam",
  "Mollie",
  "Morgan",
  "Neal",
  "Nell",
  "Nelson",
  "Neville",
  "Nora",
  "Norene",
  "Norman",
  "Octavia",
  "Olive",
  "Opal",
  "Orville",
  "Oscar",
  "Otis",
  "Owen",
  "Patricia",
  "Pearl",
  "Penelope",
  "Peyton",
  "Pierce",
  "Polly",
  "Pollyanna",
  "Posey",
  "Presley",
  "Preston",
  "Ralph",
  "Randall",
  "Rawlins",
  "Raymond",
  "Reed",
  "Reginald",
  "Richard",
  "Rodney",
  "Rolla",
  "Rollo",
  "Rosemary",
  "Roy",
  "Ruby",
  "Ruth",
  "Rutherford",
  "Sadie",
  "Sal",
  "Sandra",
  "Scarlet",
  "Selma",
  "Seraphina",
  "Shadrack",
  "Sherman",
  "Shirley",
  "Shoshana",
  "Sophia",
  "Spencer",
  "Stanley",
  "Sterling",
  "Susannah",
  "Sylvia",
  "Theodore",
  "Tobias",
  "Tobin",
  "Trudy",
  "Una",
  "Valentina",
  "Vera",
  "Viola",
  "Violet",
  "Virginia",
  "Waldo",
  "Whitman",
  "Wilber",
  "Wilbert",
  "Willa",
  "Willie",
  "Windsor",
  "Winston",
  "Wren",
  "Wright",
  "Wyatt",
];
var identifier;

$(window).on("load", function () {
  if (localStorage.getItem("identifier") == null) {
    var name = names[Math.floor(Math.random() * names.length)];
    var number = Date.now() % 10000;

    identifier = name + "#" + number;
    localStorage.setItem("identifier", identifier);
  }
  identifier = localStorage.getItem("identifier");
  $(".identifier").html(identifier);
});

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
  var xInitial = e.originalEvent.pageX || e.changedTouches[0].pageX;
  var yInitial = e.originalEvent.pageY || e.changedTouches[0].pageY;

  // var test1 = e.changedTouches[0].pageX;
  // var test2 = e.changedTouches[0].pageY;

  $(document).bind("mousemove touchmove", function (e) {
    e.preventDefault();
    $(".result").slideUp(300);
    $("#instruct").fadeOut();
    var movePos = Math.min(Math.max(parseInt(Math.round((((e.originalEvent.pageX || e.changedTouches[0].pageX) - xInitial) / windowWidth) * 3.6) + widthInitial), 0), 360);
    var movePosVert = Math.min(Math.max(parseInt(Math.round(((e.originalEvent.pageY || e.changedTouches[0].pageY) - yInitial) / windowHeight) + heightInitial), 0), 100);

    $("#drag").css("background", "hsla(" + movePos + ",85%," + movePosVert + "%,1)");
    let rgb = $("#drag").css("background-color");
    rgb = rgb
      .substring(4, rgb.length - 1)
      .replace(/ /g, "")
      .split(",");

    // console.log(rgb);
    let request_body = {
      i: identifier,
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
      .then((json) => {
        console.log(json);
        $(".position").html(json.p);
      });
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
