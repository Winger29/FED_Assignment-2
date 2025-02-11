document.addEventListener('DOMContentLoaded', async function () {
    const listings = await fetchListings();

    const dailyItemsContainer = document.getElementById("dailyItems");

    const sortedListings = listings.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    const limitedListings = sortedListings;


    dailyItemsContainer.innerHTML = ''; 
    limitedListings.forEach(item => {
        const productCard = createProductCard(item);
        dailyItemsContainer.innerHTML += productCard;
    });

    document.getElementById("mainContent").style.display = 'block';
    document.getElementById("loader").style.display = 'none';
});

async function fetchListings() {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://fedassignment2-4024.restdb.io/rest/user-listing';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': 'a71926925440ffe9fad56d54b3257a1478eac',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }

        const listings = await response.json();
        return listings;
    } catch (error) {
        console.error('Error fetching listings:', error);
        alert('Failed to load listings');
        return [];
    }
}

function createProductCard(item) {
    const imageUrl = item.imageKeys && item.imageKeys[0] ? localStorage.getItem(item.imageKeys[0]) : 'default-image.png';
    const title = item['Listing Name'] || "No title available";
    const condition = item['Condition'] || "Condition not specified";
    const price = item['Price'] || 'Price not available';
    const likes = item['Likes'] || 0;
    const category = item['Category'] || "misc"; 
    const listingId = item['_id'] || Math.random().toString(36).from(2, 9); 

    const friendlyTitle = title.toLowerCase();
    const productUrl = `${listingId}-${friendlyTitle}.html;"`;

    return `
    <a href="${productUrl}" class="product-card-link">
        <div class="product-card">
            <div class="card">
                <div class="card-body text-start d-flex flex-column justify-content-between">
                    <img src="${imageUrl}" alt="${title}" class="img-fluid" style="max-height: 250px; margin-bottom: 10px;">
                    <h5 class="mt-2"><strong>${title}</strong></h5>
                    <p class="text-muted">${condition}</p>
                    <p><strong>${price} USD</strong></p>
                    <div class="d-flex align-items-center">
                        <img src="icons/like_blk.svg" alt="Likes" style="width: 20px; height: 20px; margin-right: 5px;">
                        <span>${likes} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    </a>
    `;
}

