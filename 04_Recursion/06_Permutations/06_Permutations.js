/*
    Permutations
    <----------->

    Problem Statement: Generate Permutations of a String

    Given a string S, generate all possible permutations of its characters. A permutation of a string is an arrangement of 
    its characters in all possible orders. Each character must appear exactly once in every permutation.

    Input: "abc"  
    
    Output: Print all possible permutations of the string S.

    "abc"
    "acb"
    "bac"
    "bca"
    "cab"
    "cba"


    Example 2:

    Input: "xy" 
    
    Output:  
    xy
    yx
*/

const generatePermutations = (inputString, currentPermutation = "") => {
    if (inputString.length === 0) {
        console.log(currentPermutation); /* Base case: Print the permutation */
        return;
    }

    for (let index = 0; index < inputString.length; index++) {
        const remainingString = inputString.substring(0, index) + inputString.substring(index + 1); /* Remove the current character */
        const nextPermutation = currentPermutation + inputString[index]; /* Add the current character to the result */
        generatePermutations(remainingString, nextPermutation); /* Recursive call with the updated strings */
    }
};

generatePermutations("abc");

/*
    Output: "abc", "acb", "bac", "bca", "cab", "cba"
*/

/*
    Recursive Tree
    <------------->

    generatePermutations("abc", "")
    ├── generatePermutations("bc", "a")
    │   ├── generatePermutations("c", "ab") --> "abc"
    │   └── generatePermutations("b", "ac") --> "acb"
    ├── generatePermutations("ac", "b")
    │   ├── generatePermutations("c", "ba") --> "bac"
    │   └── generatePermutations("a", "bc") --> "bca"
    └── generatePermutations("ab", "c")
        ├── generatePermutations("b", "ca") --> "cab"
        └── generatePermutations("a", "cb") --> "cba"
*/

/*
    Total Complexity: Since there are n! recursive calls, each taking O(n) time, 
    
    the overall Time complexity is: O(n⋅n!)

    Space Complexity: The recursion stack dominates the space usage, so 
    
    the overall space complexity is: O(n)
*/


/*
    Step 1: First Level of Recursion
        inputString = "abc", currentPermutation = ""
        The loop iterates over the indices 0, 1, 2.

        First Iteration (index = 0):
            - remainingString = "bc" (removing 'a').
            - nextPermutation = "a" (adding 'a').
            - Recursive call: generatePermutations("bc", "a");
        
        Second Iteration (index = 1):
            - remainingString = "ac" (removing 'b').
            - nextPermutation = "b" (adding 'b').
            - Recursive call: generatePermutations("ac", "b");
        
        Third Iteration (index = 2):
            - remainingString = "ab" (removing 'c').
            - nextPermutation = "c" (adding 'c').
            - Recursive call: generatePermutations("ab", "c");

    Step 2: Second Level of Recursion
        For Call generatePermutations("bc", "a"):
        
        inputString = "bc", currentPermutation = "a"
        The loop iterates over indices 0, 1.

        First Iteration (index = 0):
            - remainingString = "c" (removing 'b').
            - nextPermutation = "ab" (adding 'b').
            - Recursive call: generatePermutations("c", "ab");

        Second Iteration (index = 1):
            - remainingString = "b" (removing 'c').
            - nextPermutation = "ac" (adding 'c').
            - Recursive call: generatePermutations("b", "ac");

    For Call generatePermutations("ac", "b"):
        - Similar to above, this will generate permutations by fixing 'b'.

    For Call generatePermutations("ab", "c"):
        - Similar to above, this will generate permutations by fixing 'c'.


    Step 3: Third Level of Recursion
        For Call generatePermutations("c", "ab"):
            - inputString = "c", currentPermutation = "ab"
            - Base case is reached for index = 0:
            - remainingString = "" (removing 'c').
            - nextPermutation = "abc".
            - Print "abc".

    For Call generatePermutations("b", "ac"):
    - Similar process as above. Output: "acb".

    Step 4: Print Output at Base Case

    The base case prints all the permutations:

        abc
        acb
        bac
        bca
        cab
        cba
*/