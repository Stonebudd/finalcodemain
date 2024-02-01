document.addEventListener('DOMContentLoaded', function() {
    const addressInput = document.getElementById('address-input');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const propertyTypeSelect = document.getElementById('property-type');
    const searchButton = document.getElementById('search-btn');
    const resultContainer = document.getElementById('results');
    let selectedAddressId = null;

    let timeoutId;

    addressInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        const query = this.value;

        if (query.length < 4) {
            suggestionsContainer.innerHTML = '';
            return;
        }

        timeoutId = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    });

    async function fetchSuggestions(query) {
        try {
            const response = await fetch(`https://api.psma.com.au/v1/predictive/address?query=${encodeURIComponent(query)}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'XeqZpzTGK6N2XW1DZLCgGsOkG5YuIVZL' // Replace with your actual API key
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            displaySuggestions(data.suggest);
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            suggestionsContainer.innerHTML = 'Failed to fetch suggestions.';
        }
    }

    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';

        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion.address;
            div.onclick = function() {
                addressInput.value = this.textContent;
                selectedAddressId = suggestion.id;
                suggestionsContainer.innerHTML = '';

            };
            suggestionsContainer.appendChild(div);
        });
    }

    propertyTypeSelect.addEventListener('change', function() {
        const otherOptionsContainer = document.getElementById('otherOptionsContainer');
        otherOptionsContainer.style.display = this.value === 'Other' ? 'block' : 'none';
    });




    $(document).ready(function() {
        // Initialize Select2
        $('#property-type').select2({
            placeholder: "Choose Property Type",
            allowClear: true
        });
    
        // Fetch and flatten the JSON data for Fuse.js
        fetch('autosuggest.JSON')
            .then(response => response.json())
            .then(data => {
                console.log("Loaded JSON Data:", data); // Log the fetched data  
                const searchableArray = [];
                Object.entries(data).forEach(([type, keywords]) => {
                    keywords.forEach(keyword => {
                        searchableArray.push({ type, keyword });
                        console.log("Searchable Array for Fuse.js:", searchableArray); // Log the array
                    });
                });
    
                // Initialize Fuse.js
                const fuse = new Fuse(searchableArray, {
                    keys: ['keyword'],
                    threshold: 0.3
                });
    
                // Attach an input event listener to the Select2 search field
                $(document).on('input', '.select2-search__field', function() {
                    const searchValue = $(this).val();
                    console.log("User Input:", searchValue); // Log the user input

                    const results = fuse.search(searchValue);
                    console.log("Fuse.js Search Results:", results); // Log the search results

                    if (results.length > 0) {
                        const matchedType = results[0].item.type;
                        $('#property-type').val(matchedType).trigger('change.select2');
                    }
                });
            });
    });
    


    
























              
    
    



    searchButton.addEventListener('click', async function(event) {
        event.preventDefault();
        if (!selectedAddressId) {
            alert('Please select an address from suggestions');
            return;
        }

        const apiUrl = `https://api.psma.com.au/v1/predictive/address/${selectedAddressId}`;
        const apiKey = 'XeqZpzTGK6N2XW1DZLCgGsOkG5YuIVZL'; // Replace with your actual API key

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'XeqZpzTGK6N2XW1DZLCgGsOkG5YuIVZL',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response Data:", data);



            document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:3000/api/test?unit_number=10&street_number_1=5&street_number_2=7&street_name=Hill&street_type=Street&suburb=Coolangatta&state=QLD&postcode=4225&property_type=Apartment/Unit')
        .then(response => response.json())
        .then(data => {
            // Assuming 'data' is an object with properties you want to display
            // Update HTML elements with the data
            // For example:
            document.getElementById('someElementId').innerText = data.someProperty;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

        // Store data in local storage or pass as query parameters
        localStorage.setItem('apiData', JSON.stringify(data));
        
        // Redirect to output.html
        window.location.href = 'output.html';
            // Process and display data as needed
            // ...

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            resultContainer.textContent = 'Failed to fetch data.';
        }
    });

    // Additional event listeners and functions
    // ...
});




  






