/*
    Problem Statement: Generate All Permutations of a String

    Write a function that takes a string as input and returns all possible permutations of the characters in that string.

    Input: '123',  Output: [ '123', '132', '213', '231', '312', '321' ]
*/

const permutation = (str) => {
    const result = [];

    const permute = (current, remaining) => {
        if (remaining.length === 0) {
            result.push(current);
            return;
        };

        for (let i = 0; i < remaining.length; i++) {
            const newCurrent = current + remaining[i];
            const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
            permute(newCurrent, newRemaining);
        };
    };

    permute('', str);
    return result;
};
console.log(permutation("123"));
