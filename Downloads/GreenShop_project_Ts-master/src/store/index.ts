const getStore = (key: string) => {
  try {
    const result = localStorage.getItem(key);
    if (!result) {
      return undefined;
    }
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};
const SetStore = (key: string, data: object[]) => {
  try {
    const result = JSON.stringify(data);
    localStorage.setItem(key, result);
  } catch (error) {
    console.log(error);
  }
};

export { getStore, SetStore };
