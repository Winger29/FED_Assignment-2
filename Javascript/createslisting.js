document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const files = document.getElementById("listingImages").files;
    if (files.length === 0) {
        alert("Please select at least one image.");
        return;
    }

    // Extract values from form
    const listingData = {
        "Listing Name": document.getElementById("listingName").value,
        "Description": document.getElementById("listingDescription").value,
        "Condition": document.getElementById("listingCondition").value,
        "Price": document.getElementById("listingPrice").value,
        category: document.getElementById("listingCategory").value,
        "userid": localStorage.getItem("uid"),
        "likes": 0,
        Status: "active",
        views: 0,
        "date creation": new Date().toISOString(),
    };

    // Upload images to localStorage
    const imageKeys = await uploadImagesToLocalStorage(files);
    listingData.imageKeys = imageKeys;
    console.log("Listing data with image keys:", listingData);

    // Store listing data in localStorage
    const listingId = "listing_" + new Date().getTime(); 
    localStorage.setItem(listingId, JSON.stringify(listingData));
    console.log("Submitting listing:", listingData);

    try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://fedassignment2-4024.restdb.io/rest/user-listing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "a71926925440ffe9fad56d54b3257a1478eac"
            },
            body: JSON.stringify(listingData)
        });

        if (response.status === 201) {
            const result = await response.json();
            console.log("Listing Created Successfully:", result);
            
            // Show the Lottie animation after listing creation
            document.getElementById("successlist").style.display = 'block';
            
            setTimeout(() => {
                document.getElementById("successlist").style.display = 'none';
            }, 3000); 
            
        } else {
            throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error submitting listing:", error);
        alert("An error occurred. Please try again.");
    }
});

// Function to upload images to localStorage
async function uploadImagesToLocalStorage(files) {
    const imageKeys = [];
    const filePromises = Array.from(files).map((file, index) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;

                // Store the image in localStorage with a unique key
                const imageKey = `listingImage_${Date.now()}_${index}`;
                localStorage.setItem(imageKey, base64Image);

                // Push key to array
                imageKeys.push(imageKey);
                resolve();
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    await Promise.all(filePromises);
    console.log("Stored image keys in localStorage:", imageKeys);
    return imageKeys;
}
