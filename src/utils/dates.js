export const startOfWeek = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // week starts sunday
  return d.getTime();
};

export const isThisWeek = (timestamp) =>
  typeof timestamp === "number" && timestamp >= startOfWeek();
