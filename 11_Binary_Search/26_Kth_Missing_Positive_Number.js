/*
    Kth Missing Positive Number     Leetcode Problem
    <------------------------->    <---------------->

    Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

    Return the kth positive integer that is missing from this array.

    Example - 1
    
        Input: arr = [2, 3, 4, 7, 11],  k = 5,  Output: 9
        
        Explanation: The missing positive integers are [1, 5, 6, 8, 9, 10, 12, 13,...].
        
        The 5th missing positive integer is 9.

    Example - 2

        Input: arr = [1, 2, 3, 4],  k = 2,  Output: 6
        
        Explanation: The missing positive integers are [5, 6, 7,...]. 

        The 2nd missing positive integer is 6.
*/


/*<---------------------------------------------- Brute Force Approach --------------------------------------------->*/

const findKthPositives = (arr, k) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= k) {
            k++;
        } else {
            break;
        }
    }
    return k;
};
console.log(findKthPositives([2, 3, 4, 7, 11], 5));  // Output: 9




/*<------------------------------------------ By Using Binary Search ----------------------------------------------->*/

/*
    Algorithm :-

    Let’s understand it using an example. 
    
    Assume the given array is [2, 3, 4, 7, 11]. Now, if no numbers were missing the given array would look like 
    [1, 2, 3, 4, 5]. 
    
    Comparing these 2 arrays, we can conclude the following :-

        Up to index 0 :- Only 1 number i.e. 1 is missing in the given array.
        Up to index 1 :- Only 1 number i.e. 1 is missing in the given array.
        Up to index 2 :- Only 1 number i.e. 1 is missing in the given array.
        Up to index 3 :- 3 numbers i.e. 1, 5, and 6 are missing.
        Up to index 4 :- 6 numbers i.e. 1, 5, 6, 8, 9, and 10 are missing.

    For a given value of k as 5, we can determine that the answer falls within the range of 7 to 11. 
    Since there are only 3 missing numbers up to index 3, the 5th missing number cannot be before 
    arr[3], which is 7. Therefore, it must be located somewhere to the right of 7. 
    
    Our actual answer i.e. 9 also supports this theory. So, by following this process we can find the closest 
    neighbors (i.e. Present in the array) for the kth missing number. 
    
    In our example, the closest neighbors of the 5th missing number are 7 and 11.
*/

/*
    Dry Run :-
    <--------->

    - If the number of missing elements at arr[mid] is less than k, it means that the k-th missing number is after mid. 
      We move the start pointer to mid + 1.

    - If the number of missing elements at arr[mid] is greater than or equal to k, it means the k-th missing number is
      before mid, so we adjust the end pointer to mid - 1.

                  0  1  2   3
    Input: arr = [4, 7, 9, 10],   k = 4

        start = 0, end = 3
    
    First Iteration :- Calculate mid = (0 + 3)/2 = 1

        - Calculate the number of missing elements at arr[1] = 7

        - missing = arr[1] − (1 + 1) = 7 − 2 = 5
        
        There are 5 missing elements by the time we reach arr[1].
        
        Since 5 (missing) is greater than 4 (k), we move end to mid - 1

        end = 1 − 1 = 0
    
    Second Iteration :- Calculate mid = 0 + (0 - 0)/2 = 0

        - Calculate the number of missing elements at arr[0] = 4:

        - missing = arr[0] − (0 + 1) = 4 − 1 = 3
        
        There are 3 missing elements by the time we reach arr[0].

        Since 3 (missing) is less than 4 (k), we move start to mid + 1

        start = 0 + 1 = 1

    At this point, start = 1 and end = 0, so the loop terminates.

    Final Calculation :- The k-th missing number is calculated as k-th missing = k + end + 1 = 4 + 0 + 1 = 5
    
    Thus, the 4th missing number is 5.
*/

/*
    We need to find the 4th missing number in [4, 7, 9, 10].

    Step 1: Compute Initial Values

        - Start (start) = 0
        - End (end) = 3 (length - 1)
        - Array indices: [4, 7, 9, 10]
        - Missing numbers formula: arr[mid] - (mid + 1)


    Step 2: Binary Search Iterations
        
        | Iteration |  start |  end |  mid | arr[mid] | missing = arr[mid] - (mid+1) | missing < k? | Update start or end |
        |-----------|--------|------|------|----------|------------------------- ----|--------------|---------------------|
        | 1         | 0      | 3    | 1    |  7       |      7 - (1+1) = 5           | No (5 ≥ 4)   | end = mid - 1 = 0   |
        | 2         | 0      | 0    | 0    |  4       |      4 - (0+1) = 3           | Yes (3 < 4)  | start = mid + 1 = 1 |

        After the loop, end = 0, so we compute:
        
        return k + end + 1 = 4 + 0 + 1 = 5
        

    Final Output - The missing number is: 5
    

    Explanation - The missing numbers before the given array [4, 7, 9, 10] are: 1, 2, 3, 5, 6, 8
    
    The 4th missing number is 5, which matches our answer.

    Final Answer: 5
*/

const findKthPositive = (arr, k) => {
    let start = 0;
    let end = arr.length - 1;
    
    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        
        let missing = arr[mid] - (mid + 1);
        
        if (missing < k) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return k + end + 1;
};

let ans = findKthPositive([4, 7, 9, 10], 4);
console.log("The missing number is:", ans);

