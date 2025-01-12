/*
    Generate Valid Parentheses  Leetcode Problem
    <------------------------>  <-------------->

    Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

    Input: n = 3,   Output: ["((()))","(()())","(())()","()(())","()()()"]
    
    Input: n = 1,   Output: ["()"]
*/

const generateValidParenthesis = (n, openingCount, closingCount, ans = "") => {
    /* Positive Base Case */
    if (openingCount === n && closingCount === n) {
        console.log(ans);
        return;
    }

    /* Negative Base Case */
    if (openingCount > n || closingCount > openingCount) {
        return;
    }

    generateValidParenthesis(n, openingCount + 1, closingCount, ans + "(");

    generateValidParenthesis(n, openingCount, closingCount + 1, ans + ")");
};
generateValidParenthesis(3, 0, 0);

/*
    Output -

    "((()))"
    "(()())"
    "(())()"
    "()(())"
    "()()()"
*/


const generateValidParenthes = (n, openingCount, closingCount, ans = "", result = []) => {
    /* Positive Base Case */
    if (openingCount === n && closingCount === n) {
        result.push(ans);
        return result;
    }

    /* Negative Base Case */
    if (openingCount > n || closingCount > openingCount) {
        return result;
    }

    generateValidParenthes(n, openingCount + 1, closingCount, ans + "(", result);
    generateValidParenthes(n, openingCount, closingCount + 1, ans + ")", result);

    return result;
};

const output = generateValidParenthes(3, 0, 0);
console.log("Output:", output); /* Output :- Output: ["((()))","(()())","(())()","()(())","()()()"] */

/*
                    Recursive Tree Diagram
                    <--------------------->

                              ""
                            /    \
                          "("     ")"
                         /         \
                      "(("         "()"
                     /    \        /   \
                 "((("   "(()"   "()("  "())"
                  /         \
             "((()"       "(()("
               /             \
          "((())"          "(()())"

*/