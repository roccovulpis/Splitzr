const STORAGE_KEY = "billFormState";

export const saveBillToStorage = (billState) => {
  try {
    const clonedState = JSON.parse(JSON.stringify(billState)); 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clonedState));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const loadBillFromStorage = () => {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return savedState
      ? { ...savedState, isBillSubmitted: savedState.isBillSubmitted ?? false } 
      : {
          event: "",
          eventDate: "",
          items: [],
          newItem: "",
          itemPrice: "",
          quantity: "",
          isEditingEvent: true,
          editingIndex: null,
          isConfirmed: false,
          splitOption: null,
          people: [{ name: "", amount: 0 }],
          isBillSubmitted: false,
        };
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return {
      event: "",
      eventDate: "",
      items: [],
      newItem: "",
      itemPrice: "",
      quantity: "",
      isEditingEvent: true,
      editingIndex: null,
      isConfirmed: false,
      splitOption: null,
      people: [{ name: "", amount: 0 }],
      isBillSubmitted: false,
    };
  }
};

export const resetStoredBill = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error removing from local storage:", error);
  }
};
