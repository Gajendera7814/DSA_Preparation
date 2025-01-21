/*
    Generate All Subsets of a String
    <------------------------------->

    Given a string str, your task is to generate all possible subsets of the string. A subset is any combination of 
    characters from the string, and the order of characters does not matter in a subset. You need to return a list 
    containing all subsets of the input string, including the empty subset and the subset that includes all the characters.

    Input:- "abc",  Output:- [ " ", "a", "b", "c", "ab", "bc", "ac", "abc"]

    No of output = 2 ^ n = 2 ^ 3 = 8,  n is the length of the string.
*/

/*
    How to Approach
    <-------------->

            a     b      c
    -----------------------
     " "    0     0      0    (0 --> Not Considerd)
      a     1     0      0
      b     0     1      0
      c     0     0      1
     ab     1     1      0
     bc     0     1      1
     ac     1     0      1
     abc    1     1      1
*/


const generateSubset = (str, ans = "", result = []) => {
    /* Base Case */
    if (str.length === 0) {
        result.push(ans);
        return result;
    }

    /* Recursive Cases */
    generateSubset(str.slice(1), ans + str[0], result); /* Include the first character */
    generateSubset(str.slice(1), ans, result);          /* Exclude the first character */

    return result; /* Return the result array */
};

/* Call the function and print the result */
const subsets = generateSubset("abc");
console.log(subsets);

/* Output:- [ 'abc', 'ab', 'ac', 'a', 'bc', 'b', 'c', '' ] */