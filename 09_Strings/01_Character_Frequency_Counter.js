/*
    Character Frequency Counter
    <-------------------------->

    Given a string, write a function that counts the frequency of each character in the string and returns a dictionary 
    where keys are characters and values are their frequencies.

    Input: "hello",   Output: { "h": 1, "e": 1, "l": 2, "o": 1 }

    Input: "AaBbCc",    Output: { "A": 1, "a": 1, "B": 1, "b": 1, "C": 1, "c": 1 }

*/

/*<---------------------------------------------- Using a Hash Map ------------------------------------------------->*/

/*
    Approach -

    1. Initialize an empty object frequency to store character counts.
    2. Iterate through each character in the string str:
        - If the character is already present in frequency, increment its count.
        - Otherwise, initialize it with a count of 1.
    3. Return the frequency object containing the character counts.

    
    Dry Run: Input - "Gajendera"

    | Step | Character char |           frequency Before Update             |           frequency After Update              |
    |------|----------------|-----------------------------------------------|-----------------------------------------------|
    | 1    | 'G'            | {}                                            | { G: 1 }                                      |
    | 2    | 'a'            | { G: 1 }                                      | { G: 1, a: 1 }                                |
    | 3    | 'j'            | { G: 1, a: 1 }                                | { G: 1, a: 1, j: 1 }                          |
    | 4    | 'e'            | { G: 1, a: 1, j: 1 }                          | { G: 1, a: 1, j: 1, e: 1 }                    |
    | 5    | 'n'            | { G: 1, a: 1, j: 1, e: 1 }                    | { G: 1, a: 1, j: 1, e: 1, n: 1 }              |
    | 6    | 'd'            | { G: 1, a: 1, j: 1, e: 1, n: 1 }              | { G: 1, a: 1, j: 1, e: 1, n: 1, d: 1 }        |
    | 7    | 'e'            | { G: 1, a: 1, j: 1, e: 1, n: 1, d: 1 }        | { G: 1, a: 1, j: 1, e: 2, n: 1, d: 1 }        |      
    | 8    | 'r'            | { G: 1, a: 1, j: 1, e: 2, n: 1, d: 1 }        | { G: 1, a: 1, j: 1, e: 2, n: 1, d: 1, r: 1 }  |
    | 9    | 'a'            | { G: 1, a: 1, j: 1, e: 2, n: 1, d: 1, r: 1 }  | { G: 1, a: 2, j: 1, e: 2, n: 1, d: 1, r: 1 }  |

    Final Output: { "G": 1, "a": 2, "j": 1, "e": 2, "n": 1, "d": 1, "r": 1 }

*/

const charFrequency = (str) => {
    const frequency = {};
    
    for (let char of str) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
    
    return frequency;
};
console.log(charFrequency("Gajendera"));

/*
    Time Complexity: O(n) (since we traverse the string once)  
    Space Complexity: O(1) (in the worst case, storing at most 256 unique characters)

*/




/*<---------------------------------------------- Using forEach --------------------------------------------------->*/

/*
    Approach -

    1. Initialize an empty object freqCounter to store character frequencies.
    2. Convert the string into an array using split('').
    3. Iterate over each character using forEach():
        - If the character is already in freqCounter, increment its count.
        - Otherwise, initialize it with a count of 1.
    4. Return the freqCounter object.


    Dry Run - Input:- "hello"

    | Step | Character char | freqCounter Before Update  |  freqCounter After Update  |
    |------|----------------|----------------------------|----------------------------|
    | 1    | 'h'            | {}                         | { h: 1 }                   |
    | 2    | 'e'            | { h: 1 }                   | { h: 1, e: 1 }             |
    | 3    | 'l'            | { h: 1, e: 1 }             | { h: 1, e: 1, l: 1 }       |
    | 4    | 'l'            | { h: 1, e: 1, l: 1 }       | { h: 1, e: 1, l: 2 }       |
    | 5    | 'o'            | { h: 1, e: 1, l: 2 }       | { h: 1, e: 1, l: 2, o: 1 } |

    Final Output: { "h": 1, "e": 1, "l": 2, "o": 1 }
*/

const CharFrequency = (str) => {
    let freqCounter = {};

    str.split('').forEach(char => {
        freqCounter[char] = (freqCounter[char] || 0) + 1;
    });

    return freqCounter;
};
console.log(CharFrequency("hello")); // Output: { h: 1, e: 1, l: 2, o: 1 }

/*
    Time Complexity: O(n) (iterating over the string once)
    Space Complexity: O(1) (storing at most 256 unique characters)
*/
