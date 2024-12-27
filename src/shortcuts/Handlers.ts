export const Handlers = {
  TEST: (keyEvent?: KeyboardEvent, toggleNavbarVisibility?: () => void) => {
    if (keyEvent) {
      keyEvent.preventDefault();
    }
    if (toggleNavbarVisibility) {
      toggleNavbarVisibility();
    }
  },
};