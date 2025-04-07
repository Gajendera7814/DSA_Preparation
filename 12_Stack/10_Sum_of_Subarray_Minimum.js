/*
    Sum of Subarray Minimum
    <---------------------->

    Given an array of integers, find the sum of the minimum values of all subarrays.

    Input: [3, 1, 2, 4],  Output: 17


    Possible SubArray -

    3           ----->> 3

    3, 1        ----->> 1

    3, 1, 2     ----->> 1

    3, 1, 2, 4  ----->> 1



    1           ----->> 1

    1, 2        ----->> 1

    1, 2, 4     ----->> 1



    2           ----->> 2

    2, 4        ----->> 2



    4           ----->> 4

    ------------------------
                sum = 17
    ------------------------
*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

const sumOfSubarrayMinimums = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            let minElement = arr[i];
            for (let k = i + 1; k <= j; k++) {
                if (arr[k] < minElement) {
                    minElement = arr[k];
                }
            }
            sum += minElement;
        }
    }

    return sum;
};
console.log(sumOfSubarrayMinimums([3, 1, 2, 4])); // Output: 17


/*<--------------------------------------------------- OR --------------------------------------------------------->*/

const sumOfSubarrayMinimum = (arr) => {
    const mod = 1e9 + 7;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let minElement = arr[i];
        for (let j = i; j < arr.length; j++) {
            minElement = Math.min(minElement, arr[j]);
            sum = (sum + minElement) % mod;
        }
    }
    return sum;
};
console.log(sumOfSubarrayMinimum([3, 1, 2, 4])); // Output: 17


/*
    Time Complexity: O(n²)
    Space Complexity: O(1)
*/



/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Approach Overview
    
    1. Identify the Nearest Smaller Elements:

        - Left Nearest Smaller Elements (leftResult):
            For each element in the array, find the index of the nearest smaller element to its left.
        
        - Right Nearest Smaller Elements (rightResult):
            For each element in the array, find the index of the nearest smaller element to its right.
    
    2. Calculate the Contribution of Each Element:

        - Each element in the array contributes to multiple subarrays where it is the minimum element. 
          The number of subarrays in which an element at index i is the minimum can be determined using the 
          nearest smaller elements to the left and right.
    
        - Specifically:
            
            left = i - leftResult[i] gives the number of elements to the left that the current element is the smallest in.
            right = rightResult[i] - i gives the number of elements to the right that the current element is the smallest in.
        
        - The total contribution of the element at index i to the sum of subarray minimums is then calculated as right * left * arr[i].
    
    3. Sum All Contributions:

        - Sum up the contributions of all elements to get the final result.


    Approach :-

        i :  0  1  2  3

    arr : [3, 1, 2, 4]

    leftResult : [-1, -1, 1, 2]

    rightResult : [1, 4, 4, 4]

    Element at index 0 (3) :-
        left = i - leftResult[i] = 0 - (-1) = 1
        right = rightResult[i] - i = 1 - 0 = 1
        Contribution: 1 * 1 * 3 = 3
        total = 3
    
    Element at index 1 (1) :-
        left = 1 - (-1) = 2
        right = 4 - 1 = 3
        Contribution: 2 * 3 * 1 = 6
        total = 3 + 6 = 9

    Element at index 2 (2) :-
        left = 2 - 1 = 1
        right = 4 - 2 = 2
        Contribution: 1 * 2 * 2 = 4
        total = 9 + 4 = 13

    Element at index 3 (4) :-
        left = 3 - 2 = 1
        right = 4 - 3 = 1
        Contribution: 1 * 1 * 4 = 4
        total = 13 + 4 = 17

    Final Result: The total sum of subarray minimums is 17.

*/


