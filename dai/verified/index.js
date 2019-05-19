function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
  var verified = "";
  var notVerified = "";
  switch (lang) {
    case "en":
      verified = "E-mail verified!";
      notVerified = "Error verifying your e-mail";
      break;
    case "es":
      verified = "E-mail verificado!";
      notVerified = "Error al verificar tu e-mail";
      break;
    default:
  }
  auth
    .applyActionCode(actionCode)
    .then(function(resp) {
      document.getElementById("success").style.display = "block";
      document.getElementById("response").innerHTML = verified;
    })
    .catch(function(error) {
      document.getElementById("error").style.display = "block";
      document.getElementById("response").innerHTML = notVerified;
    });
}

document.addEventListener(
  "DOMContentLoaded",
  function() {
    var mode = getParameterByName("mode");
    var actionCode = getParameterByName("oobCode");
    var continueUrl = getParameterByName("continueUrl");
    var lang = getParameterByName("lang") || "en";

    var config = {
      apiKey: "AIzaSyCJy2qD-0y07hLqKDBgA4nxbugmDfNCkSo"
    };
    var app = firebase.initializeApp(config);
    var auth = app.auth();

    switch (mode) {
      case "verifyEmail":
        handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      default:
    }
  },
  false
);

var success = bodymovin.loadAnimation({
  container: document.getElementById("success"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "success.json"
});

var error = bodymovin.loadAnimation({
  container: document.getElementById("error"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "error.json"
});
