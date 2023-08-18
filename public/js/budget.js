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
    } else if (event.target.classList.contains("expense-btn")) {
      openModal("expense");
    } else if (event.target.classList.contains("goal-btn")) {
      openModal("goal");
    } else if (event.target.classList.contains("delete-button")) {
      handleDelete(event.target);
    } else if (event.target.classList.contains("edit-button")) {
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
      const data = {
        name: entryName,
        scheduledDate: entryMonth,
        amount: parseFloat(entryAmount),
      };

      // Make a POST request to the appropriate endpoint
      fetch(`/api/${entryType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((newEntry) => {
          const table = entryType === "income" ? "incomeTable" : "expenseTable";
          appendRow(table, newEntry);
          closeModal(modal);
          updateBudgetTable();

          // Clear the input fields and hide the modal
          document.getElementById("entryName").value = "";
          document.getElementById("entryMonth").value = "";
          document.getElementById("entryAmount").value = "";
          modal.classList.add("hidden");

          function appendRow(tableId, entry) {
            const tableBody = document
              .getElementById(tableId)
              .getElementsByTagName("tbody")[0];
            const newRow = tableBody.insertRow(-1);

            newRow.dataset.entryid = newEntry.id;

            // Create cells and populate them with entry data
            const cell1 = newRow.insertCell(0);
            cell1.classList.add("py-2", "text-gray-400");
            cell1.innerText = formatDate(entry.scheduledDate);

            const cell2 = newRow.insertCell(1);
            cell2.classList.add("w-1/2", "pl-5", "text-gray-300");
            cell2.innerText = entry.name;

            const cell3 = newRow.insertCell(2);
            cell3.classList.add("text-right", "text-gray-300");
            cell3.innerText = "$" + parseFloat(entry.amount).toFixed(2);

            const cell4 = newRow.insertCell(3);
            cell4.classList.add("text-right");
            const editButton = document.createElement("button");
            editButton.classList.add(
              "px-1",
              "fas",
              "fa-edit",
              "edit-button",
              "text-gray-500",
              "hover:text-gray-200"
            );
            cell4.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add(
              "px-1",
              "fas",
              "fa-trash",
              "delete-button",
              "text-gray-500",
              "hover:text-red-900"
            );
            cell4.appendChild(deleteButton);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Handle cancel button click for add modal
  cancelBtn.addEventListener("click", () => {
    // Hide the modal without making any changes
    modal.classList.add("hidden");
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  function closeModal(modalElement) {
    modalElement.classList.add("hidden");
    // Additional code to clear input fields or perform other actions after closing the modal
  }

  function handleDelete(deleteButton) {
    const row = deleteButton.closest("tr");

    // Extract the entry ID from the row
    const entryId = row.dataset.entryid;

    if (!entryId) {
      alert("Could not delete row, try again.");
      return;
    }

    const table = row.closest("table");
    table.deleteRow(row.rowIndex);

    // Determine the entry type based on the table
    const entryType = table.dataset.tablename;

    // Make a DELETE request to the appropriate endpoint
    fetch(`/api/${entryType}/${entryId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Could not delete " + entryType);
      })
      .then((_) => {
        updateBudgetTable();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function openEditModal(editButton) {
    const row = editButton.parentNode.parentNode;
    const date = row.cells[0].innerText;
    const name = row.cells[1].innerText;
    const amount = parseFloat(row.cells[2].innerText.replace("$", ""));

    document.getElementById("editEntryMonth").value = date;
    document.getElementById("editEntryName").value = name;
    document.getElementById("editEntryAmount").value = amount.toFixed(2);

    // Show the edit modal
    editModal.classList.remove("hidden");

    // Handle update button click
    updateEntryBtn.addEventListener("click", () => {
      const updatedMonth = document.getElementById("editEntryMonth").value;
      const updatedName = document.getElementById("editEntryName").value;
      const updatedAmount = document.getElementById("editEntryAmount").value;

      // Validate the format of the updatedMonth using a regular expression
      const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!datePattern.test(updatedMonth)) {
        alert("Please enter a valid date in MM/DD/YYYY format.");
        return;
      }

      const updatedData = {
        name: updatedName,
        scheduledDate: updatedMonth,
        amount: parseFloat(updatedAmount),
      };

      // Determine the entry type based on the table
      const entryType =
        row.closest("table").id === "incomeTable" ? "income" : "expense";

      // Extract the entry ID from the row
      const entryId = row.dataset.entryid;

      // Make a PUT request to the appropriate endpoint
      fetch(`/api/${entryType}/${entryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((updatedEntry) => {
          // Update the row with new values
          row.cells[0].innerText = formatDate(updatedMonth);
          row.cells[1].innerText = updatedName;
          row.cells[2].innerText = "$" + parseFloat(updatedAmount).toFixed(2);

          // Hide the edit modal
          editModal.classList.add("hidden");

          // Update the budget table
          updateBudgetTable();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    // Handle cancel button click
    cancelEditBtn.addEventListener("click", () => {
      // Hide the edit modal without making any changes
      editModal.classList.add("hidden");
    });
  }

  // Function to update the Your Budget table
  function updateBudgetTable() {
    const incomeTable = document.getElementById("incomeTable");
    const expenseTable = document.getElementById("expenseTable");
    const goalTable = document.getElementById("goalTable");
    const budgetTable = document.getElementById("budgetTable");

    const incomeTotal = calculateTotal(incomeTable);
    const expensesTotal = calculateTotal(expenseTable);
    const goalsTotal = calculateTotal(goalTable);

    const incomeRow = budgetTable.rows[0]; // Updated index
    const expensesRow = budgetTable.rows[1]; // Updated index
    const goalsRow = budgetTable.rows[2]; // Updated index

    incomeRow.cells[1].innerText = "$" + incomeTotal.toFixed(2);
    expensesRow.cells[1].innerText = "$" + expensesTotal.toFixed(2);
    goalsRow.cells[1].innerText = "$" + goalsTotal.toFixed(2);

    const finalIncome = incomeTotal - expensesTotal - goalsTotal;
    budgetTable.rows[3].cells[1].innerText = "$" + finalIncome.toFixed(2);
  }

  // Function to calculate the total amount for a table
  function calculateTotal(table) {
    if (!table) return 0;
    const tableBody = table.getElementsByTagName("tbody")[0];
    if (!tableBody) return 0;

    let total = 0;
    for (let i = 0; i < tableBody.rows.length; i++) {
      const amountCell = tableBody.rows[i].cells[2];
      const amount = parseFloat(amountCell.innerText.replace("$", ""));
      total += amount;
    }

    return total;
  }

  // Call updateBudgetTable to initialize values
  updateBudgetTable();
});
