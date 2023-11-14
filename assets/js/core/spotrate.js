// Add an event listener to trigger the calculation when the gold value input changes
document.getElementById("getGoldValue").addEventListener("input", function () {
  setGoldValue(); // Call setGoldValue function when the input changes
  calculateRates(); // Call calculateRates to update the table values
});
document.getElementById("getGoldValue").addEventListener("input", setGoldValue);

document.getElementById("addRowForm").addEventListener("input", calculateRates);

// Call calculateRates with default values
calculateRates();

// Function to calculate total value including Premium 
function totalUSDInputValue() {
  const sellPremiumUSDElement = document.getElementById('sellPremiumUSD');
  const buyPremiumUSDElement = document.getElementById('buyPremiumUSD');

  // Ensure the elements exist and contain valid numerical data
  const sellPremiumUSD = sellPremiumUSDElement ? parseFloat(sellPremiumUSDElement.value) || 0 : 0;
  const buyPremiumUSD = buyPremiumUSDElement ? parseFloat(buyPremiumUSDElement.value) || 0 : 0;

  // Get values from Sell and Buy USD Input
  const sellUSDInputElement = document.getElementById("sellUSDInput");
  const buyUSDInputElement = document.getElementById("buyUSDInput");

  const sellUSDInput = sellUSDInputElement ? parseFloat(sellUSDInputElement.textContent) || 0 : 0;
  const buyUSDInput = buyUSDInputElement ? parseFloat(buyUSDInputElement.textContent) || 0 : 0;

  const totalSellUSDInput = sellPremiumUSD + buyUSDInput;
  const totalBuyUSDInput = buyPremiumUSD + sellUSDInput;

  // Update the content of elements
  if (sellUSDInputElement) {
    sellUSDInputElement.textContent = parseFloat(totalSellUSDInput);
  }

  if (buyUSDInputElement) {
    buyUSDInputElement.textContent = parseFloat(totalBuyUSDInput);
  }

  valuesUSDToAED()
}


// Set default values in the form
document.getElementById("metalInput").value = "Gold";
document.getElementById("purityInput").value = "999";
document.getElementById("unitInput").value = "1";
document.getElementById("weightInput").value = "GM";

