window.addEventListener('load', function() {
  var input = document.getElementById("input");
  input.addEventListener('keyup', function onEvent(e) {
      if (e.keyCode === 13) {
          showLoadingOverlay(); // Show the loading screen
          go();
      }
  });
});

function showLoadingOverlay() {
  var loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "flex";
}

function hideLoadingOverlay() {
  var loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "none";
}

function go() {
  var url = document.getElementById("input").value;
  if (url.trim() !== "") {
    window.onbeforeunload = showLoadingOverlay; // Show loading screen before redirecting
    window.location.href = "/service/gateway?url=" + url;
  }
}

// Hide the loading screen when the new page has finished loading
window.addEventListener('load', function() {
  hideLoadingOverlay();
});
