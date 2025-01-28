/*
    Merge Sort
    <--------->

    Algorithm --> Divide and Conqure Rule

    1. Divide the unsorted list into n sublists, each containig 1 element.

    2. Take adjacent pairs of two singleton lists and merge them to form a list of 2 elements. n will 
       now convert into n/2 lists of size 2.

    3. Repeat the process till a single sorted list of obtained.


    Input: [48, 36, 13, 52, 19, 94, 21],    Output: [13, 19, 21, 36, 48, 52, 94]


    0    1    2   3  4   5   6
    [48, 36, 13, 52, 19, 94, 21],   length = 7/2 = 3
    <----------> <------------->
        3              4

    [48, 36, 13]           [52, 19, 94, 21]
        3/2 = 1              4/2 = 2

    [48]    [36, 13]        [52, 19]    [94, 21]
              2/2 = 1        2/2 = 1      2/2 = 1
    
    [48]    [36] [13]       [52] [19]   [94] [21]
    <---------------->      <------->   <-------->

    [13, 36, 48]            [19, 52]    [21, 94]
                            <------------------->
                            [19, 21, 52, 84]

    [13, 19, 21, 36, 48, 52, 84]


    Output: [13, 19, 21, 36, 48, 52, 84]
*/

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
  
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
  
    return merge(left, right);
};
  
const merge = (left, right) => {
    let sortedArr = [];
  
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }
    return [...sortedArr, ...left, ...right];
};
console.log(mergeSort([48, 36, 13, 52, 19, 94, 21])); /* Output: [13, 19, 21, 36, 48, 52, 84] */

/*
    Time Complexity :- O(nlog n)
    Space Complexity :- O(n)
*/