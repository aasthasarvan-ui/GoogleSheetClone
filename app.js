// Apni Firebase configuration yahan daalein (agar firebase use nahi karna toh isko hata bhi sakte hain)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase safely
try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log("Firebase not initialized properly, but grid will work.");
}

const table = document.getElementById('sheetTable');
const rows = 15;
const cols = 6; // A to F

// Grid generate karne ka function
function createGrid() {
    let html = '';
    
    // Header Row (A, B, C, D...)
    html += '<tr><th>#</th>';
    for (let c = 0; c < cols; c++) {
        html += `<th>${String.fromCharCode(65 + c)}</th>`;
    }
    html += '</tr>';

    // Data Rows (1, 2, 3...)
    for (let r = 0; r < rows; r++) {
        html += `<tr><th>${r + 1}</th>`;
        for (let c = 0; c < cols; c++) {
            html += `<td><input type="text" class="cell-input" data-row="${r}" data-col="${c}" id="cell-${r}-${c}"></td>`;
        }
        html += '</tr>';
    }
    table.innerHTML = html;
}

// Page load hote hi grid ban jayegi
window.onload = function() {
    createGrid();
};

// Save button logic
document.getElementById('saveBtn').addEventListener('click', () => {
    let sheetData = {};
    document.querySelectorAll('.cell-input').forEach(input => {
        if(input.value !== "") {
            sheetData[input.id] = input.value;
        }
    });

    if(typeof firebase !== 'undefined' && firebase.database) {
        firebase.database().ref('spreadsheet/sheet1').set(sheetData)
            .then(() => alert('Sheet saved successfully to Firebase!'))
            .catch((error) => alert('Error: ' + error.message));
    } else {
        alert('Firebase is not configured yet, but your data is in the cells!');
    }
});
