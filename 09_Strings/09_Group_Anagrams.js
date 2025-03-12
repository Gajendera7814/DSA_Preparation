/*
    Group Anagrams      Leetcode Problem
    <------------->     <--------------->

    Given an array of strings strs, group the anagrams together. You can return the answer in any order.

    Example - 1

        Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
        Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]


    Example - 2

        Input: strs = [""],  Output: [[""]]
        Input: strs = ["a"],  Output: [["a"]]
*/


/*<----------------------------------------------- Using Sorting --------------------------------------------------->*/

/*
    Given Input - words = ["eat", "tea", "tan", "ate", "nat", "bat"]

    Step 1: 
    
        - Initialize an empty Map --> map = new Map();

    Step 2: Process Each Word
    
        We iterate over  words  and store each word under its sorted form.

        |   Word  | Sorted Form |                        map  State After Insertion                             |
        |---------|-------------|-------------------------------------------------------------------------------|
        |  "eat"  |  "aet"      |  { "aet" → ["eat"] }                                                          |
        |  "tea"  |  "aet"      |  { "aet" → ["eat", "tea"] }                                                   |
        |  "tan"  |  "ant"      |  { "aet" → ["eat", "tea"], "ant" → ["tan"] }                                  |
        |  "ate"  |  "aet"      |  { "aet" → ["eat", "tea", "ate"], "ant" → ["tan"] }                           |
        |  "nat"  |  "ant"      |  { "aet" → ["eat", "tea", "ate"], "ant" → ["tan", "nat"] }                    |
        |  "bat"  |  "abt"      |  { "aet" → ["eat", "tea", "ate"], "ant" → ["tan", "nat"], "abt" → ["bat"] }   |

        Final  map  after all iterations:

        {
            "aet": ["eat", "tea", "ate"],
            "ant": ["tan", "nat"],
            "abt": ["bat"]
        }

    Step 3: Convert Map Values to an Array

        - Array.from(map.values()) → [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

        Final Output - Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
*/

const groupAnagrams = (words) => {
    const map = new Map();

    for (const word of words) {
        const sortedWord = word.split('').sort().join('');
        if (!map.has(sortedWord)) {
            map.set(sortedWord, []);
        }
        map.get(sortedWord).push(word);
    }

    return Array.from(map.values());
};
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

/*
    Time Complexity: O(n * klogk)
    Space Complexity: O(n * k)

    - Sorting each word takes O(k log k) (where k is the word length).
    - Iterating through n words takes O(n).
    - The overall complexity is O(n * k log k).

    ✅ The function correctly groups anagrams.  
    ✅ The use of a hash map Map makes it efficient.  
    ❌ Sorting each word makes it O(n * k log k) instead of O(n).
*/