/*
    Selection Sort
    <------------->

    The selection sort is a combination of searching and sorting. it sorts an array by repeatedly finding the minimum 
    element from the unsorted part of the array and putting it at the beginning.

    Input: nums = [29, 10, 56, 14, 37] ----->>>>>  Output: [10, 14, 29, 37, 56]

    --> [29, 10, 56, 14, 37]
            ---------------> find smaller element (10 is smaller element then swap with 29)
    --> [10, 29, 56, 14, 37]
                ---------------> find smaller element (14 is smaller element then swap with 29)
    --> [10, 14, 56, 29, 37]
                    ---------------> find smaller element (29 is smaller element then swap with 56)
    --> [10, 14, 29, 56, 37]
                        ---------------> find smaller element (37 is smaller element then swap with 56)
    --> [10, 14, 29, 37, 56]
    
    Final Result :- [10, 14, 29, 37, 56]

*/

/*
    Dry Run :-

    Iteration - 1  [29, 10, 56, 14, 37]
        i = 0, minIndex = 0 (value at arr[0] is 29), Inner Loop (j = 1 to 4)

        - Compare arr[minIndex] = 29 with arr[1] = 10 Since 10 < 29, update minIndex = 1.
        - Compare arr[minIndex] = 10 with arr[2] = 56 Since 56 > 10, no change in minIndex.
        - Compare arr[minIndex] = 10 with arr[3] = 14 Since 14 > 10, no change in minIndex.
        - Compare arr[minIndex] = 10 with arr[4] = 37 Since 37 > 10, no change in minIndex.
    
        Swap: Since minIndex = 1 and i = 0, swap arr[0] and arr[1].
        arr = [10, 29, 56, 14, 37]

    Iteration - 2  [10, 29, 56, 14, 37]
        i = 1, minIndex = 1 (value at arr[1] is 29), Inner Loop (j = 2 to 4)

        - Compare arr[minIndex] = 29 with arr[2] = 56 Since 56 > 29, no change in minIndex.
        - Compare arr[minIndex] = 29 with arr[3] = 14 Since 14 < 29, update minIndex = 3.
        - Compare arr[minIndex] = 14 with arr[4] = 37 Since 37 > 14, no change in minIndex.

        Swap: Since minIndex = 3 and i = 1, swap arr[1] and arr[3].
        arr = [10, 14, 56, 29, 37]

    Iteration - 3  [10, 14, 56, 29, 37]
        i = 2, minIndex = 2 (value at arr[2] is 56), Inner Loop (j = 3 to 4)

        - Compare arr[minIndex] = 56 with arr[3] = 29: Since 29 < 56, update minIndex = 3.
        - Compare arr[minIndex] = 29 with arr[4] = 37: Since 37 > 29, no change in minIndex.
        
        Swap: Since minIndex = 3 and i = 2, swap arr[2] and arr[3].
        arr = [10, 14, 29, 56, 37]


    Iteration - 4  [10, 14, 29, 56, 37]
        i = 3, minIndex = 3 (value at arr[3] is 56), Inner Loop (j = 4)

        Compare arr[minIndex] = 56 with arr[4] = 37: Since 37 < 56, update minIndex = 4.

        Swap: Since minIndex = 4 and i = 3, swap arr[3] and arr[4].
        arr = [10, 14, 29, 37, 56]

    Iteration - 5  [10, 14, 29, 37, 56]

        i = 4, minIndex = 4 (value at arr[4] is 56), No inner loop runs as j = 5 is out of bounds.
        No swap needed as minIndex = i.

    
    Final Result: [10, 14, 29, 37, 56]
*/

const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
};
console.log(selectionSort([29, 10, 56, 14, 37])); /* Output: [ 10, 14, 29, 37, 56 ] */


/*
    Time Complexity :- O(n^2)
    Space Complexity :- O(1)
*/