
const STORAGE_KEY = "billFormState";

// ✅ Save bill state to local storage
export const saveBillToStorage = (billState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(billState));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

// ✅ Load bill state from local storage
export const loadBillFromStorage = () => {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return savedState || null;
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return null;
  }
};

// ✅ Remove bill state from local storage
export const removeBillFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error removing from local storage:", error);
  }
};
