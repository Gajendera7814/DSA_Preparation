/*
    Koko Eating Bananas    Leetcode Problem
    <----------------->    <--------------->

    Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and 
    will come back in h hours.

    Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas 
    from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas 
    during this hour.

    Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

    Return the minimum integer k such that she can eat all the bananas within h hours.


    Input: piles = [3, 6, 7, 11], h = 8, Output: 4

    Input: piles = [30, 11, 23, 4, 20], h = 5, Output: 30

    Input: piles = [30, 11, 23, 4, 20], h = 6, Output: 23

    Find the minimum number of bananas k to eat per hour so that the koko can eat all the bananas within h hours.


    E.g - [3, 6, 7, 11] --> Take ceiling of the value

    Step - 1  if koko eat 1 banana/hour  --> Total time = (3/1) + (6/1) + (7/1) + (11/1) = 27 hours x
    Step - 2  if koko eat 2 banana/hour  --> Total time = (3/2 = 2) + (6/2 = 3) + (7/2 = 4) + (11/2 = 6) = 15 hours x
    Step - 3  if koko eat 3 banana/hour  --> Total time = (3/3 = 1) + (6/3 = 2) + (7/3 = 3) + (11/3 = 4) = 10 hours x
    Step - 4  if koko eat 4 banana/hour  --> Total time = (3/4 = 1) + (6/4 = 2) + (7/4 = 2) + (11/4 = 3) = 8 hours (ans)
    Step - 5  if koko eat 5 banana/hour  --> Total time = (3/5 = 1) + (6/5 = 2) + (7/5 = 2) + (11/5 = 3) = 8 hours
    .....

    till 11.

    But we find minimun number of bananas ans = koko eat 4 banana/hour
*/


/*<--------------------------------------------- Brute Force Approach ----------------------------------------------->*/

/*
    Algorithm :-

    - First, we will find the maximum value i.e. max(a[]) in the given array.
    - We will run a loop(say i) from 1 to max(a[]), to check all possible answers.
    - For each number i, we will calculate the hours required to consume all the bananas from the pile. 
      We will do this using the function calculateTotalHours(), discussed below.
    - The first i, for which the required hours <= h, we will return that value of i.
    
    calculateTotalHours(a[], hourly):

    - a[] -> the given array
    - Hourly -> the possible number of bananas, Koko will eat in an hour.
    - We will iterate every pile of the given array using a loop(say i).
    - For every pile i, we will calculate the hour i.e. ceil(v[i] / hourly), and add it to the total hours.
    
    Finally, we will return the total hours.
*/

const findMax = (v) => {
    let maxi = -Infinity;
    let n = v.length;

    /* Find the maximum */
    for (let i = 0; i < n; i++) {
        maxi = Math.max(maxi, v[i]);
    }
    return maxi;
};

const calculateTotalHours = (v, hourly) => {
    let totalH = 0;
    let n = v.length;

    /* Find total hours */
    for (let i = 0; i < n; i++) {
        totalH += Math.ceil(v[i] / hourly);
    }

    return totalH;
};

const minimumRateToEatBananas = (v, h) => {
    /* Find the maximum number */
    let maxi = findMax(v);

    /* Find the minimum value of k */
    for (let i = 1; i <= maxi; i++) {
        let reqTime = calculateTotalHours(v, i);
        if (reqTime <= h) {
            return i;
        }
    }
    return maxi;
};
let ans = minimumRateToEatBananas([3, 6, 7, 11], 8);
console.log("Koko should eat at least " + ans + " bananas/hr.");

/* Koko should eat at least 4 bananas/hr. */


/*<---------------------------------------------- Using Binary Search ----------------------------------------------->*/

/*
    we know that speed range lies between (1 to 11).

    Input: [3, 6, 7, 11], H = 8

    1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11    a = Possible Ans
    x  x  x  a  a  a  a  a  a   a   a


    0  1  2  3  4  5  6  7  8  9   10 
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    s              m                e

    mid = (0 + 10)/2 = 5,  midEle = 6

    3/midEle = 3/6 = 1, 6/6 = 1, 7/6 = 2, 11/6 = 2

    Total Time = 6 hours 

    we know my range lies between 0 to 6 e = mid - 1


    0  1  2  3  4
    1, 2, 3, 4, 5
    s     m     e

    mid = (0 + 4)/2 = 2,  midEle = 3

    3/midEle = 3/3 = 1, 6/3 = 2, 7/3 = 3, 11/3 = 4

    Total Time = 10 hours 

    we know my range lies between 2 to 4 s = mid + 1


    3    4
    4,   5
    s,m  e

    mid = (3 + 4)/2 = 3,  midEle = 4

    3/midEle = 3/4 = 1, 6/4 = 2, 7/4 = 2, 11/4 = 3

    Total Time = 8 hours (ans)

    return ans = start;
*/

