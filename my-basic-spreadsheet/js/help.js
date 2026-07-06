export function initHelp({ helpButton, helpDialog, helpCloseButton }) {
  if (!helpButton || !helpDialog) {
    return;
  }

  function openHelp() {
    if (typeof helpDialog.showModal === "function") {
      helpDialog.showModal();
      return;
    }

    helpDialog.setAttribute("open", "");
  }

  function closeHelp() {
    if (helpDialog.open) {
      helpDialog.close();
    }
  }

  helpButton.addEventListener("click", openHelp);
  helpCloseButton?.addEventListener("click", closeHelp);

  helpDialog.addEventListener("click", (event) => {
    const rect = helpDialog.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedBackdrop) {
      closeHelp();
    }
  });

  helpDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeHelp();
  });
}
