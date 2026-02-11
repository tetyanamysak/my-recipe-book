document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearAllBtn");
  const cancelBtn = document.getElementById("cancelClearBtn");
  const modal = document.getElementById("clearAllModal");
  const openButtons = document.querySelectorAll(".btn-open-modal");

  console.log("Number of open buttons:", openButtons.length);

  openButtons.forEach((button) => {
    button.addEventListener("click", () => toggleModal(true));
    console.log("Modal opened");
    const modal = document.getElementById("modalId");
    if (modal) {
      modal.style.display = "flex";
    }
  });

  const toggleModal = (show) => {
    if (modal) {
      modal.style.display = show ? "flex" : "none";
    }
  };

  if (clearBtn) {
    clearBtn.addEventListener("click", () => toggleModal(true));
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => toggleModal(false));
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(false);
    }
  });
});
