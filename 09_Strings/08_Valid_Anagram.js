/*
    Valid Anagram     Leetcode Problem
    <------------>    <--------------->
    
    Given two strings s and t, return true if t is an anagram of s, and false otherwise.

    Input: s = "anagram", t = "nagaram",    Output: true


    Input: s = "rat", t = "car",    Output: false
*/

/*<----------------------------------------- Using Hash Table ----------------------------------------------------->*/

/*

    Given Input: s = "anagram",  t = "nagaram"

    Step 1: 
        
        - Check Length --> s.length = 7,  t.length = 7, Both are equal --→ Continue


    Step 2: Build Character Frequency Table for s

        | Character | Count |
        |-----------|-------|
        |  'a'      | 3     |
        |  'n'      | 1     |
        |  'g'      | 1     |
        |  'r'      | 1     |
        |  'm'      | 1     |

        Final  object: { a: 3, n: 1, g: 1, r: 1, m: 1 }


    Step 3: Verify Characters in t
        
        Loop through t = "nagaram" and decrease counts.

        |   Character t[i])  |  charCount[char] Before |   charCount[char] After  | Valid? |
        |--------------------|-------------------------|--------------------------|--------|
        |   'n'              | 1                       |    0                     | ✅ Yes |
        |   'a'              | 3                       |    2                     | ✅ Yes |
        |   'g'              | 1                       |    0                     | ✅ Yes |
        |   'a'              | 2                       |    1                     | ✅ Yes |
        |   'r'              | 1                       |    0                     | ✅ Yes |
        |   'a'              | 1                       |    0                     | ✅ Yes |
        |   'm'              | 1                       |    0                     | ✅ Yes |

        After processing t, charCount becomes: { a: 0, n: 0, g: 0, r: 0, m: 0 }

        Since all values are 0, both strings have the same characters in the same frequency.

    Step 4: Return Result

        - Since charCount is balanced (all values are 0), return true.
*/

const isAnagram = (s, t) => {
    if (s.length !== t.length) return false;

    const charCount = {};

    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let char of t) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }

    return true;
};
console.log(isAnagram("anagram", "nagaram")); // Output: true
console.log(isAnagram("rat", "car")); // Output: false

/*
    Time Complexity: O(n)
    Space Complexity: O(1)

    ✅ The function correctly determines that "anagram" and "nagaram" are anagrams.  
    ✅ It runs efficiently in O(n) time using a hash table.  
    ❌ If sorting was used instead, the complexity would be O(n log n).  
*/



/*<-------------------------------------------- Using Sorting ----------------------------------------------------->*/

const isAnagramUsingSorting = (s, t) => {
    if (s.length !== t.length) return false;

    return s.split('').sort().join('') === t.split('').sort().join('');
};
console.log(isAnagramUsingSorting("anagram", "nagaram")); // Output: true
console.log(isAnagramUsingSorting("rat", "car")); // Output: false

/*
    Time Complexity: O(nlogn) (due to sorting)
    Space Complexity: O(1)
*/