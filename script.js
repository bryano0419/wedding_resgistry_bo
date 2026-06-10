// Variable to track the user's initial selection globally
let userAttendingSelection = null;

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

// Switch screens based on initial Yes/No click
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
function submitResponse() {
    const nameInput = document.getElementById('guest-name').value.trim();
    
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }
    
    const lowerCaseInput = nameInput.toLowerCase();
    
    // 1. Check for duplicate submissions in localStorage first
    let submittedRSVPs = JSON.parse(localStorage.getItem('weddingGuestList')) || [];
    const isDuplicate = submittedRSVPs.some(guest => guest.name.toLowerCase() === lowerCaseInput);
    
    if (isDuplicate) {
        alert("An RSVP has already been submitted for this name! If you need to make adjustments, please contact us directly.");
        return;
    }

    // 2. Fall back to clean casing if it matches your list, otherwise save exactly what they wrote
    let nameToSave = nameInput; 
    const matchedInviteName = allowedGuestList.find(guest => guest.toLowerCase() === lowerCaseInput);
    if (matchedInviteName) {
        nameToSave = matchedInviteName;
    }
    
    // 3. Determine status text based on initial button selection
    const finalStatus = userAttendingSelection ? "Yes" : "No";
    
    // 4. Save the response smoothly without alerts
    saveResponse(nameToSave, finalStatus);
    
    // 5. Hide input screen and route to correct thank you layout
    document.getElementById('step-name').classList.add('hidden');
    if (userAttendingSelection) {
        document.getElementById('step-thank-you-yes').classList.remove('hidden');
    } else {
        document.getElementById('step-thank-you-no').classList.remove('hidden');
    }
}

// Save response to browser storage
function saveResponse(name, status) {
    let guestList = JSON.parse(localStorage.getItem('weddingGuestList')) || [];
    
    guestList.push({
        name: name,
        status: status,
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('weddingGuestList', JSON.stringify(guestList));
}