function calculateRates() {
  // Get values from the form
  const metalType = document.getElementById("metalInput").value;
  const purity = document.getElementById("purityInput").value;
  const unitInput = document.getElementById("unitInput");
  const weightInput = document.getElementById("weightInput");

  // Set default values for unit and weight
  let unit = parseFloat(unitInput.value) || 1; // Use the value from the input or default to 1
  let weight = weightInput.value || "GM"; // Use the value from the input or default to "GM"


  // Update unit and weight based on the selected metal type
  switch (metalType) {
    case "Gold kilobar":
      unit = 1;
      weight = "KG";
      break;
    case "Gold TOLA":
      unit = 1;
      weight = "TOLA";
      break;
    case "Gold TEN TOLA":
      unit = 1;
      weight = "TTB";
      break;
    // Add more cases for other metal types if needed

    default:
      break;
  }

  // Update the form fields
  unitInput.value = unit;
  weightInput.value = weight;

  // Perform the calculation based on the example formula
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

  // Declare these variables at the beginning of your script
  let valueUSD1 = 0;
  let valueUSD2 = 0;

  // Get references to the input fields
  const sellPremiumUSD = document.getElementById('sellPremiumUSD');
  const sellPremiumAED = document.getElementById('sellPremiumAED');
  // Add event listeners to sell Premium USD for conversion to AED
  sellPremiumUSD.addEventListener('input', convertUSDToAED1);
  // Add event listeners to sell Premium AED for conversion to USD
  sellPremiumAED.addEventListener('input', convertAEDToUSD1);
  // Get references to the input fields
  const buyPremiumUSD = document.getElementById('buyPremiumUSD');
  const buyPremiumAED = document.getElementById('buyPremiumAED');
  // Add event listeners to Buy Premium USD for conversion to AED
  buyPremiumUSD.addEventListener('input', convertUSDToAED2);
  // Add event listeners to Buy Premium AED for conversion to USD
  buyPremiumAED.addEventListener('input', convertAEDToUSD2);

  function convertUSDToAED1() {
    const valueUSD1 = parseFloat(sellPremiumUSD.value) || 0;

    if (!isNaN(valueUSD1)) {
      sellPremiumAED.value = (valueUSD1 * 3.67).toFixed(2);
    } else {
      sellPremiumAED.value = ''; // Clear AED input if USD input is not a valid number
    }
  }

  function convertAEDToUSD1() {
    const valueAED1 = parseFloat(sellPremiumAED.value);

    if (!isNaN(valueAED1)) {
      sellPremiumUSD.value = (valueAED1 / 3.67).toFixed(2);
    } else {
      sellPremiumUSD.value = ''; // Clear USD input if AED input is not a valid number
    }
  }

  function convertUSDToAED2() {
    const valueUSD2 = parseFloat(buyPremiumUSD.value) || 0;

    if (!isNaN(valueUSD2)) {
      buyPremiumAED.value = (valueUSD2 * 3.67).toFixed(2);
    } else {
      buyPremiumAED.value = ''; // Clear AED input if USD input is not a valid number
    }
  }

  function convertAEDToUSD2() {
    const valueAED2 = parseFloat(buyPremiumAED.value);

    if (!isNaN(valueAED2)) {
      buyPremiumUSD.value = (valueAED2 / 3.67).toFixed(2);
    } else {
      buyPremiumUSD.value = ''; // Clear USD input if AED input is not a valid number
    }
  }

  const goldUSDResult = parseFloat(document.getElementById("goldAskingPrice").textContent);
  const calculatedRate = ((goldUSDResult + valueUSD1) / 31.1035 * 3.67 * unit * unitMultiplier) * (purity / Math.pow(10, purity.length));

  // Update the sell and buy rates in the form
  document.getElementById("sellAEDInput").textContent = calculatedRate.toFixed(2);
  document.getElementById("sellUSDInput").textContent = (calculatedRate / 3.67).toFixed(2);

  // You can adjust the buy rate calculation based on your requirements
  const goldUSDBiddingResult = parseFloat(document.getElementById("goldBiddingPrice").textContent);
  const buyRate = (((goldUSDBiddingResult + valueUSD2) / 31.1035) * 3.67 * unit * unitMultiplier) * (purity / Math.pow(10, purity.length)); // For example, increase by 5%

  document.getElementById("buyAEDInput").textContent = buyRate.toFixed(2);
  document.getElementById("buyUSDInput").textContent = (buyRate / 3.67).toFixed(2);

  totalUSDInputValue()
}


// Add an event listener to trigger the calculation when the form values change
document.getElementById("addRowForm").addEventListener("input", calculateRates);


function addTableRow() {
  document.getElementById('saveButton').style.display = 'block';
  document.getElementById('saveChangesButton').style.display = 'none';
}

function getSelectedCurrency() {
  const currencySelect = document.getElementById("currency");
  const currencySymbol = document.getElementById("currencySymbol");
  const selectedCurrency = currencySelect.value;

  // Update the currency symbol in the table headings
  document.querySelectorAll("#currencySymbol").forEach((element) => {
    element.textContent = selectedCurrency;
  });
}


function deleteRow(iconElement) {
  const row = iconElement.parentElement.parentElement;
  row.remove();
}

