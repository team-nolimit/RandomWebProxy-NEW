window.addEventListener('load', function() {
  var input = document.getElementById("input");
  input.addEventListener('keyup', function onEvent(e) {
      if (e.keyCode === 13) {
          go();
      }
  });
});

// Add an event listener to the input field for Enter key press
window.addEventListener('load', function () {
  var input = document.getElementById("input");
  input.addEventListener('keyup', handleKeyPress);
});

// Function to show the loading screen with a random message
function showLoadingOverlay() {
  var loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "flex";
  updateLoadingMessage(); // Update the loading message with a random one
}

function go() {
  showLoadingOverlay();
  var url = document.getElementById("input").value;
  if (url.trim() !== "") {
    window.location.href = "/service/gateway?url=" + url;
  }
}

// Function to hide the loading screen
function hideLoadingOverlay() {
  var loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "none";

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

// Attach event listener to handle page navigation (go back)
window.addEventListener('pageshow', handlePageNavigation);

  // Hide the loading screen when the new page has finished loading
  window.addEventListener('load', function() {
    hideLoadingOverlay();
  });
});
