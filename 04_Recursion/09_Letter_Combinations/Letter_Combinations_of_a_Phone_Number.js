/*
    Letter Combinations of a Phone Number   Leetcode Problem
    <----------------------------------->   <-------------->

    Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the 
    number could represent. Return the answer in any order.

    A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does 
    not map to any letters.


    Input: digits = "23",   Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

    Input: digits = "",     Output: []

    Input: digits = "2",    Output: ["a", "b", "c"]
*/


const getCharactersForDigit = (digit) => {
    if (digit === "2") {
        return "abc";
    } else if (digit === "3") {
        return "def";
    } else if (digit === "4") {
        return "ghi";
    } else if (digit === "5") {
        return "jkl";
    } else if (digit === "6") {
        return "mno";
    } else if (digit === "7") {
        return "pqrs";
    } else if (digit === "8") {
        return "tuv";
    } else if (digit === "9") {
        return "wxyz";
    } else {
        return "";
    }
};

const letterCombinations = (digits, ans = "", results = []) => {
    /* Base Case: If no more digits remain, add the combination to results */
    if (digits.length === 0) {
        results.push(ans);
        return results;
    }

    /* Extract the first digit and the remaining digits */
    const firstDigit = digits.charAt(0);
    const restOfDigits = digits.substring(1);

    /* Get characters corresponding to the current digit */
    const charactersForDigit = getCharactersForDigit(firstDigit);

    /* Recursively build combinations by iterating over possible characters */
    for (let i = 0; i < charactersForDigit.length; i++) {
        letterCombinations(restOfDigits, ans + charactersForDigit.charAt(i), results);
    }

    return results;
};
const output = letterCombinations("23");
console.log("Output:", output); /* Output: Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] */
