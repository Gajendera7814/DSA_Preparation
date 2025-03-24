/*
    Find the Smallest Divisor Given a Threshold     Leetcode Problem
    <----------------------------------------->     <--------------->

    Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the 
    array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less 
    than or equal to threshold.

    Example - 1

        Input: nums = [1, 2, 5, 9], threshold = 6, Output: 5

    Example - 2

        Input: nums = [44, 22, 33, 11, 1], threshold = 5, Output: 44

        Explanation :- Take ceiling of the value

        Assume divisor = 1

            1/1 = 1,    2/1 = 2,    5/1 = 5,    9/1 = 9    sum = (1 + 2 + 5 + 9) = 17 <= thresholdValue (6) No   x

        divisor = 2

            1/2 = 1,    2/2 = 1,    5/2 = 3,    9/2 = 5    sum = (1 + 1 + 3 + 5) = 10 <= thresholdValue (6) No   x

        divisor = 3

            1/3 = 1,    2/3 = 1,    5/3 = 2,    9/3 = 3    sum = (1 + 1 + 2 + 3) = 7 <= thresholdValue (6) No    x

        divisor = 4
            
            1/4 = 1,    2/4 = 1,    5/4 = 2,    9/4 = 3    sum = (1 + 1 + 2 + 3) = 7 <= thresholdValue (6) No    x

        divisor = 5
            
            1/5 = 1,    2/5 = 1,    5/5 = 1,    9/5 = 2    sum = (1 + 1 + 1 + 2) = 5 <= thresholdValue (6) Yes --> ans
*/

/*<--------------------------------------------- Brute Force Approach ---------------------------------------------->*/

/*
    Input: [1, 2, 5, 9],  threshold = 6

    Step 1: Initialize Variables

        | Variable |        Value         |
        |----------|----------------------|
        |  maximum | Math.max(...arr) = 9 |

        Since the maximum value in the array is 9, the divisor d will iterate from 1 to 9.


    Step 2: Iterating Through Possible Divisors

        | Divisor d |       Calculation of sum (sum += Math.ceil(arr[i] / d))       | Total sum | Condition sum <= threshold |  Action  |
        |-----------|---------------------------------------------------------------|-----------|----------------------------|----------|
        |   1       | ceil(1/1) + ceil(2/1) + ceil(5/1) + ceil(9/1) = 1 + 2 + 5 + 9 |   17      |        No (17 > 6)         | Continue |
        |   2       | ceil(1/2) + ceil(2/2) + ceil(5/2) + ceil(9/2) = 1 + 1 + 3 + 5 |   10      |        No (10 > 6)         | Continue |
        |   3       | ceil(1/3) + ceil(2/3) + ceil(5/3) + ceil(9/3) = 1 + 1 + 2 + 3 |   7       |        No (7 > 6)          | Continue |
        |   4       | ceil(1/4) + ceil(2/4) + ceil(5/4) + ceil(9/4) = 1 + 1 + 2 + 3 |   7       |        No (7 > 6)          | Continue |
        |   5       | ceil(1/5) + ceil(2/5) + ceil(5/5) + ceil(9/5) = 1 + 1 + 1 + 2 |   5       |        Yes (5 ≤ 6)         | Return 5 |


    Step 3: Final Output

        smallestDivisors([1, 2, 5, 9], 6) = 5

        This means the smallest divisor that ensures the sum of the ceiling values does not exceed 6 is 5.
*/

const smallestDivisors = (arr, threshold) => {
    let maximum = Math.max(...arr);
    
    /* Find the smallest divisor - */
    for (let d = 1; d <= maximum; d++) {
        /* Find the summation result */
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += Math.ceil(arr[i] / d);
        }

        if (sum <= threshold) {
            return d;
        }
    }
    return -1;
};
console.log("The minimum divisor is:", smallestDivisors([1, 2, 5, 9], 6)); // Output: The minimum divisor is: 5




/*<--------------------------------------------- By Using Binary Search -------------------------------------------->*/

/*
    Input: [44, 22, 33, 11, 1],  threshold = 5

    
    Step 1: Initialize Variables

        | Variable  |       Value             |
        |-----------|-------------------------|
        | n         |  nums.length = 5        |
        | start     |  1                      |
        | end       |  Math.max(...nums) = 44 |

        Since n (5) ≤ threshold (5), we proceed with binary search.


    Step 2: Binary Search Loop

        | Iteration |       mid Calculation    |                                        computeSum(mid)                                     | sum ≤ threshold   |           Action          |
        |-----------|--------------------------|--------------------------------------------------------------------------------------------|-------------------|---------------------------|
        |    1      | mid = (1 + 44) / 2 = 22  | ceil(44/22) + ceil(22/22) + ceil(33/22) + ceil(11/22) + ceil(1/22) = 2 + 1 + 2 + 1 + 1 = 7 |       No (7 > 5)  | Move start = mid + 1 = 23 |
        |    2      | mid = (23 + 44) / 2 = 33 | ceil(44/33) + ceil(22/33) + ceil(33/33) + ceil(11/33) + ceil(1/33) = 2 + 1 + 1 + 1 + 1 = 6 |       No (6 > 5)  | Move start = mid + 1 = 34 |
        |    3      | mid = (34 + 44) / 2 = 39 | ceil(44/39) + ceil(22/39) + ceil(33/39) + ceil(11/39) + ceil(1/39) = 2 + 1 + 1 + 1 + 1 = 6 |       No (6 > 5)  | Move start = mid + 1 = 40 |
        |    4      | mid = (40 + 44) / 2 = 42 | ceil(44/42) + ceil(22/42) + ceil(33/42) + ceil(11/42) + ceil(1/42) = 2 + 1 + 1 + 1 + 1 = 6 |       No (6 > 5)  | Move start = mid + 1 = 43 |
        |    5      | mid = (43 + 44) / 2 = 43 | ceil(44/43) + ceil(22/43) + ceil(33/43) + ceil(11/43) + ceil(1/43) = 2 + 1 + 1 + 1 + 1 = 6 |       No (6 > 5)  | Move start = mid + 1 = 44 |
        |    6      | mid = (44 + 44) / 2 = 44 | ceil(44/44) + ceil(22/44) + ceil(33/44) + ceil(11/44) + ceil(1/44) = 1 + 1 + 1 + 1 + 1 = 5 |       Yes (5 ≤ 5) | Move end = mid - 1 = 43   |


    Step 3: Final Output

        When start > end, we stop and return start:

        smallestDivisor([44, 22, 33, 11, 1], 5) = 44

    This means the smallest divisor that ensures the sum of the ceiling values does not exceed 5 is 44.
*/

const smallestDivisor = (nums, threshold) => {
    const computeSum = (divisor) => {
        let total = 0;
        for (let num of nums) {
            total += Math.ceil(num / divisor);
        }
        return total;
    };

    /* Edge case: If the number of elements exceeds the threshold, return -1 */
    let n = nums.length;
    if (n > threshold) return -1;

    let start = 1;
    let end = Math.max(...nums);

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (computeSum(mid) <= threshold) {
            /* If the sum is within the threshold, try a smaller divisor (move left) */
            end = mid - 1;
        } else {
            /* If the sum exceeds the threshold, try a larger divisor (move right) */
            start = mid + 1;
        }
    }
    /* Return the smallest divisor that satisfies the threshold condition */
    return start;
};
console.log(smallestDivisor([44, 22, 33, 11, 1], 5));  // Output: 44
