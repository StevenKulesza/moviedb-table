export const sortColumn = (data, colIdx, reverse) => {
  if (reverse === true) {
    data.sort(sortFunction).reverse();
  } else {
    data.sort(sortFunction);
  }

  function sortFunction(a, b) {
    if (a[colIdx] === b[colIdx]) {
      return 0;
    } else {
      return a[colIdx] < b[colIdx] ? -1 : 1;
    }
  }
  return data;
};
