/*
    Intersection of Two Arrays II     Leetcode Problem
    <---------------------------->    <--------------->

    Given two integer arrays nums1 and nums2, return an array of their intersection.  Each element in the result must 
    appear as many times as it shows in both arrays and you may return the result in any order.

    Example 1:

        Input: nums1 = [1, 2, 2, 1], nums2 = [2, 2],    Output: [2]
    
    Example 2:

        Input: nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4],    Output: [4, 9]
        
        Explanation: [9, 4] is also accepted.
*/

/*<----------------------------------------------- Using Hash Table ----------------------------------------------->*/

const intersectionUsingHash = (nums1, nums2) =>{
    const set1 = new Set(nums1);
    const result = new Set();

    for (const num of nums2) {
        if (set1.has(num)) {
            result.add(num);
        }
    }

    return [...result];
};
console.log(intersectionUsingHash([1, 2, 2, 1], [2, 2])); /* Output: [2] */

/*
    Time Complexity: O(n + m), where n and 𝑚 are the lengths of nums1 and nums2.
    Space Complexity: O(n), for storing elements of the smaller array.
*/




/*<--------------------------------------------- Using Two Pointers ----------------------------------------------->*/

const intersectionUsingPointer = (nums1, nums2) => {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    const result = new Set();
    let i = 0, j = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.add(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }

    return [...result];
};
console.log(intersectionUsingPointer([4, 9, 5], [9, 4, 9, 8, 4])); /* Output: [ 4, 9 ] */

/*
    Time Complexity: O(nlogn + mlogm)
    Space Complexity: O(1)
*/




/*<-------------------------------------------- Using Array Filter ------------------------------------------------>*/

const intersection = (nums1, nums2) => {
    return [...new Set(nums1.filter(num => nums2.includes(num)))];
};
console.log(intersection([4, 9, 6, 5], [9, 4, 9, 8, 6, 4]));  /* Output: [ 4, 9, 6 ] */


/*
    Time Complexity: O(n × m)
    Space Complexity: O(n)
*/