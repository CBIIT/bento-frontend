export const storeInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || {};
export const deleteFromLocalStorage = (key) => localStorage.removeItem(key);
