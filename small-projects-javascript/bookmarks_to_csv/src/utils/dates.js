export const unixEpochToString = dateIn => {
  const dateNum = parseInt(dateIn, 10);
  if (Number.isNaN(dateNum)) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return new Date(dateNum * 1000).toISOString().slice(0, 10);
};
