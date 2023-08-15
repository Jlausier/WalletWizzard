document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const editModal = document.getElementById("editModal");
    const addEntryBtn = document.getElementById("addEntryBtn");
    const updateEntryBtn = document.getElementById("updateEntryBtn");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const cancelBtn = document.getElementById("cancelBtn");


    // Delegate event handling for income and expense buttons
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("income-btn")) {
            openModal("income");
        }
        if (event.target.classList.contains("expense-btn")) {
            openModal("expense");
        }
        // Handle delete button clicks here
        if (event.target.classList.contains("delete-button")) {
            handleDelete(event.target);
        }
        // Handle edit button clicks here
        if (event.target.classList.contains("edit-button")) {
            openEditModal(event.target);
        }
    });
    function openModal(type) {
        modal.classList.remove("hidden");
        document.getElementById("entryType").value = type;
    }

    addEntryBtn.addEventListener("click", () => {
        const entryType = document.getElementById("entryType").value;
        const entryName = document.getElementById("entryName").value;
        const entryMonth = document.getElementById("entryMonth").value;
        const entryAmount = document.getElementById("entryAmount").value;

         // Validate the format of the entryMonth using a regular expression
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!datePattern.test(entryMonth)) {
        alert("Please enter a valid date in MM/DD/YYYY format.");
        return;
    }

        if (entryName && entryMonth && entryAmount) {
            const table = entryType === "income" ? "incomeTable" : "expenseTable";
            const tableBody = document.getElementById(table).getElementsByTagName("tbody")[0];

            const newRow = tableBody.insertRow(-1);

            const cell1 = newRow.insertCell(0);
            cell1.classList.add("border-t-2", "border-gray-700", "text-left", "text-gray-300", "w-1/5");
            cell1.innerText = formatDate(entryMonth);

            const cell2 = newRow.insertCell(1);
            cell2.classList.add("border-t-2", "border-gray-700", "text-left", "text-gray-300", "w-3/5");
            cell2.innerText = entryName;

            const cell3 = newRow.insertCell(2);
            cell3.classList.add("border-t-2", "border-gray-700", "text-left", "text-gray-300", "w-1/5");
            cell3.innerText = "$" + parseFloat(entryAmount).toFixed(2);

            const cell4 = newRow.insertCell(3);
            cell4.classList.add("border-t-2", "border-gray-700", "text-right");
            const editButton = document.createElement("button");
            editButton.classList.add("edit-button", "fas", "fa-edit", "text-gray-300", "mr-2");
            editButton.innerText = "Edit";
            cell4.appendChild(editButton)
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button", "text-red-600");
            deleteButton.innerText = "Delete";
            cell4.appendChild(deleteButton);

            // Add an event listener to the newly created delete button
            deleteButton.addEventListener("click", () => {
                handleDelete(deleteButton);
            });
           

            document.getElementById("entryName").value = "";
            document.getElementById("entryMonth").value = "";
            document.getElementById("entryAmount").value = "";

            modal.classList.add("hidden");
        } else {
            alert("Please fill in all fields.");
        }
    });
       // Handle cancel button click
        cancelBtn.addEventListener("click", () => {
            // Hide the modal without making any changes
            modal.classList.add("hidden");
        });

    function handleDelete(deleteButton) {
        const row = deleteButton.parentNode.parentNode;
        const table = row.parentNode.parentNode;
        table.deleteRow(row.rowIndex);
    }

// Function to format the date as MM/DD/YYYY
function formatDate(dateString) {
    const [month, day, year] = dateString.split("/");
    return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
}
// Function to open the edit modal with pre-filled values
    function openEditModal(editButton) {
        const row = editButton.parentNode.parentNode;
        const date = row.cells[0].innerText;
        const name = row.cells[1].innerText;
        const amount = parseFloat(row.cells[2].innerText.replace("$", ""));

        // Populate edit modal fields
        document.getElementById("editEntryMonth").value = date;
        document.getElementById("editEntryName").value = name;
        document.getElementById("editEntryAmount").value = amount.toFixed(2);

        // Show the edit modal
        editModal.classList.remove("hidden");

        // Handle update button click
        updateEntryBtn.addEventListener("click", () => {
            // Update the row with new values
            row.cells[0].innerText = formatDate(document.getElementById("editEntryMonth").value);
            row.cells[1].innerText = document.getElementById("editEntryName").value;
            row.cells[2].innerText = "$" + parseFloat(document.getElementById("editEntryAmount").value).toFixed(2);

            // Hide the edit modal
            editModal.classList.add("hidden");
        });

        // Handle cancel button click
        cancelEditBtn.addEventListener("click", () => {
            // Hide the edit modal without making any changes
            editModal.classList.add("hidden");
        });
    }
});