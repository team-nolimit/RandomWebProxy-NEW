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

// Remove the "show" class after a short delay to allow the fade-out animation to complete
  setTimeout(function() {
    loadingOverlay.classList.remove('show');
  }, 300); // The same duration as the CSS transition (0.3s) in milliseconds
}

// Function to handle page navigation (go back)
function handlePageNavigation(event) {
  if (event.persisted) {
    hideLoadingOverlay();
  }
}

  window.addEventListener('pageshow', handlePageNavigation);
});

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
