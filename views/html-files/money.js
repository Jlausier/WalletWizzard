document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const addEntryBtn = document.getElementById("addEntryBtn");
  const incomeTableBody = document.querySelector("#incomeTable tbody");
  const expenseTableBody = document.querySelector("#expenseTable tbody");

  const openModal = () => {
    modal.classList.remove("hidden");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    clearModalInputs();
  };

  const clearModalInputs = () => {
    document.getElementById("entryName").value = "";
    document.getElementById("entryMonth").value = "";
    document.getElementById("entryAmount").value = "";
  };

  const addRowToTable = (tableBody) => {
    const name = document.getElementById("entryName").value;
    const month = document.getElementById("entryMonth").value;
    const amount = document.getElementById("entryAmount").value;

    if (name && month && amount) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                
                <td class="border px-4 py-2">${month}</td>
                <td class="w-3/5">${name}</td>
                <td class="text-right">${amount}</td>
                <td class="text-4xl py-2"><button class="text-red-500 ml-4 delete-entry">-</button></td>
            `;

      const deleteButton = newRow.querySelector(".delete-entry");
      deleteButton.addEventListener("click", () => {
        newRow.remove();
      });

      tableBody.appendChild(newRow);
    }
  };

  addEntryBtn.addEventListener("click", () => {
    if (incomeTableBody.classList.contains("active")) {
      addRowToTable(incomeTableBody);
    } else if (expenseTableBody.classList.contains("active")) {
      addRowToTable(expenseTableBody);
    }

    closeModal();
  });

  document.querySelectorAll(".income-btn").forEach((button) => {
    button.addEventListener("click", function () {
      incomeTableBody.classList.add("active");
      expenseTableBody.classList.remove("active");
      openModal();
    });
  });

  document.querySelectorAll(".expense-btn").forEach((button) => {
    button.addEventListener("click", function () {
      incomeTableBody.classList.remove("active");
      expenseTableBody.classList.add("active");
      openModal();
    });
  });

  window.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
});
