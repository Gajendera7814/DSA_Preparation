/*
    Search in Rotated Sorted Array II      Leetcode Problem
    <-------------------------------->     <--------------->

    Problem Statement: Given an integer array arr of size N, sorted in ascending order (may contain duplicate values) and 
    a target value k. Now the array is rotated at some pivot point unknown to you. Return True if k is present and otherwise, 
    return False. 

    Given the array nums after the rotation and an integer target, return true if target is in nums, or false 
    if it is not in nums.

    Input: nums = [2, 5, 6, 0, 0, 1, 2], target = 0, Output: true

    Input: nums = [2, 5, 6, 0, 0, 1, 2], target = 3, Output: false
*/

/*
    -   It calculates the middle index, checks for duplicate values to reduce the search space, and determines which 
        part of the array is sorted.
    
    -   Based on whether the target lies in the sorted half, it adjusts the search range.
*/

/*

    Approach Used :-
        
    1. Binary Search with Modification:

        - We maintain start, end, and mid pointers.
        - If arr[mid] == k, return true.
        - Handling duplicates:  
            - If arr[start] == arr[mid] == arr[end], we cannot determine which half is sorted.  
            - In this case, we increment start and decrement end to eliminate duplicates.
        - Checking sorted half:
            - If the left half (arr[start] to arr[mid]) is sorted:
            - If k lies within this range, search in the left half (end = mid - 1).
            - Else, search in the right half (start = mid + 1).
            - Else, the right half is sorted:
            - If k lies in this range, search in the right half (start = mid + 1).
            - Otherwise, search in the left half (end = mid - 1).


    For the input arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3:

    | Iteration |  start |  end |  mid |  arr[mid] |   Condition (arr[mid] == k)  | Handling Duplicates (arr[start] == arr[mid] == arr[end]) | Left Sorted (arr[start] <= arr[mid]) |   Action    |
    |-----------|--------|------|------|-----------|------------------------------|----------------------------------------------------------|--------------------------------------|-------------|
    | 1         | 0      | 9    | 4    | 3         | Yes (found target)           |                          -                               |                     -                | Return true |


    Final Output: Since arr[mid] == 3, we return true, meaning the element 3 exists in the array.
*/

const searchInARotatedSortedArrayII = (arr, k) => {
    let n = arr.length;
    let start = 0;
    let end = arr.length - 1;
    
    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (arr[mid] === k) return true;

        if (arr[start] === arr[mid] && arr[mid] === arr[end]) {
            start = start + 1;
            end = end - 1;
            continue;
        }

        if (arr[start] <= arr[mid]) {
            if (arr[start] <= k && k <= arr[mid]) {
                end = mid - 1;
            }
            else {
                start = mid + 1;
            }
        }
        else {
            if (arr[mid] <= k && k <= arr[end]) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
    }
    return false;
};
console.log(searchInARotatedSortedArrayII([7, 8, 1, 2, 3, 3, 3, 4, 5, 6], 3)); // Output: true
