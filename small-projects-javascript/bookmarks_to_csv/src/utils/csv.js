import Papa from 'papaparse';

// With implicit header row
// (keys of first object populate header row)
// const csv = Papa.unparse([
//   {
//     'Column 1': 'foo',
//     'Column 2': 'bar'
//   },
//   {
//     'Column 1': 'abc',
//     'Column 2': 'def'
//   }
// ]);

export const getCSV = arr => Papa.unparse(arr);
