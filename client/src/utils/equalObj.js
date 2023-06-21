export const isEqualObj = (obj1, obj2) => {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  if (entries1.length !== entries2.length) {
    return false;
  }

  for (let i = 0; i < entries1.length; i++) {
    const [key1, value1] = entries1[i];
    const [key2, value2] = entries2[i];
    if (key1 !== key2 || value1 !== value2) {
      return false;
    }
  }

  return true;
};
