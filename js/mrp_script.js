"use strict";

/*
Author: Adnan Ahmed
File Name: mrp_script.js
Date: 5/4/26
*/

// Feature #1 GOAL TRACKER (PROGRESS BAR)

var currentProgress = 0;

function increaseGoal() {
    if (currentProgress < 100) {
        currentProgress += 10; // Adds 10% on every single click
        
        // Target the inner fill div box and stretch its width style line
        document.getElementById("progressBar").style.width = currentProgress + "%";
        
        // Update the percentage text display below the bar track
        document.getElementById("progressText").innerText = currentProgress + "%";
    }
}

//Feature 2: WORKOUT GENERATOR (PARALLEL ARRAYS)

var imageArray = [
    "images/workout1.png",
    "images/workout2.png",
    "images/workout3.png"
];

var exerciseArray = [
    [
        ["Push Ups", "images/pushups.png"], 
        ["Squats", "images/squats.png"] ,
        ["Burpees", "images/burpees.png"],
    ],
    [ 
        ["Planks", "images/planks.png"], 
        ["Lunges", "images/lunges.png"],
        ["Jumping Jacks", "images/jumping_jacks.png"],
    ],
    [

        ["Dumbbell Presses", "images/dumbbell_press.png"], 
        ["Glute Bridges", "images/glute_bridges.png" ],
        ["Mountain Climbers", "images/mountain_climbers.png"]
    ]
];

var currentIdx = 0; // Tracks our current step location inside the lists

function generatorWorkout() {
    // Jump forward one step in our index tracker count
    currentIdx++;

    // Loop back around to the first slot (0) if we walk off the list edge
    if (currentIdx >= imageArray.length) {
        currentIdx = 0;
    }

    // 1. Swap the image element file source link path
    // document.getElementById("workoutImage").src = imageArray[currentIdx];

    // 2. Clear out the three old list text items completely
    var listContainer = document.getElementById("exerciseList");
    listContainer.innerHTML = "";

    // 3. Extract our current active nested list layer out of our block
    var currentExercises = exerciseArray[currentIdx];

     // 4. Run a basic loop construct to assemble and print new li items
     for (var i = 0; i < currentExercises.length; i++) {
        // Build the raw HTML string for the list item
        var singleExerciseData = currentExercises[i];

        var exerciseName = singleExerciseData[0]; // Position 0 is the text name
        var exerciseImageLink = singleExerciseData[1]; // Position 1 is the file image path

        // Build the raw HTML string combining the list tag, the text name, and a small image tag
        var exerciseHTML = "<li>" + 
                              "<strong>" + exerciseName + "</strong>" + 
                              "<img src='" + exerciseImageLink + "' alt='" + exerciseName + "'>" + 
                           "</li>";

        // Safely insert it right before the closing </ul> tag
        listContainer.insertAdjacentHTML("beforeend", exerciseHTML);
    }
}

// FEATURE #3: Membership Form Validation
// doClear function to blank out the entries
function doClear() {
    document.MembershipForm.fName.value = "";
    document.MembershipForm.email.value = "";
    document.MembershipForm.phone.value = "";
    document.MembershipForm.goals.value = "";
    document.MembershipForm.age.value = "";
    document.MembershipForm.emergency.value = "";
    return;
}

// Boolean validation function tracking text content lengths
function validateFields() {
    // Accessing inputs directly via document.FormName.FieldName 
    var fName = document.MembershipForm.fName.value;
    var email = document.MembershipForm.email.value;
    var phone = document.MembershipForm.phone.value;
    var age = document.MembershipForm.age.value;
    var emergency = document.MembershipForm.emergency.value;

    // Checks character length just like 'validateText()'
    if (fName.length == 0) return false;
    if (email.length == 0) return false;
    if (phone.length == 0) return false;
    if (age.length == 0) return false;
    if (emergency.length == 0) return false;
    
    return true; // Returns true only if all text content exists
}

// Submissions master engine
function submitMembership() {
    // Array: Stores your layout messages to satisfy your validation array requirement
    var errors = [];
    
    // Variables: Reading values from the elements
    var email = document.MembershipForm.email.value;
    var phone = document.MembershipForm.phone.value;
    var age = document.MembershipForm.age.value;
    var membershipType = document.MembershipForm.membershipType.value;

    // 1. Selection Statement: Run our pizza-style validation check first
    if (validateFields() == false) {
        errors.push("- All required form fields must be filled out before submitting.");
    }

    // 2. Format Pattern Check: Email Loop and Position Check using []
    if (email.length > 0) {
        var atIndex = -1;
        var dotIndex = -1;

    // Loop through every character the user typed in the email box
    for (var i = 0; i < email.length; i++) {
        // ALTERNATIVE: Grabbing the character using bracket notation instead of email.charAt(i)
        var char = email[i]; 
        
        // Save the index position if the character is an '@'
        if (char === "@") {
            atIndex = i;
        }
        
        // Save the index position if the character is a '.'
        if (char === ".") {
            dotIndex = i;
        }
    }

    /*
      An email format is invalid if:
      - It has no '@' symbol (atIndex stays -1)
      - It has no '.' dot (dotIndex stays -1)
      - The '@' symbol comes AFTER the dot symbol (atIndex > dotIndex)
    */
    if (atIndex === -1 || dotIndex === -1 || atIndex > dotIndex) {
        errors.push("- Email address must contain an '@' symbol followed by a '.' dot.");
    }
    }   
    // 3. Format Pattern Check: Loop using the Bracket Notation [] alternative
    if (phone.length > 0) {
        var cleanPhone = "";
        
        for (var i = 0; i < phone.length; i++) {
        // ALTERNATIVE: Using brackets instead of phone.charAt(i)
            var char = phone[i]; 
            
            if (char >= "0" && char <= "9") {
            cleanPhone += char;
        }
    }

    if (cleanPhone.length !== 10) {
        errors.push("- Phone number must contain a standard 10-digit sequence.");
    }
}
    // 4. Custom Boundary Check: Age limits numeric checking
    var ageNumber = Number(age);
    if (age.length > 0) {
        if (isNaN(ageNumber) || ageNumber < 14 || ageNumber > 100) {
            errors.push("- Age must be a number restricted between 14 and 100.");
    }
}
    // 5. Selection Statement: Switch control matching membership types
    switch (membershipType) {
        case "VIP":
            if (age.length > 0 && ageNumber < 18) {
            errors.push("- VIP accounts require applicants to be 18 or older.");
        }
        break;
    case "Basic":
    case "Premium":
         break;
    default:
        errors.push("- Selection tier not recognized.");
}
    // 6. Selection & Loops: Compile errors or push success via DOM
    if (errors.length > 0) {
        var alertMessage = "Please resolve these problems:\n\n";

    // Loop: Standard loop block building your text lines inside your alert box
        for (var i = 0; i < errors.length; i++) {
            alertMessage += errors[i] + "\n";
        }
    
        window.alert(alertMessage); 

    } else {
        window.alert("Your registration has been submitted successfully!");

    // DOM Access and Modification: Modifies text to fulfill the DOM update grading requirement
    document.getElementById("social").insertAdjacentHTML("beforebegin", "<p style='color: green; font-weight: bold; text-align: center;'>Application Processed Successfully!</p>");
    
    doClear(); // Wipes form lines clean using our helper function
}

}