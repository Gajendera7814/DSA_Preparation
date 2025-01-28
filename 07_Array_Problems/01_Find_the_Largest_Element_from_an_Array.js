/*
    Find the Largest Element from an Array
    <------------------------------------->

    Input: [1, 8, 7, 56, 90],    Output: 90

    Input: [1, 2, 0, 3, 2, 4, 5],    Output: 5
*/

const findLargestElem = (arr) => {
    if (arr.length === 0) return null;

    let largest = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i]
        }
    }
    return largest;
};
console.log(findLargestElem([1, 2, 4, 5, 6, 8, 9, 11])); /* Output: 11 */

/*
    Time Complexity: O(n)
    Space Complexity: O(1)
*/