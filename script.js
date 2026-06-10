// Variable to track the user's initial selection globally
let userAttendingSelection = null;
const googleSheetUrl = "https://script.google.com/macros/s/AKfycbzpOMYI5Wn29Kui31x15E7-asZQWEil2J6C6YIwR8q4PzyuTfh4Kdt29Fvlg-TSnJxX6g/exec";

// Your Master Guest List Array
const allowedGuestList = [
    "Kathy and Erik", "Saul", "Alma and Roberto", "Whitney and Soren", 
    "Carla and Daniel", "Ashley", "Steve", "Grandma Becky", "Grandma Dianna", 
    "Grandpa Joe and Kris", "Jerry and Wendi", "Tiffany and Justin (Coop and Conner)", 
    "Uncle Kris", "Aunt Marsha and Josh", "Joshy", "Jonah and Jaleigh", 
    "Mason and Blaze", "Marcie and Raelyn", "Timmy and Rachel", "Boyd and Momma Birch (Vicki)", 
    "Lexi or McMurt", "Billy and Cyd", "Uncle Rodger", "Uncle Clair and Aunt Karen", 
    "Uncle Kip and Aunt Monica", "Uncle Frank and Aunt Kim", "Uncle Bruce and Aunt Cherl", 
    "Uncle Harvey", "Aunt Tauna and Uncle Bob", "Aunt Maylin and Uncle Duff", 
    "Aunt Rachelle and Uncle Bob", "Cousin Bri", "Cousin Holly, Jeff and Emma"
];

function handleInitialResponse(isAttending) {
    userAttendingSelection = isAttending;
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-name').classList.remove('hidden');
    
    const heading = document.getElementById('name-heading');
    if (isAttending) {
        heading.innerText = "We're Thrilled! Who is RSVPing?";
    } else {
        heading.innerText = "We'll Miss You! Who is RSVPing?";
    }
}

// Handle name submission and routing
async function submitResponse() {
    const nameInput = document.getElementById('guest-name').value.trim();
    
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }
    
    const lowerCaseInput = nameInput.toLowerCase();
    const submitButton = document.querySelector('#step-name .btn');
    
    // Disable button during network save so they can't double-click
    submitButton.disabled = true;
    submitButton.innerText = "Saving...";

    // 1. Fetch current live list from Google Sheets to check for duplicates
    try {
        const response = await fetch(googleSheetUrl);
        const currentRSVPs = await response.json();
        const isDuplicate = currentRSVPs.some(guest => guest.name.toLowerCase() === lowerCaseInput);
        
        if (isDuplicate) {
            alert("An RSVP has already been submitted for this name! If you need to make adjustments, please contact us directly.");
            submitButton.disabled = false;
            submitButton.innerText = "Submit RSVP";
            return;
        }
    } catch (e) {
        console.error("Could not check duplicates, attempting save anyway.");
    }

    // 2. Format name nicely if it matches master list
    let nameToSave = nameInput; 
    const matchedInviteName = allowedGuestList.find(guest => guest.toLowerCase() === lowerCaseInput);
    if (matchedInviteName) {
        nameToSave = matchedInviteName;
    }
    
    const finalStatus = userAttendingSelection ? "Yes" : "No";
    const todayDate = new Date().toLocaleDateString();
    
    // 3. Send data live to Google Sheets
    fetch(googleSheetUrl, {
        method: "POST",
        mode: "no-cors", // Required to bypass Google browser security rules
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameToSave, status: finalStatus, date: todayDate })
    })
    .then(() => {
        // Route to thank you screen
        document.getElementById('step-name').classList.add('hidden');
        if (userAttendingSelection) {
            document.getElementById('step-thank-you-yes').classList.remove('hidden');
        } else {
            document.getElementById('step-thank-you-no').classList.remove('hidden');
        }
    })
    .catch(err => {
        alert("Something went wrong saving your RSVP. Please try again.");
        submitButton.disabled = false;
        submitButton.innerText = "Submit RSVP";
    });
}