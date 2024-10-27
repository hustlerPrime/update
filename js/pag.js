// Redirect to the selected country's page
function navigateToCountry() {
    const countrySelect = document.getElementById('country');
    const selectedCountryPage = countrySelect.value;
    if (selectedCountryPage) {
        window.location.href = selectedCountryPage;
    }
}

// Data and pagination for country-specific card rates pages
const cardData = {
    "us": [
        { type: "Amazon", rate: "$50 - $45" },
        { type: "Google Play", rate: "$100 - $90" },
        { type: "iTunes", rate: "$50 - $45" },
        { type: "Steam", rate: "$100 - $88" },
        { type: "eBay", rate: "$25 - $20" }
    ],
    "canada": [
        { type: "Amazon CA", rate: "$50 - $44" },
        { type: "Apple CA", rate: "$50 - $46" },
    ]
};

// Paginate and display table data
function paginateData(countryCode, page = 1, perPage = 2) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    const countryData = cardData[countryCode] || [];
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = countryData.slice(start, end);

    paginatedData.forEach(card => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${card.type}</td><td>${card.rate}</td>`;
        tableBody.appendChild(row);
    });

    renderPaginationControls(countryCode, page, Math.ceil(countryData.length / perPage));
}

// Render pagination controls
function renderPaginationControls(countryCode, currentPage, totalPages) {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement('button');
        button.textContent = page;
        button.className = page === currentPage ? 'disabled' : '';
        button.onclick = () => paginateData(countryCode, page);
        paginationControls.appendChild(button);
    }
}

// Initialize pagination based on country code
window.onload = function() {
    const path = window.location.pathname;
    const countryCode = path.split('/').pop().split('.')[0]; // e.g., "us" from "us.html"
    if (countryCode in cardData) {
        paginateData(countryCode);
    }
};
