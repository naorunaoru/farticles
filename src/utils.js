export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomBellCurve = (mean, stdDev) => {
  const u1 = Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  return z0 * stdDev + mean;
};

export const getRandomElement = (array) => {
  if (array.length === 0) {
    throw new Error("Cannot pick a random element from an empty array");
  }
  return array[Math.floor(Math.random() * array.length)];
};