const SumofSubarrayMinimum = (arr) => {
    let leftResult = [];
    let stack = [];
    let psudoIndex = -1;
    const mod = 1e9 + 7;
    
    const top = (stack) => {
        return stack[stack.length - 1];
    }
    
    /* Find Nearest Smaller In Left Index. */
    for (let i = 0; i < arr.length; i++) {
        if (stack.length === 0) {
            leftResult.push(psudoIndex);
        } else if (stack.length > 0 && top(stack)[0] < arr[i]) {
            leftResult.push(top(stack)[1]);
        } else if (stack.length > 0 && top(stack)[0] >= arr[i]) {
            while (stack.length > 0 && top(stack)[0] >= arr[i]) {
                stack.pop();
            }
            if (stack.length === 0) {
                leftResult.push(psudoIndex);
            } else {
                leftResult.push(top(stack)[1]);
            }
        }
        stack.push([arr[i], i]);
    };
    
    let rightResult = [];
    let stack2 = [];
    let psudoIndex2 = arr.length;
    
    /* Find Nearest Smaller In Right Index. */
    for (let i = arr.length - 1; i >= 0; i--) {
        if (stack2.length === 0) {
            rightResult.push(psudoIndex2);
        } else if (stack2.length > 0 && top(stack2)[0] < arr[i]) {
            rightResult.push(top(stack2)[1]);
        } else if (stack2.length > 0 && top(stack2)[0] >= arr[i]) {
            while (stack2.length > 0 && top(stack2)[0] >= arr[i]) {
                stack2.pop();
            }
            if (stack2.length === 0) {
                rightResult.push(psudoIndex2);
            } else {
                rightResult.push(top(stack2)[1]);
            }
        }
        stack2.push([arr[i], i]);
    }
    rightResult.reverse();
    
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        let left = i - leftResult[i];
        let right = rightResult[i] - i;
        
        total = (total + (right * left * arr[i]) % mod) % mod;
    };
    
    return total;
};
console.log(SumofSubarrayMinimum([3, 1, 2, 4]));


/*
    Time Complexity = O(n)
    Space Complexity = O(n)
*/



/*<-------------------------------------------- Find Sum of Subarray Maximum --------------------------------------->*/

const SumofSubarrayMaximum = (arr) => {
    let leftResult = [];
    let stack = [];
    let psudoIndex = -1;
    const mod = 1e9 + 7;
    
    const top = (stack) => {
        return stack[stack.length - 1];
    }
    
    /* Find Nearest Larger In Left Index. */
    for (let i = 0; i < arr.length; i++) {
        if (stack.length === 0) {
            leftResult.push(psudoIndex);
        } else if (stack.length > 0 && top(stack)[0] > arr[i]) {
            leftResult.push(top(stack)[1]);
        } else if (stack.length > 0 && top(stack)[0] <= arr[i]) {
            while(stack.length > 0 && top(stack)[0] <= arr[i]) {
                stack.pop();
            }
            if (stack.length === 0) {
                leftResult.push(psudoIndex);
            } else {
                leftResult.push(top(stack)[1]);
            }
        }
        stack.push([arr[i], i]);
    }
    
    let rightResult = [];
    let stack2 = [];
    let psudoIndex2 = arr.length;
    
    /* Find Nearest Larger In Right Index. */
    for (let i = arr.length - 1; i >= 0; i--) {
        if (stack2.length === 0) {
            rightResult.push(psudoIndex2);
        } else if (stack2.length > 0 && top(stack2)[0] > arr[i]) {
            rightResult.push(top(stack2)[1]);
        } else if (stack2.length > 0 && top(stack2)[0] <= arr[i]) {
            while (stack2.length > 0 && top(stack2)[0] <= arr[i]) {
                stack2.pop();
            }
            if (stack2.length === 0) {
                rightResult.push(psudoIndex2);
            } else {
                rightResult.push(top(stack2)[1]);
            }
        }
        stack2.push([arr[i], i]);
    };
    rightResult.reverse();
    
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        let left = i - leftResult[i];
        let right = rightResult[i] - i;
        
        total = (total + (right * left * arr[i]) % mod) % mod;
    };
    
    return total;
};

console.log(SumofSubarrayMaximum([3, 1, 2, 4]));
