// Function to handle Enter key press in the search bar
function handleKeyPress(e) {
  if (e.keyCode === 13) {
    // User pressed Enter in the search bar, so show the loading overlay and perform the search
    showLoadingOverlay();
    go(); // Call the existing go() function for the search
  }
}

window.addEventListener('load', function() {
  var input = document.getElementById("input");
  input.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
      showLoadingOverlay(); // Show the loading screen
      go();
    }
  });

  // Function to show the loading screen
  function showLoadingOverlay() {
    var loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.display = "flex";
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
});

function openPopup() {
      if (!hasAcceptedTerms()) {
        document.getElementById('popupOverlay').style.display = 'block';
        document.getElementById('popupContainer').style.display = 'block';
      }
    }

    // Function to close the popup
    function closePopup() {
      document.getElementById('popupOverlay').style.display = 'none';
      document.getElementById('popupContainer').style.display = 'none';
    }

    // Function to accept the terms
    function acceptTerms() {
      setTermsAccepted();
      alert('Terms accepted!');
      closePopup();
    }

    // Function to check if terms have been accepted
    function hasAcceptedTerms() {
      return document.cookie.indexOf('termsAccepted=true') !== -1;
    }

    // Function to set the terms as accepted
    function setTermsAccepted() {
      document.cookie = 'termsAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
    }

    // Open the popup on page load (you can change this behavior)
    window.onload = function () {
      openPopup();
    };
