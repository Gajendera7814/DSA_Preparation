/*
    Longest Palindromic Substring       Leetcode Problem
    <---------------------------->      <--------------->

    Asked in interview
    -------------------

    Given a string s, return the longest palindromic substring in s.

    Input: s = "babad",   Output: "bab"
    
    Explanation: "aba" is also a valid answer.

    Input: s = "cbbd",   Output: "bb"
*/


/*<------------------------------------------- String (Brute Force) ------------------------------------------------->*/

/*
    Algorithm Explanation -

    1. Iterate through all substrings  
        - Use two nested loops to generate all substrings of s.  
        - The outer loop (i) selects the starting index of the substring.  
        - The inner loop (j) selects the ending index of the substring.  
        - The substring is extracted using s.substring(i, j + 1).  

    2. Check if the substring is a palindrome  
        - Call isPalindrome(substring) to check whether the substring is a palindrome.  
        - The function isPalindrome uses a two-pointer approach:
            - Compare characters from both ends (left and right).
            - If all character pairs match, return true; otherwise, return false.

    3. Update the longest palindrome found  
        - If the substring is a palindrome and its length is greater than the previously found longest palindrome, update the longest variable.

    4. Return the longest palindrome found.


    Input - "babad"


    | i | j | Substring s[i: j + 1] |  Palindrome |         Longest             |
    |---|---|-----------------------|-------------|-----------------------------|
    | 0 | 0 |           "b"         |   ✅ Yes    |             "b"             |
    | 0 | 1 |           "ba"        |   ❌ No     |             "b"             |
    | 0 | 2 |           "bab"       |   ✅ Yes    |             "bab"           |
    | 0 | 3 |           "baba"      |   ❌ No     |             "bab"           |
    | 0 | 4 |           "babad"     |   ❌ No     |             "bab"           |
    | 1 | 1 |           "a"         |   ✅ Yes    |             "bab"           |
    | 1 | 2 |           "ab"        |   ❌ No     |             "bab"           |
    | 1 | 3 |           "aba"       |   ✅ Yes    | "bab" → "aba" (same length) |
    | 1 | 4 |           "abad"      |   ❌ No     |             "bab"           |
    | 2 | 2 |           "b"         |   ✅ Yes    |             "bab"           |
    | 2 | 3 |           "ba"        |   ❌ No     |             "bab"           |
    | 2 | 4 |           "bad"       |   ❌ No     |             "bab"           |
    | 3 | 3 |           "a"         |   ✅ Yes    |             "bab"           |
    | 3 | 4 |           "ad"        |   ❌ No     |             "bab"           |
    | 4 | 4 |           "d"         |   ✅ Yes    |             "bab"           |

    Final Output - Both "bab" and "aba" are valid longest palindromes, but the function returns the first one found, "bab".
*/

const longestPalindromeBruteForce = (s) => {
    let longest = "";

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const substring = s.substring(i, j + 1);
            if (isPalindrome(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }

    return longest;
};

const isPalindrome = (str) => {
    let left = 0, right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
};

console.log(longestPalindromeBruteForce("babad")); // Output: "bab"

/*
    Time Complexity: O(n3) (Generate all substrings O(n2), check if palindrome O(n))

    - The outer loop runs O(n) times.
    - The inner loop runs O(n) times.
    - Checking if a substring is a palindrome takes O(n) time.
    - Total time complexity: O(n³) (cubic complexity).

    Space Complexity: O(1) (No extra space)
*/





/*<------------------------------------- Two Pointers (Expand Around Center) ---------------------------------------->*/

/*
    Algorithm Explanation -

    1. Iterate through each character (i) as a possible center of a palindrome.
    2. Expand around the center in two ways:
        - Odd-length palindrome (expandFromCenter(s, i, i))
        - Even-length palindrome (expandFromCenter(s, i, i + 1))
    3. Find the longest palindrome:
        - Keep track of the longest found palindrome by comparing its length with end - start.
        - If a longer palindrome is found, update start and end.
    4. Return the longest palindromic substring found.


    Input - cbbd

    | i |  Odd Length Expansion (len1)  | Even Length Expansion (len2)  |  Longest Length (len) | Start (start) | End (end) | Substring (s[start: end + 1]) |
    |---|-------------------------------|-------------------------------|-----------------------|---------------|-----------|-------------------------------|
    | 0 |               1 (c)           |               0               |           1           |       0       |   0       |           "c"                 |
    | 1 |               1 (b)           |               2 ("bb")        |           2           |       1       |   2       |           "bb"                |
    | 2 |               1 (b)           |               0               |           1           |       1       |   2       |           "bb"                |
    | 3 |               1 (d)           |               0               |           1           |       1       |   2       |           "bb"                |

    Final Output - "cbbd" is "bb".

*/

const longestPalindromeExpandAroundCenter = (s) => {
    if (s.length < 1) return "";

    let start = 0, end = 0;

    for (let i = 0; i < s.length; i++) {
        const len1 = expandFromCenter(s, i, i);      // Odd length palindromes
        const len2 = expandFromCenter(s, i, i + 1);  // Even length palindromes
        const len = Math.max(len1, len2);

        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    return s.substring(start, end + 1);
};

const expandFromCenter = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
};

console.log(longestPalindromeExpandAroundCenter("cbbd")); // Output: "bb"

/*
    Time Complexity: O(n2) (Expanding around each center for all characters)

    - Each center expansion takes O(n) in the worst case.
    - There are O(n) centers to check.
    - Total time complexity: O(n²) (quadratic complexity).

    Space Complexity: O(1) (No extra space used apart from variables)
*/