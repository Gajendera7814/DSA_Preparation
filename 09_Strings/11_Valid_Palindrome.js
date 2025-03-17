/*
    Valid Palindrome    Leetcode Problem
    <--------------->   <--------------->

    Topics :- Two Pointers and String
    

    A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all 
    non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

    Given a string s, return true if it is a palindrome, or false otherwise.


    Input: s = "A man, a plan, a canal: Panama"
    Output: true

    Explanation: "amanaplanacanalpanama" is a palindrome.


    Input: s = "race a car"
    Output: false

    Explanation: "raceacar" is not a palindrome.


    Input: s = " "
    Output: true

    Explanation: s is an empty string "" after removing non-alphanumeric characters.

    Since an empty string reads the same forward and backward, it is a palindrome.
*/

/*<---------------------------------------------- Using two pointers ------------------------------------------------>*/

/*
    Algorithm Explanation -

    1. Normalize the string (stripString function)
        - Remove all non-alphanumeric characters using Regex (/[^A-Z0-9]+/gi).
        - Convert the remaining characters to uppercase.

    2. Use the Two-Pointer Technique
        - Initialize left pointer (left = 0) at the beginning.
        - Initialize right pointer (right = str.length - 1) at the end.
        - Compare characters at left and right:
            - If they match, move both pointers inward.
            - If they do not match, return false (not a palindrome).
        - Repeat until left crosses right.

    3. Return true if no mismatches are found.


    Input - "A man, a plan, a canal: Panama"


    | Left Index (left) |  Right Index (right)  | Left Char (str[left]) |  Right Char (str[right])  |  Comparison (==)  |       Action         |
    |-------------------|-----------------------|-----------------------|---------------------------|-------------------|----------------------|
    |       0           |           20          |           A           |           A               |       ✅ Yes      | Move left++, right-- |
    |       1           |           19          |           M           |           M               |       ✅ Yes      | Move left++, right-- |
    |       2           |           18          |           A           |           A               |       ✅ Yes      | Move left++, right-- |
    |       3           |           17          |           N           |           N               |       ✅ Yes      | Move left++, right-- |
    |       4           |           16          |           A           |           A               |       ✅ Yes      | Move left++, right-- |
    |       5           |           15          |           P           |           P               |       ✅ Yes      | Move left++, right-- |
    |       6           |           14          |           L           |           L               |       ✅ Yes      | Move left++, right-- |
    |       7           |           13          |           A           |           A               |       ✅ Yes      | Move left++, right-- |
    |       8           |           12          |           N           |           N               |       ✅ Yes      | Move left++, right-- |
    |       9           |           11          |           A           |           A               |       ✅ Yes      | Move left++, right-- |
    |       10          |           10          |           C           |           C               |       ✅ Yes      | left meets right, exit loop |

    Final Output: ✅ true (String is a palindrome)
*/

const isPalindrome = (s) => {
    const stripString = (string) => {
        return string.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
    };
    
    let str = stripString(s);
    
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        let leftChar = str[left];
        let rightChar = str[right];
        
        /* If the characters are the same, move the pointers. Otherwise, return false (the string is not a palindrome).*/
        if (leftChar === rightChar) {
            left++;
            right--;
        } else {
            return false;
        }
    }

    return true;
};
console.log(isPalindrome(" ")); // Output: true
console.log(isPalindrome("race a car")); // Output: false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Output: true

/*
    Time complexity: O(n)

    - Step 1 (Normalization): O(n) (processing the string with regex)
    - Step 2 (Two Pointers): O(n/2) ≈ O(n) (checking characters)
    - Overall Complexity: O(n) (linear time)

    Space complexity: O(n)
*/