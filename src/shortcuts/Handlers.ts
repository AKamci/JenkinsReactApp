
export const Handlers = {
    TEST: (keyEvent?: KeyboardEvent) => {
      if (keyEvent) {
        keyEvent.preventDefault();
      }
      console.log("SHORTCUT")
    },
  };