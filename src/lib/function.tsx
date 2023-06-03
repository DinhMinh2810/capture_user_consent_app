export const getDataLocalStorage = (name: string) => {
  try {
    return JSON.parse(localStorage.getItem(name) || "");
  } catch (error) {
    return null;
  }
};
