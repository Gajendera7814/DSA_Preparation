/*
    Find the Second Largest element from an array.
    <--------------------------------------------->

    Input: [12, 35, 1, 10, 34, 1],    Output: 34

    Input: [34, 45, 78, 23, 23, 23],     Output: 45
*/

/*
    Approach Followed
    <---------------->

    follows a "Two-Pass Iterative Approach" to find the second largest element in an array. 

    1. Step 1: Find the Largest Element  
        - Initialize a variable "largest" to store the maximum value.
        - Traverse the array in the first loop:
            - Compare each element with "largest". If an element is greater than "largest", update "largest" with the current element.
        - At the end of this loop, the "largest" variable holds the maximum value in the array.


    2. Step 2: Find the Second Largest Element  
        - Initialize a variable "sLargest" (second largest) to "-1" or any value that indicates "not found."
        - Traverse the array in the second loop:
            - Compare each element with "sLargest" and ensure the element is not equal to "largest".
            - If the element is greater than "sLargest" and less than "largest", update "sLargest" with the current element.
        - At the end of this loop, the "sLargest" variable holds the second largest value.


    3. Step 3: Return the Result  
        - Return the value of "sLargest" after the second loop.
*/

/*<------------------------------------------------ Approach 1 ------------------------------------------------------>*/

const findSecondLargest = (arr) => {
    if (arr.length < 2) return null;

    let largest = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }

    let sLargest = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > sLargest && arr[i] !== largest) {
            sLargest = arr[i];
        }
    }

    return sLargest;
};
console.log(findSecondLargest([12, 35, 1, 10, 34, 1])); /* Output: 34 */

/*
    Time Complexity
    <-------------->

    - First loop: O(n) to find the largest element.
    - Second loop: O(n) to find the second largest element.
    
    Overall time complexity: O(n) + O(n) = O(2n).
    
    
    Space Complexity
    <-------------->

    Overall space complexity: O(1), Uses constant extra space for variables (largest and sLargest).
*/




/*<------------------------------------------------ Approach 2 ------------------------------------------------------>*/

/*
    Approach Followed
    <---------------->

    uses a "Single-Pass Iterative Approach" to find the second largest element in the array.

    1. Initialize Variables:
        - 'largest' is initialized to the first element of the array.
        - 'sLargest' (second largest) is initialized to '-Infinity' to handle edge cases like negative numbers.


    2. Traverse the Array in a Single Loop:
        - Start iterating from the second element ('i = 1'):

            "Case 1": If the current element is greater than 'largest':
                - Update 'sLargest' to the value of 'largest' (the previous largest element).
                - Update 'largest' to the current element.
            
            "Case 2": If the current element is not greater than 'largest' but is greater than 'sLargest':
                - Update 'sLargest' to the current element.

        - This ensures that 'largest' and 'sLargest' are updated dynamically in a single traversal.

    3. Return the Result:
        - After the loop, 'sLargest' holds the second largest value.
        - Return 'sLargest'.


    Example Walkthrough -
    <-------------------->

    For the input [34, 45, 78, 23, 23, 23]:

    - Initially, largest = 34, sLargest = -Infinity
    - Iteration 1 (i = 1): arr[i] = 45 → Update sLargest = 34, largest = 45.
    - Iteration 2 (i = 2): arr[i] = 78 → Update sLargest = 45, largest = 78.
    - Iterations 3-5: All elements (23) are smaller than both largest and sLargest, so no updates.

    Result: sLargest = 45.

*/

const secondLargestElement = (arr) => {
    let largest = arr[0];
    let sLargest = -Infinity;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            sLargest = largest;
            largest = arr[i];
        } else if (arr[i] > sLargest && arr[i] < largest) {
            sLargest = arr[i];
        }
    }
    return sLargest;
};
console.log(secondLargestElement([34, 45, 78, 23, 23, 23])); /* Output: 45 */

/*
    Time Complexity
    <-------------->
    
    Time complexity: O(n), where n is the length of the array. the function traverses the array only once. 

    Space Complexity
    <--------------->

    Space complexity: O(1), Only two variables (largest and sLargest) are used for computation.
*/

