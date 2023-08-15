
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const incomeBtn = document.querySelector(".income-btn");
    const expenseBtn = document.querySelector(".expense-btn");
    const addEntryBtn = document.getElementById("addEntryBtn");

    incomeBtn.addEventListener("click", () => openModal("income"));
    expenseBtn.addEventListener("click", () => openModal("expense"));

    function openModal(type) {
      modal.classList.remove("hidden");
      document.getElementById("entryType").value = type;
    }

    addEntryBtn.addEventListener("click", () => {
      const entryType = document.getElementById("entryType").value;
      const entryName = document.getElementById("entryName").value;
      const entryMonth = document.getElementById("entryMonth").value;
      const entryAmount = document.getElementById("entryAmount").value;

      if (entryName && entryMonth && entryAmount) {
        const table = entryType === "income" ? "incomeTable" : "expenseTable";
        const tableBody = document.getElementById(table).getElementsByTagName("tbody")[0];

        const newRow = tableBody.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.innerHTML = entryMonth;
        cell2.innerHTML = entryName;
        cell3.innerHTML = "$" + parseFloat(entryAmount).toFixed(2);
        cell4.innerHTML = '<button class="delete-button text-red-600">Delete</button>';

        document.getElementById("entryName").value = "";
        document.getElementById("entryMonth").value = "";
        document.getElementById("entryAmount").value = "";

        modal.classList.add("hidden");
      } else {
        alert("Please fill in all fields.");
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-button")) {
        const row = event.target.parentNode.parentNode;
        const table = row.parentNode.parentNode;
        table.deleteRow(row.rowIndex);
      }
    });
  });

