/*
    Insertion Sort
    <------------->

    Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands. we choose one card
    at a time and insert it into the sorted part of our hand.

    working of insertion sort
    <------------------------>
    1. we start by making the second element of the given array, i.e element at index 1, the key.

    2. we compare the key with the elements before it, in this case element at index 0.
        - if the key is smaller than the first element, then we insert the key element before the first element.
        - if the key is greater than the first element, then we insert it after the first element.

    Input : [5, 1, 6, 2, 4, 3]

    --> [5, 1,  6, 2, 4, 3], (1 is a key element) if 1 < 5 then put into first position
           ---
    --> [1, 5,  6, 2, 4, 3], (6 is a key element) if 6 < 5 No then no position change 
              ---
    --> [1, 5,  6, 2, 4, 3], (2 is a key element) if 2 < 6 then put into position 2
                  ---
    --> [1, 2, 5, 6, 4, 3], (4 is a key element) if 4 < 6 then put into position 3
                    ---
    --> [1, 2,  4, 5, 6, 3], (3 is a key element) if 3 < 6 then put into position 3
                        ---
    --> [1, 2,  3,  4, 5, 6]

    Final Output: [1, 2,  3,  4, 5, 6]
*/

const insertionSort = (arr) => {
    const n = arr.length;
  
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
};
console.log(insertionSort([5, 1, 6, 2, 4, 3])); /* Output: [ 1, 2, 3, 4, 5, 6 ] */


/*
    Time Complexity : O(n^2)
    Space Complexity : O(1)
*/

