// Function to handle Enter key press in the search bar
function handleKeyPress(e) {
  if (e.keyCode === 13) {
    // User pressed Enter in the search bar, so show the loading overlay and perform the search
    showLoadingOverlay();
    go(); // Call the existing go() function for the search
  }
}

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

  function go() {
  var url = document.getElementById("input").value.trim(); // Get the input value and trim whitespace

  if (url !== "") {
    showLoadingOverlay(); // Show the loading overlay
    // Construct the URL for redirection, replace spaces with %20 for valid URLs
    url = "/service/gateway?url="+url;
    
    // Redirect to the constructed URL
    window.location.href = url;
  }
}

  // Hide the loading screen when the new page has finished loading
  window.addEventListener('load', function() {
    hideLoadingOverlay();
  });
});
