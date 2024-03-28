const STORAGE_KEYS = {
  answerCounts: "answer counts",
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Set state error: ", err.message);
  }
};

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error("Get state error: ", err.message);
  }
};

export default { STORAGE_KEYS, save, load };
