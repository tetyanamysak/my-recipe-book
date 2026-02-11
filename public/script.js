function toggleModal(show) {
  const modal = document.getElementById("deleteModal");
  if (modal) {
    modal.style.display = show ? "flex" : "none";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleModal(false);
  }
});
