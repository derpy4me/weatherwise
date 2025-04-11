import {searchCity} from './weatherApi';

const searchInput = document.querySelector('.searchInput');
let resultsContainer = null; // Will be created dynamically

function formatLocationName(location) {
  if (!location || typeof location !== 'object') {
    return 'Invalid location data';
  }

  // Build the display name, starting with the city name
  let displayNameParts = [location.name];

  // Add administrative regions, avoiding duplicates with the city name or each other
  if (location.admin2 && location.admin2 !== location.name) {
    displayNameParts.push(location.admin2);
  }
  if (location.admin1 && location.admin1 !== location.name && !displayNameParts.includes(location.admin1)) {
    displayNameParts.push(location.admin1);
  }
  // Always add the country
  if (location.country) {
    displayNameParts.push(location.country);
  }

  // Join the parts with a comma and space
  return displayNameParts.join(', ');
}

function displayResults(results) {
  // Clear previous results and ensure container exists
  if (!resultsContainer) {
    console.error("Results container not found.");
    return;
  }
  resultsContainer.innerHTML = ''; // Clear previous results or messages

  if (!results || results.length === 0) {
    resultsContainer.textContent = 'No locations found.';
    return;
  }

  const resultsList = document.createElement('ul');
  resultsList.className = 'searchResultsList'; // Add class for styling

  results.forEach(location => {
    const listItem = document.createElement('li');
    listItem.className = 'searchResultItem'; // Add class for styling
    listItem.textContent = formatLocationName(location);

    // Store latitude and longitude directly on the element using data attributes
    listItem.dataset.latitude = location.latitude;
    listItem.dataset.longitude = location.longitude;
    listItem.dataset.name = formatLocationName(location); // Store formatted name too

    // Make item accessible
    listItem.setAttribute('tabindex', '0'); // Allow keyboard focus
    listItem.setAttribute('role', 'button'); // Semantics for accessibility

    resultsList.appendChild(listItem);
  });

  // Use event delegation for handling clicks on list items
  resultsList.addEventListener('click', handleResultSelection);
  resultsList.addEventListener('keydown', (event) => {
    // Allow selection with Enter key for accessibility
    if (event.key === 'Enter' && event.target.classList.contains('searchResultItem')) {
      handleResultSelection(event);
    }
  });


  resultsContainer.appendChild(resultsList);
}

function handleResultSelection(event) {
  const selectedItem = event.target;

  // Ensure the click/keydown was directly on a list item
  if (!selectedItem || !selectedItem.classList.contains('searchResultItem')) {
    return;
  }

  const lat = selectedItem.dataset.latitude;
  const lon = selectedItem.dataset.longitude;
  const name = selectedItem.dataset.name; // Get the formatted name

  if (lat && lon) {
    const geoLoc = {
      // Convert to numbers for consistency, though sessionStorage stores strings
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

    try {
      sessionStorage.setItem('geoLoc', JSON.stringify(geoLoc));
      console.log(`Selected: ${name}`);
      console.log('Stored in sessionStorage:', sessionStorage.getItem('geoLoc'));

      // --- User Feedback ---
      // 1. Optionally, update the input field with the selected location name
      if (searchInput) {
        searchInput.value = name;
      }

      // 2. Clear the results list
      if (resultsContainer) {
        resultsContainer.innerHTML = '';
      }

      // 3. Optionally, trigger another action (e.g., fetch weather for the location)
      // dispatchEvent(new CustomEvent('locationSelected', { detail: geoLoc }));


    } catch (error) {
      console.error("Failed to save location to sessionStorage:", error);
      // Display error to the user if needed
      if (resultsContainer) {
        resultsContainer.textContent = 'Error saving selection.';
      }
    }
  } else {
    console.warn("Clicked item missing lat/lon data:", selectedItem);
  }
}

async function handleSearchInput(event) {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      // Ensure results container exists before showing loading state
      if (!resultsContainer) return;
      resultsContainer.textContent = 'Searching...'; // Provide loading feedback
      resultsContainer.innerHTML = '<p>Searching...</p>'; // Use a paragraph for semantics

      try {
        const data = await searchCity(searchTerm);
        // Check if the response structure is as expected
        if (data && Array.isArray(data.results)) {
          displayResults(data.results);
        } else {
          console.error("Invalid API response structure:", data);
          displayResults([]); // Display 'No locations found' message
        }
      } catch (error) {
        // Error handling is partly done in searchCity, but catch here too
        console.error("Search failed:", error);
        if (resultsContainer) {
          resultsContainer.textContent = 'Search failed. Please try again.';
        }
        displayResults([]); // Clear results/show message on error
      }
    } else {
      // Clear results if the search term is empty
      if (resultsContainer) {
        resultsContainer.innerHTML = '';
      }
    }
  }
}


export function initCitySearch() {
  if (!searchInput) {
    console.error("Search input element (.searchInput) not found.");
    return;
  }

  // Create and inject the results container dynamically
  resultsContainer = document.createElement('div');
  resultsContainer.className = 'searchResultsContainer'; // Add class for styling
  // Insert the container right after the parent of the search input (which is .searchBox)
  searchInput.parentNode.parentNode.insertBefore(resultsContainer, searchInput.parentNode.nextSibling);


  // Add event listener to the search input
  searchInput.addEventListener('keyup', handleSearchInput);

  console.log("City search module initialized.");
}
