/*
    Remove K Digits
    <-------------->

    Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after 
    removing k digits from num.


    Example - 1
    
        Input: num = "1432219",  k = 3,  Output: "1219"

        Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.


    Example - 2

        Input: num = "10200",  k = 1,  Output: "200"

        Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.


    Example - 3

        Input: num = "10",  k = 2,  Output: "0"

        Explanation: Remove all the digits from the number and it is left with nothing which is 0.
*/


/*
    Dry Run
    <=====>

    Input: str = "1432219", k = 3
    
    Initial Setup: stack = [], n = str.length = 7

    Iteration - 1  (i = 0, current digit = '1')

        Condition: stack.length > 0 is false (stack is empty), so we skip the while loop.
        Push '1' onto the stack: stack = ['1'].

    Iteration - 2  (i = 1, current digit = '4')

        Condition: stack.length > 0 is true, but top(stack) = '1' and '1' < '4', so the while loop is skipped.
        Push '4' onto the stack: stack = ['1', '4'].

    Iteration - 3  (i = 2, current digit = '3')

        Condition: stack.length > 0 is true, and top(stack) = '4' and '4' > '3'.
        We pop '4' from the stack (stack = ['1']) and decrement k = 2.

        Re-evaluate: stack.length > 0, but top(stack) = '1' and '1' < '3', so the while loop is skipped.
        Push '3' onto the stack: stack = ['1', '3'].

    Iteration - 4  (i = 3, current digit = '2')

        Condition: stack.length > 0 is true, and top(stack) = '3' and '3' > '2'.
        We pop '3' from the stack (stack = ['1']) and decrement k = 1.

        Re-evaluate: stack.length > 0, but top(stack) = '1' and '1' < '2', so the while loop is skipped.
        Push '2' onto the stack: stack = ['1', '2'].

    Iteration - 5  (i = 4, current digit = '2')
    
        Condition: stack.length > 0 is true, but top(stack) = '2' and '2' == '2', so the while loop is skipped.
        Push '2' onto the stack: stack = ['1', '2', '2'].

    Iteration - 6  (i = 5, current digit = '1')

        Condition: stack.length > 0 is true, and top(stack) = '2' and '2' > '1'.
        We pop '2' from the stack (stack = ['1', '2']) and decrement k = 0.
        Re-evaluate: stack.length > 0, but k = 0 now, so the while loop is skipped.
        Push '1' onto the stack: stack = ['1', '2', '1'].

    Iteration - 7  (i = 6, current digit = '9')

        Condition: stack.length > 0, but k = 0, so the while loop is skipped.
        Push '9' onto the stack: stack = ['1', '2', '1', '9'].


    Post Loop (k > 0) :- k = 0, so we don't need to pop any more elements.

    Stack After Loop :- stack = ['1', '2', '1', '9']

    Building the Result :-
        Pop each element from the stack and build the result:
        Pop '9': result = '9', stack becomes ['1', '2', '1'].
        Pop '1': result = '19', stack becomes ['1', '2'].
        Pop '2': result = '219', stack becomes ['1'].
        Pop '1': result = '1219', stack becomes [].

    Remove Leading Zeros: The result = '1219' has no leading zeros, so no zeros are removed.

    Final Output: The final result is "1219".

*/


const RemoveKDigits = (str, k) => {
    let stack = [];
    let n = str.length;

    const top = (stack) => {
        return stack[stack.length - 1];
    }

    for (let i = 0; i < n; i++) {
        /* While there are elements in the stack, k digits can still be removed, and the top element of the stack is 
        greater than the current digit. */
        while (stack.length > 0 && k > 0 && (top(stack) - '0') > (str[i] - '0')) {
            stack.pop();  /* Remove the top element from the stack. */
            k--;  /* Decrease the number of digits we need to remove. */
        }

        /* Push the current digit onto the stack. */
        stack.push(str[i]);
    }

    /* If we still need to remove more digits (k > 0), remove them from the end of the stack. */
    while (k > 0) {
        stack.pop();  /* Remove the top element from the stack. */
        k--;  /* Decrease the number of digits left to remove. */
    }

    /* If the stack is empty, return "0". */
    if (stack.length === 0) return "0";

    let result = "";

    /* Pop each element from the stack and construct the final result. */
    while (stack.length > 0) {
        result = stack.pop() + result;
    }

    /* Remove leading zeros from the result. */
    while (result.length > 1 && result[0] === '0') {
        result = result.slice(1);  /* Remove the first character if it's a zero. */
    }

    return result;
}
console.log(RemoveKDigits("1432219", 3));  // Output: "1219"


/*
    Time complexity = O(2n) + O(k) = O(n) because each digit is processed at most twice.
    Space complexity = O(n) for the stack and the result string.
*/