function saveRow() {


  // Get data from the form
  const metalInput = document.getElementById("metalInput").value;
  const purityInput = document.getElementById("purityInput").value;
  const unitInput = document.getElementById("unitInput").value;
  const weightInput = document.getElementById("weightInput").value;
  const sellAEDInput = document.getElementById("sellAEDInput").textContent; // Updated to use textContent
  const buyAEDInput = document.getElementById("buyAEDInput").textContent; // Updated to use textContent
  const sellPremiumInput = document.getElementById("sellPremiumUSD").value;
  const sellPremiumInputAED = document.getElementById("sellPremiumAED").value;
  const buyPremiumInput = document.getElementById("buyPremiumUSD").value;
  const buyPremiumInputAED = document.getElementById("buyPremiumAED").value;

  // Create a new table row  <td>${sellPremiumInput}</td>         <td>${buyPremiumInput}</td>
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${metalInput}</td>
        <td>${purityInput}</td>
        <td>${unitInput} ${weightInput}</td>
        <td>${sellAEDInput}</td>
        <td>${buyAEDInput}</td>
        <td>${sellPremiumInputAED}</td>
        <td>${buyPremiumInputAED}</td>
        <td>
            <i class="fas fa-edit" onclick="editRow(this)"></i>
          <i class="fas fa-trash-alt" onclick="deleteRowConfirmation(this)"></i>

        </td>
        `;

  // Add the new row to the table body
  document.getElementById("tableBody").appendChild(newRow);

  // Function to reset form fields to default values
  function resetFormFields() {
    document.getElementById("metalInput").value = "Gold";
    document.getElementById("purityInput").value = "999";
    document.getElementById("unitInput").value = "1";
    document.getElementById("weightInput").value = "GM";
    document.getElementById("sellPremiumInput").value = "";
    document.getElementById("sellPremiumInputAED").value = "";
    document.getElementById("buyPremiumInput").value = "";
    document.getElementById("buyPremiumInputAED").value = "";
  }

  document.getElementById("addRowModal").addEventListener("show.bs.modal", function () {
    // Check if it's for editing or adding
    const modalTitle = document.getElementById("addRowModalTitle");
    if (modalTitle) {
      modalTitle.textContent = editedRow ? "Edit Commodity" : "Add Commodity";
    }
  });

}
let editedRow; // Add a variable to keep track of the edited row

function editRow(iconElement) {

  document.getElementById('saveChangesButton').style.display = 'block';
  document.getElementById('saveButton').style.display = 'none';
  document.getElementById('closeButton').style.display = 'none';

  // Get the row to be edited
  editedRow = iconElement.parentElement.parentElement;

  // Extract data from the row
  const metalInput = editedRow.cells[0].textContent;
  const purityInput = editedRow.cells[1].textContent;
  const unitWeightInput = editedRow.cells[2].textContent.split(' '); // Split unit and weight
  const unitInput = unitWeightInput[0];
  const weightInput = unitWeightInput[1];
  const sellAEDInput = editedRow.cells[3].textContent;
  const buyAEDInput = editedRow.cells[4].textContent;
  const sellPremiumInputAED = editedRow.cells[5].textContent;
  const buyPremiumInputAED = editedRow.cells[6].textContent;

  // Populate the form fields with the data
  document.getElementById("metalInput").value = metalInput;
  document.getElementById("purityInput").value = purityInput;
  document.getElementById("unitInput").value = unitInput;
  document.getElementById("weightInput").value = weightInput;
  document.getElementById("sellAEDInput").textContent = sellAEDInput;
  document.getElementById("buyAEDInput").textContent = buyAEDInput;
  document.getElementById("sellPremiumUSD").value = sellPremiumInputAED;
  document.getElementById("sellPremiumAED").value = sellPremiumInputAED;
  document.getElementById("buyPremiumUSD").value = buyPremiumInputAED;
  document.getElementById("buyPremiumAED").value = buyPremiumInputAED;

  // Show the modal for editing
  $('#addRowModal').modal('show');
}
function updateRow() {
  // Update the content of the edited row
  editedRow.cells[0].textContent = document.getElementById("metalInput").value;
  editedRow.cells[1].textContent = document.getElementById("purityInput").value;
  editedRow.cells[2].textContent = `${document.getElementById("unitInput").value} ${document.getElementById("weightInput").value}`;
  editedRow.cells[3].textContent = document.getElementById("sellAEDInput").textContent;
  editedRow.cells[4].textContent = document.getElementById("buyAEDInput").textContent;
  editedRow.cells[5].textContent = document.getElementById("sellPremiumAED").value;
  editedRow.cells[6].textContent = document.getElementById("buyPremiumAED").value;

  // Hide the modal after updating
  $('#addRowModal').modal('hide');
}

// Add a variable to store the row to be deleted
let rowToDelete;

function deleteRowConfirmation(iconElement) {
  // Store the row to be deleted
  rowToDelete = iconElement.parentElement.parentElement;
  // Show the delete confirmation modal
  $('#deleteConfirmationModal').modal('show');
}

function confirmedDelete() {
  // Delete the stored row
  rowToDelete.remove();
  // Close the delete confirmation modal
  $('#deleteConfirmationModal').modal('hide');
}

//Update Sell and Buy USD Input
function updateBuyUSDInput(value) {
  document.getElementById("buyUSDInput").textContent = value;
  valuesUSDToAED()
}

function updateSellUSDInput(value) {
  document.getElementById("sellUSDInput").textContent = value;
  valuesUSDToAED()
}


function setGoldValue() {
  var getValue = parseFloat(document.getElementById("getGoldValue").value);
  document.getElementById("displayGoldValue").textContent = getValue;

  // Set the value to elements
  document.getElementById("goldBid").textContent = getValue;
  document.getElementById("goldBiddingPrice").textContent = getValue;

  document.getElementById("goldAsk").textContent = getValue + 0.5;
  document.getElementById("goldAskingPrice").textContent = getValue + 0.5;

  // Set Value to Commodity
  updateSellUSDInput(getValue + 0.5)
  updateBuyUSDInput(getValue)

  var goldValuegm = parseFloat(document.getElementById("displayGoldValue").textContent);
  var GoldUSDResult = (goldValuegm / 31.1035).toFixed(4);
  var GoldAEDResult = (GoldUSDResult * 3.67).toFixed(4);
  document.getElementById("GoldUSDresult").textContent = GoldUSDResult;
  document.getElementById("GoldAEDresult").textContent = GoldAEDResult;

  //usd 
  // updateBuyUSDInput(getValue)

  // Call calculateRates to update the table values
  // calculateRates();
  // buyRate();
}


// Add an event listener to trigger the setGoldValue function when the input changes
document.getElementById("getGoldValue").addEventListener("input", setGoldValue);
// Add an event listener to trigger the calculateRates function when the addRowForm input changes
document.getElementById("addRowForm").addEventListener("input", calculateRates);
document.getElementById("addRowForm").addEventListener("input", buyRate);


function setSilverValue() {
  var getValue = parseFloat(document.getElementById("getSilverValue").value)
  document.getElementById("displaySilverValue").innerHTML = getValue

  //Set the value to elements
  document.getElementById("silverBid").innerHTML = getValue
  document.getElementById("silverBiddingPrice").innerHTML = getValue

  document.getElementById("silverAsk").innerHTML = getValue + 0.05
  document.getElementById("silverAskingPrice").innerHTML = getValue + 0.05
}

//Margin Value
function setGoldLowMarginValue() {
  var getValue = parseFloat(document.getElementById("getGoldLowMarginValue").value)
  document.getElementById("displayGoldLowMarginValue").innerHTML = getValue

  //Set the value to elements
  document.getElementById("goldLowValue").innerHTML = getValue
  document.getElementById("goldNewLowValue").innerHTML = getValue
}

function setSilverLowMarginValue() {
  var getValue = parseFloat(document.getElementById("getSilverLowMarginValue").value)
  document.getElementById("displaySilverLowMarginValue").innerHTML = getValue

  //Set the value to elements
  document.getElementById("silverLowValue").innerHTML = getValue
  document.getElementById("silverNewLowValue").innerHTML = getValue
}

function setGoldHighMarginValue() {
  var getValue = parseFloat(document.getElementById("getGoldHighMarginValue").value)
  document.getElementById("displayGoldHighMarginValue").innerHTML = getValue

  //Set the value to elements
  document.getElementById("goldHighValue").innerHTML = getValue
  document.getElementById("goldNewHighValue").innerHTML = getValue
}

function setSilverHighMarginValue() {
  var getValue = parseFloat(document.getElementById("getSilverHighMarginValue").value)
  document.getElementById("displaySilverHighMarginValue").innerHTML = getValue

  //Set the value to elements
  document.getElementById("silverHighValue").innerHTML = getValue
  document.getElementById("silverNewHighValue").innerHTML = getValue
}

//Convert Values From USD to AED for Sell and Buy
function valuesUSDToAED() {
  const sellValueInUSD = document.getElementById("sellUSDInput");
  const sellValueInUSDToText = sellValueInUSD.textContent.trim();
  const sellValueInUSDToNum = parseFloat(sellValueInUSDToText);

  const buyValueInUSD = document.getElementById("buyUSDInput");
  const buyValueInUSDToText = buyValueInUSD.textContent.trim();
  const buyValueInUSDToNum = parseFloat(buyValueInUSDToText);

  const sellValueInAED = sellValueInUSDToNum * 3.67;
  const buyValueInAED = buyValueInUSDToNum * 3.67;

  document.getElementById("sellAEDInput").innerHTML = sellValueInAED;
  document.getElementById("buyAEDInput").innerHTML = buyValueInAED;
}

//Edit Value for Gold on Button Click
function editGoldBid() {
  const getGoldBidValue = document.getElementById("goldBid");
  const bidGoldText = getGoldBidValue.textContent.trim();
  const bidGoldValue = parseFloat(bidGoldText);
  document.getElementById("goldBiddingPrice").innerHTML = bidGoldValue;
  const editGoldSpreadValue = document.getElementById("goldSpread");
  const isEditable = editGoldSpreadValue.getAttribute("contenteditable") === "true";
  editGoldSpreadValue.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isEditable) {
    editGoldSpreadValue.blur();
  } else {
    editGoldSpreadValue.focus();
  }
  editGoldSpreadValue.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedGoldSpreadText = editGoldSpreadValue.textContent.trim();
    const editedGoldSpreadValue = parseFloat(editedGoldSpreadText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var totalGoldSpreadValue = '';
    if (bidGoldValue > 0) {
      totalGoldSpreadValue = bidGoldValue + editedGoldSpreadValue;
    } else {
      totalGoldSpreadValue = bidGoldValue - editedGoldSpreadValue;
    }
    console.log(totalGoldSpreadValue);
    document.getElementById("goldBiddingPrice").innerHTML = totalGoldSpreadValue;
    document.getElementById("goldAsk").innerHTML = totalGoldSpreadValue + 0.5;
    document.getElementById("goldAskingPrice").innerHTML = totalGoldSpreadValue + 0.5;

    //Update Buy USD Value
    updateBuyUSDInput(totalGoldSpreadValue)
  });
}

//Edit Value for Gold on Button Click
function editGoldAsk() {
  const getGoldAskValue = document.getElementById("goldAsk");
  const askGoldText = getGoldAskValue.textContent.trim();
  const askGoldValue = parseFloat(askGoldText);
  document.getElementById("goldAskingPrice").innerHTML = askGoldValue;
  const editGoldAskSpreadValue = document.getElementById("goldAskSpread");
  const isEditable = editGoldAskSpreadValue.getAttribute("contenteditable") === "true";
  editGoldAskSpreadValue.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isEditable) {
    editGoldAskSpreadValue.blur();
  } else {
    editGoldAskSpreadValue.focus();
  }

  editGoldAskSpreadValue.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedGoldSpreadText = editGoldAskSpreadValue.textContent.trim();
    const editedGoldSpreadValue = parseFloat(editedGoldSpreadText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var totalGoldSpreadValue = '';
    if (askGoldValue > 0) {
      totalGoldSpreadValue = askGoldValue + editedGoldSpreadValue;
    } else {
      totalGoldSpreadValue = askGoldValue - editedGoldSpreadValue;
    }
    document.getElementById("goldAskingPrice").innerHTML = totalGoldSpreadValue;

    //Update Sell USD Value
    updateSellUSDInput(totalGoldSpreadValue)
  });
}

//Edit Value for Silver on Button Click
function editSilverBid() {
  const getSilverBidValue = document.getElementById("silverBid");
  const bidSilverText = getSilverBidValue.textContent.trim();
  const bidSilverValue = parseFloat(bidSilverText);
  document.getElementById("silverBiddingPrice").innerHTML = bidSilverValue;
  const editSilverSpreadValue = document.getElementById("silverSpread");
  const isEditable = editSilverSpreadValue.getAttribute("contenteditable") === "true";
  editSilverSpreadValue.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isEditable) {
    editSilverSpreadValue.blur();
  } else {
    editSilverSpreadValue.focus();
  }

  editSilverSpreadValue.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedSilverSpreadText = editSilverSpreadValue.textContent.trim();
    const editedSilverSpreadValue = parseFloat(editedSilverSpreadText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var totalSilverSpreadvalue = '';
    if (bidSilverValue > 0) {
      totalSilverSpreadvalue = bidSilverValue + editedSilverSpreadValue;
    } else {
      totalSilverSpreadvalue = bidSilverValue - editedSilverSpreadValue;
    }
    document.getElementById("silverBiddingPrice").innerHTML = totalSilverSpreadvalue;
    document.getElementById("silverAsk").innerHTML = totalSilverSpreadvalue + 0.05;
    document.getElementById("silverAskingPrice").innerHTML = totalSilverSpreadvalue + 0.05;
  });
}

//Edit Value for Silver on Button Click
function editSilverAsk() {
  const getSilverAskValue = document.getElementById("silverAsk");
  const askSilverText = getSilverAskValue.textContent.trim();
  const askSilverValue = parseFloat(askSilverText);
  document.getElementById("silverAskingPrice").innerHTML = askSilverValue;
  const editSilverAskSpreadValue = document.getElementById("silverAskSpread");
  const isEditable = editSilverAskSpreadValue.getAttribute("contenteditable") === "true";
  editSilverAskSpreadValue.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isEditable) {
    editSilverAskSpreadValue.blur();
  } else {
    editSilverAskSpreadValue.focus();
  }

  editSilverAskSpreadValue.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedSilverSpreadText = editSilverAskSpreadValue.textContent.trim();
    const editedSilverSpreadValue = parseFloat(editedSilverSpreadText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var totalSilverSpreadvalue = '';
    if (askSilverValue > 0) {
      totalSilverSpreadvalue = askSilverValue + editedSilverSpreadValue;
    } else {
      totalSilverSpreadvalue = askSilverValue - editedSilverSpreadValue;
    }
    document.getElementById("silverAskingPrice").innerHTML = totalSilverSpreadvalue;
  });
}


//Edit Gold Margin Values 
function editGoldMarginValue() {
  const goldLowValue = document.getElementById("goldLowValue");
  const goldLowValueToText = goldLowValue.textContent.trim();
  const goldLowValueToNum = parseFloat(goldLowValueToText);
  document.getElementById("goldNewLowValue").innerHTML = goldLowValueToNum;
  const goldLowMargin = document.getElementById("goldLowMargin");
  const isEditable = goldLowMargin.getAttribute("contenteditable") === "true";
  goldLowMargin.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isEditable) {
    goldLowMargin.blur();
  } else {
    goldLowMargin.focus();
  }
  goldLowMargin.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedgoldLowMarginToText = goldLowMargin.textContent.trim();
    const editedgoldLowMarginToNum = parseFloat(editedgoldLowMarginToText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var finalLowMarginValue = '';
    if (goldLowValueToNum > 0) {
      finalLowMarginValue = goldLowValueToNum + editedgoldLowMarginToNum;
    } else {
      finalLowMarginValue = goldLowValueToNum - editedgoldLowMarginToNum;
    }
    document.getElementById("goldNewLowValue").innerHTML = finalLowMarginValue;
  });


  const goldHighValue = document.getElementById("goldHighValue");
  const goldHighValueToText = goldHighValue.textContent.trim();
  const goldHighValueToNum = parseFloat(goldHighValueToText);
  document.getElementById("silverAskingPrice").innerHTML = goldHighValueToNum;
  const goldHighMargin = document.getElementById("goldHighMargin");
  const isHighValueEditable = goldHighMargin.getAttribute("contenteditable") === "true";
  goldHighMargin.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isHighValueEditable) {
    goldHighMargin.blur();
  } else {
    goldHighMargin.focus();
  }
  goldHighMargin.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedgoldHighMarginToText = goldHighMargin.textContent.trim();
    const editedgoldHighMarginToNum = parseFloat(editedgoldHighMarginToText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var finalHighMarginValue = '';
    if (goldHighValueToNum > 0) {
      finalHighMarginValue = goldHighValueToNum + editedgoldHighMarginToNum;
    } else {
      finalHighMarginValue = goldHighValueToNum - editedgoldHighMarginToNum;
    }
    document.getElementById("goldNewHighValue").innerHTML = finalHighMarginValue;
  });
}

//Edit Silver Margin Values 
function editSilverMarginValue() {
  const silverLowValue = document.getElementById("silverLowValue");
  const silverLowValueToText = silverLowValue.textContent.trim();
  const silverLowValueToNum = parseFloat(silverLowValueToText);
  document.getElementById("silverNewLowValue").innerHTML = silverLowValueToNum;
  const silverLowMargin = document.getElementById("silverLowMargin");
  const isEditable = silverLowMargin.getAttribute("contenteditable") === "true";
  silverLowMargin.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isEditable) {
    silverLowMargin.blur();
  } else {
    silverLowMargin.focus();
  }
  silverLowMargin.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedSilverLowMarginToText = silverLowMargin.textContent.trim();
    const editedSilverLowMarginToNum = parseFloat(editedSilverLowMarginToText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var finalLowMarginValue = '';
    if (silverLowValueToNum > 0) {
      finalLowMarginValue = silverLowValueToNum + editedSilverLowMarginToNum;
    } else {
      finalLowMarginValue = silverLowValueToNum - editedSilverLowMarginToNum;
    }
    document.getElementById("silverNewLowValue").innerHTML = finalLowMarginValue;
  });


  const silverHighValue = document.getElementById("silverHighValue");
  const silverHighValueToText = silverHighValue.textContent.trim();
  const silverHighValueToNum = parseFloat(silverHighValueToText);
  document.getElementById("silverNewHighValue").innerHTML = silverHighValueToNum;
  const silverHighMargin = document.getElementById("silverHighMargin");
  const isHighValueEditable = silverHighMargin.getAttribute("contenteditable") === "true";
  silverHighMargin.setAttribute("contenteditable", isEditable ? "false" : "true");
  // Focus on the div to make it easier for the user to start editing
  if (isHighValueEditable) {
    silverHighMargin.blur();
  } else {
    silverHighMargin.focus();
  }
  silverHighMargin.addEventListener("input", function () {
    // This event handler will be triggered when the content is edited.
    const editedSilverHighMarginToText = silverHighMargin.textContent.trim();
    const editedSilverHighMarginToNum = parseFloat(editedSilverHighMarginToText);
    // You can now handle the edited content, e.g., save it to a variable or send it to the server.
    // For example:
    var finalHighMarginValue = '';
    if (silverHighValueToNum > 0) {
      finalHighMarginValue = silverHighValueToNum + editedSilverHighMarginToNum;
    } else {
      finalHighMarginValue = silverHighValueToNum - editedSilverHighMarginToNum;
    }
    document.getElementById("silverNewHighValue").innerHTML = finalHighMarginValue;
  });
}


