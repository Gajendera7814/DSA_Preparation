/*
    Find the number that appears once, and the other numbers twice.   Single Number (Leetcode Problem)
    |<------------------------------------------------------------>|  <------------------------------->

    Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

    You must implement a solution with a linear runtime complexity and use only constant extra space.

    Example 1: Input: nums = [2, 2, 1],  Output: 1

    Example 2: Input: nums = [4, 1, 2, 1, 2],  Output: 4

    Example 3: Input: nums = [1],  Output: 1

    Example 3: Input: nums = [4, 5, 1, 2, 4, 1, 2],  Output: 5
*/


/*<------------------------------------------- Using Brute Force Approach ------------------------------------------>*/

/*
    1. Iterate Over the Array (i Loop)
        - Pick each number num from the array.

    2. Count Occurrences of num (j Loop)
        - Use another loop to count how many times num appears in the array.

    3. Check for Uniqueness  
        - If num appears exactly once, return it as the answer.

    4. Return -1 if No Unique Number Found  
        - This is a fallback in case the input doesn't follow the given constraint (all except one appearing twice).

    
    Input: [4, 5, 1, 2, 4, 1, 2]);


    | i (Outer Loop)    |      num      | cnt Calculation (j Loop)   | Found Unique?    |
    |-------------------|---------------|----------------------------|------------------|
    |         0         |       4       |       Count = 2            | ❌ (Skip)        |
    |         1         |       5       |       Count = 1            | ✅ (Return 5)    |

    Final Output: 5
*/

const singleNumberUsingBrute = (arr) => {
    const n = arr.length;
    
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        let cnt = 0;
        
        for (let j = 0; j < n; j++) {
            if (arr[j] === num) {
                cnt++;
            }
        }
        
        if (cnt === 1) return num;
    }
    return -1;
};
console.log(singleNumberUsingBrute([4, 5, 1, 2, 4, 1, 2]));


/*
    Time Complexity
    <-------------->

        - Outer loop (i loop): Runs O(n) times.
        - Inner loop (j loop): Runs O(n) times for each i.
        
        Thus, the total complexity is: O(n ^ 2)
  
    Space Complexity
    <--------------->

        - Uses only a few integer variables (num, cnt).
        - No extra data structures.
        
        Space Complexity: O(1) (constant space)
*/




/*<---------------------------------------- Using HashMap (Frequency Count) ---------------------------------------->*/

/*
    How the Algorithm Works

    Step 1: Initialize a HashMap (frequency)
        - We use a Map to store the frequency of each number.

    Step 2: First Loop - Count Frequency of Each Number
        - Traverse through the array.
        - For each number:
            - If it's already in the Map, increment its count.
            - If it's not in the Map, set its count to 1.

    Step 3: Second Loop - Find the Unique Number
        - Iterate through the Map.
        - Find the number whose count is 1 and return it.

    4. Step 4: Return -1 if No Unique Number Found
        - If all numbers appear twice, return -1.


    Input: [4, 5, 1, 2, 4, 1, 2]
    <--------------------------->

    Step 1: Count Frequency

        | Element |     Count After Processing     |
        |---------|--------------------------------|
        | 4       |         2                      |
        | 5       |         1                      |
        | 1       |         2                      |
        | 2       |         2                      |

        After the first loop, the frequency Map stores: Map { 4 => 2, 5 => 1, 1 => 2, 2 => 2 }


    Step 2: Find the Unique Number
        - Iterate through the Map.
        - The first number with count 1 is 5.

    Final Output: 5
*/

const singleNumberUsingHashMap = (arr) => {
    const frequency = new Map();

    /* Count occurrences */
    for (const num of arr) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    }

    /* Step 3: Find unique number */
    for (const [key, value] of frequency) {
        if (value === 1) return key;
    }

    /* Return -1 if no unique number found */
    return -1;
};
console.log(singleNumberUsingHashMap([4, 1, 2, 1, 2])); // Output: 4
console.log(singleNumberUsingHashMap([4, 5, 1, 2, 4, 1, 2])); // Output: 5

/*
    Time Complexity: O(n), The first loop runs in O(n), and the second loop also runs in O(n) --→ Total O(n).
    Space Complexity: O(n), We use extra space to store counts in a Map, which takes O(n) space.
*/




/*<-------------------------------------------------- Using XOR --------------------------------------------------->*/

/*
    Properties of XOR (⊕)
    ------------------------

    1. A number XOR itself is 0 → a ⊕ a = 0  
        - Example: 2 ⊕ 2 = 0

    2. A number XOR 0 remains the same → a ⊕ 0 = a
        - Example: 5 ⊕ 0 = 5

    3. XOR is commutative and associative  
        - Order doesn’t matter:  
            (a ⊕ b ⊕ a) = (a ⊕ a ⊕ b) = (0 ⊕ b) = b

    4. Duplicate numbers cancel out  
        - Since every number except one appears twice, they cancel each other out, leaving only the unique number.


    Input: [2, 2, 1]);

    |    Step     |  XOR Operation  | Intermediate Result |
    |-------------|-----------------|---------------------|
    |   Start     |    xor = 0      |        0            |
    |   0 ⊕ 2    |     2           |        2            |
    |   2 ⊕ 2    |     2 ⊕ 2 = 0  |        0            |
    |   0 ⊕ 1    |     1           |        1            |

    Final Output: 1
*/

const singleNumberUsingXOR = (arr) => {
    let xor = 0;

    for (let i = 0; i < arr.length; i++) {
        xor = xor ^ arr[i];
    }

    return xor;
};
console.log(singleNumberUsingXOR([2, 2, 1])); // Output: 1

/*
    Time Complexity: O(n), The loop runs O(n) times, XOR operations are O(1) each.
    Space Complexity: O(1), Uses only a single variable (xor), requiring constant space.
*/