export const Handlers = {
  TEST: (keyEvent?: KeyboardEvent, toggleNavbarVisibility?: () => void) => {
    if (keyEvent) {
      keyEvent.preventDefault();
      console.log('Shift+T tuşuna basıldı.');
    }
    if (toggleNavbarVisibility) {
      console.log('Header görünürlüğü değiştiriliyor.');
      toggleNavbarVisibility();
    }
  },
};