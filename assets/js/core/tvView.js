import { readData, readSpreadValues } from '../core/spotrateDB.js';
showTable();

let askSpread, bidSpread;

// Function to Display Spread Values from Firebase
function displaySpreadValues() {
    return readSpreadValues() // Return the promise to allow further chaining
        .then((spreadDataArray) => {
            // Process the data if needed
            spreadDataArray.map((spreadData) => {
                askSpread = spreadData.data.editedAskSpreadValue;
                bidSpread = spreadData.data.editedBidSpreadValue;
            });
        })
        .catch((error) => {
            console.error('Error reading spread values: ', error);
            throw error; // Rethrow the error to indicate a problem
        });
}

// Show Table from Database
async function showTable() {
    console.log("Tv");
    try {
        const tableData = await readData();
        // console.log('Data read successfully:', tableData);

        const tableBody = document.getElementById('tableBodyTV');

        // Loop through the tableData
        for (const data of tableData) {
            // Assign values from data to variables
            const metalInput = data.data.metal;
            const purityInput = data.data.purity;
            const unitInput = data.data.unit;
            const weightInput = data.data.weight;
            const sellAEDInput = data.data.sellAED;
            const buyAEDInput = data.data.buyAED;
            const sellPremiumInputAED = data.data.sellPremiumAED;
            const buyPremiumInputAED = data.data.buyPremiumAED;

            // Create a new table row
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td>${metalInput}</td>
            <td>${purityInput}</td>
            <td>${unitInput} ${weightInput}</td>
            <td id="sellAED">0</td>
            <td id="buyAED">0</td>
            `;

            // Append the new row to the table body
            tableBody.appendChild(newRow);

            let GoldAEDResult;
            displaySpreadValues();

            setInterval(async () => {
                const responseGoldSample = await fetch("http://localhost:3000/random-number");
                if (responseGoldSample.ok) {
                    const data = await responseGoldSample.json();
                    var goldValue = data.random_number;
                    var goldValuegm = goldValue
                    var GoldUSDResult = (goldValuegm / 31.1035).toFixed(4);
                    GoldAEDResult = (GoldUSDResult * 3.67).toFixed(4)
                } else {
                    console.error("Error fetching random number:", responseGoldSample.status);
                }


                let weight = weightInput;
                let unitMultiplier = 1;

                // Adjust unit multiplier based on the selected unit
                if (weight === "GM") {
                    unitMultiplier = 1;
                } else if (weight === "KG") {
                    unitMultiplier = 1000;
                } else if (weight === "TTB") {
                    unitMultiplier = 116.6400;
                } else if (weight === "TOLA") {
                    unitMultiplier = 11.664;
                } else if (weight === "OZ") {
                    unitMultiplier = 31.1034768;
                }


                // Update the sellAED and buyAED values for the current 
                newRow.querySelector("#sellAED").innerText = ((parseFloat(GoldAEDResult) + parseFloat(sellPremiumInputAED) + parseFloat(askSpread)) * unitInput * unitMultiplier * (purityInput / Math.pow(10, purityInput.length))).toFixed(4);
                newRow.querySelector("#buyAED").innerText = ((parseFloat(GoldAEDResult) + parseFloat(buyPremiumInputAED) + parseFloat(bidSpread)) * unitInput * unitMultiplier * (purityInput / Math.pow(10, purityInput.length))).toFixed(4);
            }, 1000)
        }
    } catch (error) {
        console.error('Error reading data:', error);
    }
}