/*
    Algorithm :-

    - First, we will find the maximum element in the given array i.e. max(a[]).
    
    - Place the 2 pointers i.e. low and high: Initially, we will place the pointers. The pointer low will point to 1 
      and the high will point to max(a[]).
    
    - Calculate the mid: Now, inside the loop, we will calculate the value of mid using the following formula :-
        mid = (low + high) 

    - Eliminate the halves based on the time required if Koko eats mid bananas/hr :-

        We will first calculate the total time(required to consume all the bananas in the array)

        i.e. totalH using the function calculateTotalHours(a[], mid) -

            - If totalH <= h: On satisfying this condition, we can conclude that the number mid is one of our 
            possible answers. But we want the minimum number. So, we will eliminate the right half and consider 
            the left half(i.e. high = mid-1).
            
            - Otherwise, the value mid is smaller than the number we want(as the totalH > h). This means the numbers 
            greater than mid should be considered and the right half of mid consists of such numbers. So, we will 
            eliminate the left half and consider the right half(i.e. low = mid+1).
    
    - Finally, outside the loop, we will return the value of low as the pointer will be pointing to the answer.
*/

/*
    findMax(v); should be findMaxBS(v); 

    Now, let's do a dry run of minimumRateToEatBananasBS([30, 11, 23, 4, 20], 5) in tabular form.

    Step 1: Compute findMaxBS(v)

        | Index  | v[i] | maxi (max so far) |
        |--------|------|-------------------|
        | 0      | 30   |    30             |
        | 1      | 11   |    30             |
        | 2      | 23   |    30             |
        | 3      | 4    |    30             |
        | 4      | 20   |    30             |

        Result: maxi = 30

        So, high = 30, low = 1.


    Step 2: Binary Search Execution

        | Iteration |  low | high |  mid |   calculateTotalHoursBS(v, mid)  | totalH <= h |  Action   |
        |-----------|------|------|------|----------------------------------|-------------|-----------|
        | 1         | 1    | 30   | 15   | 2 + 1 + 2 + 1 + 2 = 8            | ❌ (8 > 5)  | low = 16  |
        | 2         | 16   | 30   | 23   | 2 +  1 + 1 + 1 + 1  = 6          | ❌ (6 > 5)  | low = 24  |
        | 3         | 24   | 30   | 27   | 2 +  1 + 1 + 1 + 1  = 6          | ❌ (6 > 5)  | low = 28  |
        | 4         | 28   | 30   | 29   | 2 +  1 + 1 + 1 + 1  = 6          | ❌ (6 > 5)  | low = 30  |
        | 5         | 30   | 30   | 30   | 1 +  1 + 1 + 1 + 1  = 5          | ✅ (5 ≤ 5)  | high = 29 |

    Final Answer -

    Since low = 30 after the loop, Koko should eat at least 30 bananas/hr.
*/

const findMaxBS = (v) => {
    let maxi = -Infinity;
    let n = v.length;
    /* Find the maximum */
    for (let i = 0; i < n; i++) {
        maxi = Math.max(maxi, v[i]);
    }
    return maxi;
};

const calculateTotalHoursBS = (v, hourly) => {
    let totalH = 0;
    let n = v.length;
    /* Find total hours */
    for (let i = 0; i < n; i++) {
        totalH += Math.ceil(v[i] / hourly);
    }
    return totalH;
};

const minimumRateToEatBananasBS = (v, h) => {
    let low = 1;
    let high = findMax(v);

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let totalH = calculateTotalHoursBS(v, mid);
        if (totalH <= h) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low;
};
let Ans = minimumRateToEatBananasBS([30, 11, 23, 4, 20], 5);
console.log("Koko should eat at least " + Ans + " bananas/hr.");

/* Output: Koko should eat at least 30 bananas/hr. */


