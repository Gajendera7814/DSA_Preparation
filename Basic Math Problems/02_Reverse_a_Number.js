/*
    Reverse a Number
    <--------------->

    Example 1:
        Input: N = 123
        Output: 321
        Explanation: The reverse of 123 is 321

    Example 2:
        Input: N = 234
        Output: 432
        Explanation: The reverse of 234 is 432
*/

const reverseNumber = (n) => {
    let reverseNum = 0;

    while(n > 0){
        let lastDigit = Math.floor(n % 10);
        reverseNum = reverseNum * 10 + lastDigit;
        n = Math.floor(n / 10);
    }
    return reverseNum;
};
console.log(reverseNumber(234)); // Output: 432

/*
    Time Complexity: O(log10(n))
    Space Complexity: O(1)
*/