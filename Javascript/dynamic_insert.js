document.addEventListener('DOMContentLoaded', async function () {
    try {
        const listingId = document.getElementById("listingDetails").getAttribute("data-listing-id");
        const userId = document.getElementById("listingDetails").getAttribute("userid");

        console.log("UserID from HTML attribute:", userId);

        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://fedassignment2-4024.restdb.io/rest/user-listing/${listingId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "a71926925440ffe9fad56d54b3257a1478eac"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const listingData = await response.json();

        const userName = await fetchUserData(userId);

        console.log("Fetched user name:", userName);

        document.getElementById("posterNameValue").textContent = `Posted by: ${userName}`;

        const imageContainer = document.getElementById("imageScrollContainer");
        listingData.imageKeys.forEach(imgKey => {
            const imgElement = document.createElement("img");
            imgElement.src = localStorage.getItem(imgKey); 
            imgElement.alt = "Item Image";
            imageContainer.appendChild(imgElement);
        });

        document.getElementById("listingTitle").textContent = listingData["Listing Name"];
        document.getElementById("listingDescription").textContent = listingData.Description;
        document.getElementById("itemPrice").textContent = `Price: $${listingData.Price}`;
        document.getElementById("itemCondition").textContent = `Condition: ${listingData.Condition}`;
        document.getElementById("itemCategory").textContent = `Category: ${listingData.category}`;

        document.getElementById("mainContent").style.display = 'block';
        document.getElementById("loader").style.display = 'none';

    } catch (error) {
        console.error("Error fetching listing data:", error);
        alert("An error occurred while fetching the listing data.");
    }
});

async function fetchUserData(userId) {
    if (!userId) return "Unknown User";

    try {
        const userResponse = await fetch(`https://cors-anywhere.herokuapp.com/https://fedassignment2-4024.restdb.io/rest/Webuser/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "a71926925440ffe9fad56d54b3257a1478eac"
            }
        });

        if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log("Fetched user data:", userData); 
            return userData.Username || "Unknown User"; 
        } else {
            console.error(`Error fetching user data: ${userResponse.status} ${userResponse.statusText}`);
            return "Unknown User";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return "Unknown User";
    }
}

