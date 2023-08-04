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

  // Hide the loading screen when the new page has finished loading
  window.addEventListener('load', function() {
    hideLoadingOverlay();
  });
});

const virustotalApiKey = 'a6dcad7cb3f5518ab77f17229a1105dddec3cdccf3c9ff07ea062309e22b0bbc';

  async function checkForMalwareWithVirusTotal(proxifiedURL) {
    try {
      const url = `https://www.virustotal.com/api/v3/urls/${encodeURIComponent(proxifiedURL)}`;
      const response = await fetch(url, {
        headers: {
          'x-apikey': virustotalApiKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        const scanResults = data.data.attributes.last_analysis_stats;

        // Check if any scan engines detected the URL as malicious
        const hasMalware = scanResults.malicious > 0;

        return hasMalware;
      } else {
        console.error('Error checking with VirusTotal:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking with VirusTotal:', error.message);
      return false;
    }
  }

  async function go() {
    var url = document.getElementById("input").value;
    if (url.trim() !== "") {
      const hasMalware = await checkForMalwareWithVirusTotal(url);

      if (hasMalware) {
        alert("The proxified website contains malware. Proceed with caution!");
      } else {
        window.onbeforeunload = showLoadingOverlay; // Show loading screen before redirecting
        window.location.href = "/service/gateway?url=" + encodeURIComponent(url);
      }
    }
  }
