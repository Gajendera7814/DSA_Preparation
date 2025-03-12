/*
    First Unique Character in a String   Leetcode Problem
    <-------------------------------->   <--------------->

    Asked in interview
    ------------------

    Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

    Example 1:

        Input: s = "leetcode"
        Output: 0

        Explanation: The character 'l' at index 0 is the first character that does not occur at any other index.

    Example 2:

        Input: s = "loveleetcode"
        Output: 2

    Example 3:

        Input: s = "aabb"
        Output: -1
*/

/*<------------------------------------------- Using String Manipulation ---------------------------------------------*/

/*

    Logic :-

        - The function iterates over each character in the string.
        - It checks whether the first occurrence indexOf and last occurrence lastIndexOf of that character are the same.
        - If they are equal, that means the character appears only once in the string.
        - It returns the index of the first unique character.
        - If no unique character is found, it returns -1.

    Given Input: "loveleetcode"


    |   Index (i) |  Character (s[i])  |   s.indexOf(s[i])   |  s.lastIndexOf(s[i]) |               Unique              |
    |-------------|--------------------|---------------------|----------------------|-----------------------------------|
    | 0           |   'l'              | 0                   | 0                    |               ✅ Yes              |
    | 1           |   'o'              | 1                   | 6                    |               ❌ No               |
    | 2           |   'v'              | 2                   | 2                    |               ✅ Yes              |
    | 3           |   'e'              | 3                   | 11                   |               ❌ No               |
    | 4           |   'l'              | 0                   | 0                    |   ✅ Yes (Already found at index 0) |
    | 5           |   'e'              | 3                   | 11                   |               ❌ No               |      
    | 6           |   'e'              | 3                   | 11                   |               ❌ No               |
    | 7           |   't'              | 7                   | 7                    |               ✅ Yes              |
    | 8           |   'c'              | 8                   | 8                    |               ✅ Yes              |
    | 9           |   'o'              | 1                   | 6                    |               ❌ No               |
    | 10          |   'd'              | 10                  | 10                   |               ✅ Yes              |
    | 11          |   'e'              | 3                   | 11                   |               ❌ No               |

    Finding the First Unique Character

        - The first unique character is 'l' at index 0.
        - The function returns 0.

    Final Output: 0
*/

const firstUniqueCharString = (s) => {
    for (let i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
            return i;
        }
    }
    return -1;
};
console.log(firstUniqueCharString("loveleetcode")); // Output: 2
console.log(firstUniqueCharString("leetcode")); // Output: 0
console.log(firstUniqueCharString("aabb")); // Output: -1

/*
    Time Complexity: O(n2)
    Space Complexity: O(1)

    ✅ The function correctly finds the first unique character's index.  
    ❌ But it is less efficient O(n²) than the hash table approach O(n).
*/



/*<----------------------------------------------- Using a Hash Table -------------------------------------------------*/

/*
    | Iteration | Character |       Updated charCount Object            |
    |-----------|-----------|-------------------------------------------|
    | 1         |   'l'     |   { l: 1 }                                |
    | 2         |   'e'     |   { l: 1, e: 1 }                          |
    | 3         |   'e'     |   { l: 1, e: 2 }                          |
    | 4         |   't'     |   { l: 1, e: 2, t: 1 }                    |
    | 5         |   'c'     |   { l: 1, e: 2, t: 1, c: 1 }              |
    | 6         |   'o'     |   { l: 1, e: 2, t: 1, c: 1, o: 1 }        |
    | 7         |   'd'     |   { l: 1, e: 2, t: 1, c: 1, o: 1, d: 1 }  |
    | 8         |   'e'     |   { l: 1, e: 3, t: 1, c: 1, o: 1, d: 1 }  |

    Final: { l: 1, e: 3, t: 1, c: 1, o: 1, d: 1 }
*/

const firstUniqueCharHashTable = (s) => {
    const charCount = {};

    /* Count frequencies */
    for (const char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    /* Find the first unique character */
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }

    return -1;
};
console.log(firstUniqueCharHashTable("leetcode")); // Output: 0
console.log(firstUniqueCharHashTable("loveleetcode")); // Output: 2
console.log(firstUniqueCharHashTable("aabb")); // Output: -1

/*
    Time Complexity: O(n)
    Space Complexity: O(n)

    Time Complexity Analysis -
    Step 2 (Counting frequencies): O(n) → We loop through the string once.
    Step 3 (Finding first unique character): O(n) → We loop through the string again.

    Overall Time Complexity:O(n) + O(n) = O(n)
*/




/*<----------------------------------------- Using Counting (Two Pass) ----------------------------------------------*/

const firstUniqueCharCounting = (s) => {
    const counts = new Array(26).fill(0); /* Array to store frequencies for 'a' to 'z' */
    const aCharCode = 'a'.charCodeAt(0);

    /* First pass: count frequencies */
    for (const char of s) {
        counts[char.charCodeAt(0) - aCharCode]++;
    }

    /* Second pass: find the first unique character */
    for (let i = 0; i < s.length; i++) {
        if (counts[s[i].charCodeAt(0) - aCharCode] === 1) {
            return i;
        }
    }

    return -1;
};
console.log(firstUniqueCharCounting("leetcode")); // Output: 0
console.log(firstUniqueCharCounting("loveleetcode")); // Output: 2
console.log(firstUniqueCharCounting("aabb")); // Output: -1

/*
    Time Complexity: O(n)
    Space Complexity: O(1)
*/