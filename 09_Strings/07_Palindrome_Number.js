/*
    Palindrome Number      Leetcode Problem
    <---------------->     <--------------->

    Given an integer x, return true if x is a palindrome, and false otherwise.


    Input: x = 121,    Output: true
    Explanation: 121 reads as 121 from left to right and from right to left.


    Input: x = -121,    Output: false
    Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.


    Input: x = 10,     Output: false
    Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
*/


/*<-------------------------------------------- Convert to String -------------------------------------------------->*/

const isPalindrome = (x) => {
    if (x < 0) return false;

    const str = x.toString();
    const reversedStr = str.split('').reverse().join('');

    return str === reversedStr;
};
console.log(isPalindrome(121)); // Output: true

/*
    Time Complexity: O(n), Where n is the length of the string (number of digits).
    Space Complexity: O(n), Space used for the string and its reverse.
*/




/*<-------------------------------------- Two-Pointer Method on String --------------------------------------------->*/

const isPalindromeUsingTwoPointer = (x) => {
    if (x < 0) return false;

    const str = x.toString();
    let left = 0, right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }

    return true;
};
console.log(isPalindromeUsingTwoPointer(-121)); // Output: false
console.log(isPalindromeUsingTwoPointer(121)); // Output: true

/*
    Time Complexity: O(n), Where n is the number of digits.
    Space Complexity: O(n), Space used for the string representation.
*/




/*<------------------------------------------ Half-Reverse Method ------------------------------------------------->*/

const isPalindromeHalfReverse = (x) => {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let reversed = 0;

    while (x > reversed) {
        reversed = reversed * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    return x === reversed || x === Math.floor(reversed / 10);
};
console.log(isPalindromeHalfReverse(10)); // Output: false

/*
    Time Complexity: O(d), Where d is the number of digits in the number.
    Space Complexity: O(1), Constant space used for variables.
*/