/*
    Sum of subarray ranges    Leetcode Problem
    <--------------------->   <--------------->

    You are given an integer array nums. The range of a subarray of nums is the difference between the largest and 
    smallest element in the subarray.

    Return the sum of all subarray ranges of nums.

    Input: nums = [1, 4, 3, 2],  Output: 13

    range = largest - smallest 

    Possible sunarray - 

    1              range = 1 - 1 = 0
    1, 4           range = 4 - 1 = 3
    1, 4, 3        range = 4 - 1 = 3
    1, 4, 3, 2     range = 4 - 1 = 3


    4              range = 4 - 4 = 0
    4, 3           range = 4 - 3 = 1
    4, 3, 2        range = 4 - 2 = 2


    3              range = 3 - 3 = 0
    3, 2           range = 3 - 2 = 1


    2              range = 2 - 2 = 0



    So the sum of all ranges is 0 + 3 + 3 + 3 + 0 + 1 + 2 + 0 + 1 + 1 = 13
*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

const sumOfSubarrayRanges = (arr) => {
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        let largest = arr[i];
        let smallest = arr[i];
        
        for (let j = i + 1; j < arr.length; j++) {
            largest = Math.max(largest, arr[j]);
            smallest = Math.min(smallest, arr[j]);
            
            sum = sum + (largest - smallest);
        }
    }
    
    return sum;
};
console.log(sumOfSubarrayRanges([1, 2, 3])); // Output: 4
console.log(sumOfSubarrayRanges([1, 3, 3])); // Output: 4
console.log(sumOfSubarrayRanges([1, 4, 3, 2])); // Output: 13
console.log(sumOfSubarrayRanges([4, -2, -3, 4, 1])); // Output: 59


/*
    Time Complexity: O(n²)
    Space Complexity: O(1)
*/




/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

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
        };
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
        };
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
            while (stack.length > 0 && top(stack)[0] <= arr[i]) {
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
    
    /* Find Nearest Larger In Right Index. */
    for (let i = arr.length - 1; i >= 0; i--) {
        if(stack2.length === 0) {
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
        };
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

/* Calculate the difference. */
const SumofSubarrayRanges = (arr) => {
    const minSum = SumofSubarrayMinimum(arr);
    const maxSum = SumofSubarrayMaximum(arr);
    return (maxSum - minSum + 1e9 + 7) % (1e9 + 7);
};

console.log(SumofSubarrayRanges([3, 1, 2, 4])); // Output: 13
