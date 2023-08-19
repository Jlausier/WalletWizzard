const isValidDate = (string) => {
  const date = new Date(string);
  return date.getTime() === date.getTime();
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US");

document.addEventListener("DOMContentLoaded", function () {
  let row;

  const addModal = document.getElementById("addModal");
  const editModal = document.getElementById("editModal");

  // Delegate event handling for income and expense buttons
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("income-btn")) {
      openAddModal("income");
    } else if (event.target.classList.contains("expense-btn")) {
      openAddModal("expense");
    } else if (event.target.classList.contains("goal-btn")) {
      openAddModal("goal");
    } else if (event.target.classList.contains("delete-button")) {
      handleDelete(event.target);
    } else if (event.target.classList.contains("edit-button")) {
      openEditModal(event.target);
    }
  });

  function openAddModal(type) {
    addModal.classList.remove("hidden");
    document.getElementById("addEntryType").value = type;
  }

  // ==================================================== ADD ENTRY ====================================================

  document.getElementById("addEntryBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const entryTypeEl = document.getElementById("addEntryType");
    const entryNameEl = document.getElementById("addEntryName");
    const entryMonthEl = document.getElementById("addEntryMonth");
    const entryAmountEl = document.getElementById("addEntryAmount");

    const entryType = entryTypeEl.value;
    const entryName = entryNameEl.value;
    const entryMonth = entryMonthEl.value;
    const entryAmount = entryAmountEl.value;

    if (!isValidDate(entryMonthEl.value)) {
      alert("Please enter a valid date.");
      return;
    }

    if (!(entryName && entryMonth && entryAmount)) {
      alert("Please fill in all fields.");
      return;
    }

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
        const table = entryType + "Table";
        appendRow(table, newEntry);
        closeModal(addModal);
        updateBudgetTable();

        // Clear the input fields and hide the modal
        entryNameEl.value = "";
        entryMonthEl.value = "";
        entryAmountEl.value = "";
        addModal.classList.add("hidden");

        function appendRow(tableId, entry) {
          const tableBody = document
            .getElementById(tableId)
            .getElementsByTagName("tbody")[0];
          const newRow = tableBody.insertRow(-1);

          // Remove placeholder row if it exists
          const placeholderRow = tableBody.querySelector(".placeholder-row");
          if (placeholderRow) placeholderRow.remove();

          newRow.dataset.entryid = newEntry.id;
          newRow.classList.add(
            "py-4",
            "border-t-2",
            "border-gray-700",
            "text-left",
            "text-gray-300",
            "w-full",
            "h-12"
          );

          // Create date container
          const dateCell = newRow.insertCell(0);
          dateCell.classList.add("text-gray-400");
          dateCell.innerText = formatDate(entry.scheduledDate);

          // Create name container
          const nameCell = newRow.insertCell(1);
          nameCell.classList.add("w-1/2", "pl-5", "text-gray-300");
          nameCell.innerText = entry.name;

          // Create monetary amount container
          const amountCell = newRow.insertCell(2);
          amountCell.classList.add("text-right");
          amountCell.innerText = "$" + parseFloat(entry.amount).toFixed(2);

          // Create buttons container
          const buttonsCell = newRow.insertCell(3);
          buttonsCell.classList.add("text-right");
          // Create edit button
          const editButton = document.createElement("button");
          editButton.classList.add(
            "px-1",
            "fas",
            "fa-edit",
            "edit-button",
            "text-gray-500",
            "hover:text-gray-200"
          );
          buttonsCell.appendChild(editButton);
          // Create delete button
          const deleteButton = document.createElement("button");
          deleteButton.classList.add(
            "px-1",
            "fas",
            "fa-trash",
            "delete-button",
            "text-gray-500",
            "hover:text-red-900"
          );
          buttonsCell.appendChild(deleteButton);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // Handle cancel button click for add modal
  document.getElementById("addCancelBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Hide the modal without making any changes
    addModal.classList.add("hidden");
  });

  function closeModal(modal) {
    modal.classList.add("hidden");
    // Additional code to clear input fields or perform other actions after closing the modal
  }

  // ==================================================== DELETE ENTRY =================================================

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

  // ==================================================== UPDATE ENTRY =================================================

  function openEditModal(editButton) {
    row = editButton.closest("tr");

    document.getElementById("editEntryName").value = row.cells[1].innerText;
    document.getElementById("editEntryMonth").value = row.cells[0].innerText;
    document.getElementById("editEntryAmount").value = parseFloat(
      row.cells[2].innerText.replace("$", "")
    ).toFixed(2);

    // Show the edit modal
    editModal.classList.remove("hidden");
  }

  // Handle update button click
  document.getElementById("editEntryBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    let editEntryNameEl = document.getElementById("editEntryName");
    let editEntryMonthEl = document.getElementById("editEntryMonth");
    let editEntryAmountEl = document.getElementById("editEntryAmount");

    const updatedName = editEntryNameEl.value;
    const updatedMonth = editEntryMonthEl.value;
    const updatedAmount = editEntryAmountEl.value;

    if (!isValidDate(updatedMonth)) {
      alert("Please enter a valid date");
      return;
    }

    const data = {
      name: updatedName,
      scheduledDate: updatedMonth,
      amount: parseFloat(updatedAmount).toFixed(2),
    };

    // Determine the entry type based on the table
    const entryType = row.closest("table").dataset.tablename;

    // Extract the entry ID from the row
    const entryId = row.dataset.entryid;

    // Make a PUT request to the appropriate endpoint
    fetch(`/api/${entryType}/${entryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((_) => {
        // Update the row with new values
        row.cells[0].innerText = formatDate(data.scheduledDate);
        row.cells[1].innerText = data.name;
        row.cells[2].innerText = "$" + data.amount;

        // Hide the edit modal
        editModal.classList.add("hidden");

        // Update the budget table
        updateBudgetTable();
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
        return;
      });
    return;
  });

  // Handle cancel button click
  document.getElementById("editCancelBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Hide the edit modal without making any changes
    editModal.classList.add("hidden");
    return;
  });

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
    return;
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
