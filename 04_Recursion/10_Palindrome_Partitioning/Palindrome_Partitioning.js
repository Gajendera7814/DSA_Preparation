/*
    Palindrome Partitioning    Leetcode Problem
    <---------------------->   <--------------->

    Given a string s, partition s such that every substring of the partition is a palindrome. 
    
    Return all possible palindrome partitioning of s.

    Input :- "aab",  Output: [["aa", "b"], ["a", "a", "b"]]

    Input :- "nitin",  Output: [["nitin"], ["n", "i", "t", "i", "n"], ["n", "iti", "n"]]

    Input :- s = "a",  Output: [["a"]]
*/

const palindromePartitioning = (str, ans = "") => {
    if (str.length === 0) {
        console.log(ans.trim().split(" "));
        return;
    };

    for (let i = 1; i <= str.length; i++) {
        let remainingString = str.substring(i);
        let currentSubstring = str.substring(0, i);

        if (currentSubstring === currentSubstring.split("").reverse().join("")) {
            palindromePartitioning(remainingString, ans + currentSubstring + " ");
        }
    };
};
palindromePartitioning("nitin");

/*
    Output -

    [ 'n', 'i', 't', 'i', 'n' ], [ 'n', 'iti', 'n' ], [ 'nitin' ]
*/


/*
    Tree Representation
    <----------------->

                          "nitin", ""
                        /            \
                 "itin", "n "         "", "nitin "
              /        \
        "tin", "n i "  "n", "n iti "
         /       \               
  "in", "n i t "  "", "n i t i n "
   /       \
"n", "n i t i " 
   /
"", "n i t i n "

*/