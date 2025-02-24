export const loadBillFromStorage = () => {
    const savedState = JSON.parse(localStorage.getItem("billFormState"));
    return savedState || {
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
  };
  
  export const saveBillToStorage = (state) => {
    localStorage.setItem("billFormState", JSON.stringify(state));
  };
  
  export const resetStoredBill = () => {
    localStorage.removeItem("billFormState");
  };
  