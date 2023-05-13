const assert = require('assert');
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  //  val: number
  //  next: ListNode | null
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// interface ListNode {
//   val: number;
//   next: ListNode | null;
// }

/**
 *
 * @param {number[]} arr
 * @returns {ListNode}
 */
const arrToList = (arr) => {
  const list = new ListNode();
  let curList = list;
  arr.forEach((num, idx) => {
    curList.val = num;
    if (idx < arr.length - 1) {
      curList.next = new ListNode();
      curList = curList.next;
    }
  });
  return list;
};

/**
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns
 */
function addTwoNumbers(l1, l2) {
  let num1 = 0;
  let num2 = 0;
  let curList1 = l1;
  let curList2 = l2;
  let idx = 0;

  while (curList1.val > -1 || curList2.val > -1) {
    num1 += curList1.val > -1 ? curList1.val * 10 ** idx : 0;
    num2 += curList2.val > -1 ? curList2.val * 10 ** idx : 0;

    curList1 = curList1.next || { val: -1, next: null };
    curList2 = curList2.next || { val: -1, next: null };

    idx += 1;
  }

  const sum = num1 + num2;

  // create a list from the sum
  const sumAsArr = Array.from(String(sum))
    .reverse()
    .map((str) => Number(str));

  return arrToList(sumAsArr);
}

const testCases = [
  {
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    sum: [7, 0, 8],
  },
  {
    l1: [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1,
    ],
    l2: [5, 6, 4],
    // [0,3,NaN,NaN,1] -> because 1e+30 + 465
    sum: [
      6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1,
    ],
  },
];

const runTest = (testCase) => {
  const actual = addTwoNumbers(arrToList(testCase.l1), arrToList(testCase.l2));
  assert.deepEqual(actual, arrToList(testCase.sum));
  // assert.deepEqual(actual, arrToList([0]));
};

runTest(testCases[1]);
