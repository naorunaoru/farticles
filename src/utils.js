export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElement = (array) => {
  if (array.length === 0) {
    throw new Error("Cannot pick a random element from an empty array");
  }
  return array[Math.floor(Math.random() * array.length)];
};
