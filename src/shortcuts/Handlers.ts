export const Handlers = {
  TEST: (keyEvent?: KeyboardEvent, toggleNavbarVisibility?: () => void) => {
    if (keyEvent) {
      keyEvent.preventDefault();
    }
    if (toggleNavbarVisibility) {
      console.log("toggleNavbarVisibility");
      toggleNavbarVisibility();
    }
    console.log("SHORTCUT");
  },
};