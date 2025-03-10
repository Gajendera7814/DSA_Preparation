/*
    Merge Strings Alternately   Leetcode Problem
    <----------------------->   <--------------->

    Topic :- Two Pointers and String
    ********************************

    You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. 
    If a string is longer than the other, append the additional letters onto the end of the merged string.

    - Return the merged string.

    Input: word1 = "abc",   word2 = "pqr",   Output: "apbqcr"

        word1:  a   b   c
        word2:    p   q   r
        merged: a p b q c r

        Explanation: The merged string will be merged as so.

    Input: word1 = "ab",    word2 = "pqrs",    Output: "apbqrs"
    
        word1:  a   b 
        word2:    p   q   r   s
        
        merged: a p b q   r   s

        Explanation: Notice that as word2 is longer, "rs" is appended to the end.
*/

/*<---------------------------------------------- Brute Force Approach --------------------------------------------->*/

const mergeAlternately = (word1, word2) => {
    let result = '';
    const maxLength = Math.max(word1.length, word2.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < word1.length) result += word1[i];
        if (i < word2.length) result += word2[i];
    }

    return result;
};
console.log(mergeAlternately( "abc", "pqr")); /* Output: "apbqcr" */

/*
    Time Complexity: O(n + m), We iterate through the characters of both strings once.
    Space Complexity: O(n + m), as we store the result string.
*/




/*<------------------------------------------------ Using Two Pointers -------------------------------------------->*/

const MergeAlternately = (word1, word2) => {
    let result = '';
    let i = 0;
    let j = 0;

    while (i < word1.length || j < word2.length) {
        if (i < word1.length) result += word1[i++];
        if (j < word2.length) result += word2[j++];
    }
    return result;
};
console.log(MergeAlternately("ab", "pqrs")); /* Output: "apbqrs" */

/*
    Time Complexity: O(n + m), We iterate through the characters of both strings once.
    Space Complexity: O(n + m), as we store the result string.
*/
