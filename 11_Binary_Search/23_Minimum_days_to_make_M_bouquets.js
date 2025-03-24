/*
    Minimum days to make M bouquets      Leetcode Problem
    <----------------------------->     <---------------->

    To determine the minimum number of days required to make m bouquets from an array bloomDay, you need to ensure that 
    you can create each bouquet using k adjacent flowers.

    You are given an integer array bloomDay, an integer m and an integer k.
    You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.

    Return the minimum number of days you need to wait to be able to make m bouquets from the garden. 
    If it is impossible to make m bouquets return -1.

    Example - 1 

        Input: bloomDay = [1, 10, 3, 10, 2], m = 3, k = 1, Output: 3

    Example - 2
        
        Input: bloomDay = [7, 7, 7, 7, 13, 11, 12, 7], m = 2, k = 3, Output: 12
*/


/*
    Dry Run :-
    -----------

    bloomDay = [7, 7, 7, 7, 13, 11, 12, 7]  k = 3 (each bouquet needs 3 flowers)    m = 2 (we need 2 bouquets)

    The minimum possible day is 7, and the maximum possible day is 13.


    <------------------------------------------------ day = 7 --------------------------------------------------->

    Call : canMakeBouquets([7, 7, 7, 7, 13, 11, 12, 7], 7, 2, 3)

    - count = 0, noOfBouquet = 0
    
        Loop through bloomDay :-

            - bloomDay[0] = 7 (≤ 7): Increment count = 1.
            - bloomDay[1] = 7 (≤ 7): Increment count = 2.
            - bloomDay[2] = 7 (≤ 7): Increment count = 3 --→ We have 3 consecutive flowers:
            
            Make 1 bouquet: noOfBouquet = 1, reset count = 0.
        
            - bloomDay[3] = 7 (≤ 7): Increment count = 1.
            - bloomDay[4] = 13 (> 7): This flower has not bloomed by day 7, reset count = 0.
            - bloomDay[5] = 11 (> 7): This flower has not bloomed by day 7, reset count = 0.
            - bloomDay[6] = 12 (> 7): This flower has not bloomed by day 7, reset count = 0.
            - bloomDay[7] = 7 (≤ 7): Increment count = 1.

        End of loop :-

            - At the end of the loop, noOfBouquet = 1 bouquet has been made (only 1, but we need 2).
            - We need m = 2 bouquets, but we can only make 1.
    
        Result : Return false because it's not possible to make 2 bouquets by day 7.


    <------------------------------------------------ day = 11 -------------------------------------------------->

    Call : canMakeBouquets([7, 7, 7, 7, 13, 11, 12, 7], 11, 2, 3)

    - count = 0, noOfBouquet = 0

        Loop through bloomDay :-

            - bloomDay[0] = 7 (≤ 11): Increment count = 1.
            - bloomDay[1] = 7 (≤ 11): Increment count = 2.
            - bloomDay[2] = 7 (≤ 11): Increment count = 3 -→ We have 3 consecutive flowers:
            
            Make 1 bouquet: noOfBouquet = 1, reset count = 0.
                
            - bloomDay[3] = 7 (≤ 11): Increment count = 1.
            - bloomDay[4] = 13 (> 11): This flower has not bloomed by day 11, reset count = 0.
            - bloomDay[5] = 11 (≤ 11): Increment count = 1.
            - bloomDay[6] = 12 (> 11): This flower has not bloomed by day 11, reset count = 0.
            - bloomDay[7] = 7 (≤ 11): Increment count = 2.

        End of loop:

            - At the end of the loop, noOfBouquet = 1 (again, only 1 bouquet, but we need 2).
    
        Result :- Return false because it's still not possible to make 2 bouquets by day 11.


    <------------------------------------------------ day = 12 --------------------------------------------------->

    Call : canMakeBouquets([7, 7, 7, 7, 13, 11, 12, 7], 12, 2, 3)

    - count = 0, noOfBouquet = 0

    Loop through bloomDay :-

            - bloomDay[0] = 7 (≤ 12): Increment count = 1.
            - bloomDay[1] = 7 (≤ 12): Increment count = 2.
            - bloomDay[2] = 7 (≤ 12): Increment count = 3 → We have 3 consecutive flowers:
            
            Make 1 bouquet : noOfBouquet = 1, reset count = 0.

            - bloomDay[3] = 7 (≤ 12): Increment count = 1.
            - bloomDay[4] = 13 (> 12): This flower has not bloomed by day 12, reset count = 0.
            - bloomDay[5] = 11 (≤ 12): Increment count = 1.
            - bloomDay[6] = 12 (≤ 12): Increment count = 2.
            - bloomDay[7] = 7 (≤ 12): Increment count = 3 -→ We have another 3 consecutive flowers:
            
            Make 1 more bouquet : noOfBouquet = 2.

        End of loop :-

            - At the end of the loop, noOfBouquet = 2 bouquets have been made (which is the required number).
            
        Result : Return true because it is possible to make 2 bouquets by day 12.

    
    Final Output - The minDaysToMakeBouquets function checks all days from 7 to 12 and finds that day 12 is 
    the earliest day we can make 2 bouquets. Therefore, the output is 12.
*/

/*<--------------------------------------------- Brute Force Approach ---------------------------------------------->*/

/*
    bloomDays = [1, 10, 3, 10, 2], K = 1, and M = 3, in a tabular format:

    Step 1: Initialize Variables

        |       Variable        |           Value               |
        |-----------------------|-------------------------------|
        |           arr         | [1, 10, 3, 10, 2]             |
        |           k           | 1                             |
        |           m           | 3                             |
        | totalRequiredFlowers  | m * k = 3 * 1 = 3             |
        |         left          | Math.min(...arr) = 1          |
        |         right         | Math.max(...arr) = 10         |

        Since totalRequiredFlowers (3) <= arr.length (5), we proceed.


    Step 2: Binary Search Loop

        | Iteration |       mid Calculation  | canMakeBouquet(arr, mid, m, k) Result |          Action          |
        |-----------|------------------------|---------------------------------------|--------------------------|
        |   1       | mid = (1 + 10) / 2 = 5 |  false (only 2 bouquets possible)     | Move left = mid + 1 = 6  |
        |   2       | mid = (6 + 10) / 2 = 8 |  false (only 2 bouquets possible)     | Move left = mid + 1 = 9  |
        |   3        mid = (9 + 10) / 2 = 9  |  false (only 2 bouquets possible)     | Move left = mid + 1 = 10 |

        When left == right, we stop and return left, which is 10.


    Step 3: Final Output

        minDaysToMakeBouquet(bloomDays, K, M) = 10

        This means the minimum number of days required to make 3 bouquets of 1 flower each is 10 days.
*/

const canMakeBouquet = (arr, day, m, k) => {
    let count = 0;
    let noOfBouquet = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= day) {
            count++;
        } else {
            noOfBouquet += Math.floor(count / k);  // Create bouquets and reset count
            count = 0;  // Reset count for consecutive flowers
        }
    }
    noOfBouquet += Math.floor(count / k);  // Handle the last group of flowers
    return noOfBouquet >= m;
};

const minDaysToMakeBouquet = (arr, k, m) => {
    let totalRequiredFlowers = m * k;
    if (totalRequiredFlowers > arr.length) return -1;  // Impossible case

    let left = Math.min(...arr);
    let right = Math.max(...arr);

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (canMakeBouquet(arr, mid, m, k)) {
            right = mid;  // If possible, try for a smaller number of days
        } else {
            left = mid + 1;  // Otherwise, increase the days
        }
    }

    return left;
};
let bloomDays = [1, 10, 3, 10, 2];
let K = 1;
let M = 3;
console.log(minDaysToMakeBouquet(bloomDays, K, M));  // Output: 3




/*<-------------------------------------------- By Using Binary Search --------------------------------------------->*/

/*
    Input:

    - bloomDay = [7, 7, 7, 7, 13, 11, 12, 7]
    - k = 3 (Consecutive flowers needed per bouquet)
    - m = 2 (Total bouquets needed)

    Step 1: Initialize Variables

        | Variable |            Value           |
        |----------|----------------------------|
        | val      | m * k = 2 * 3 = 6          |
        | start    | Math.min(...bloomDay) = 7  |
        | end      | Math.max(...bloomDay) = 13 |

        Since val (6) <= bloomDay.length (8), we proceed with binary search.


    Step 2: Binary Search Loop

        | Iteration |       mid Calculation     | canMakeBouquets(bloomDay, mid, m, k) Result   |           Action       |
        |-----------|---------------------------|-----------------------------------------------|------------------------|
        |   1       | mid = (7 + 13) / 2 = 10   | true (can make 2 bouquets)                    | Move end = mid - 1 = 9 |
        |   2       | mid = (7 + 9) / 2 = 8     | true (can make 2 bouquets)                    | Move end = mid - 1 = 7 |
        |   3       | mid = (7 + 7) / 2 = 7     | true (can make 2 bouquets)                    | Move end = mid - 1 = 6 |


    Step 3: Final Output

        minDaysToMakeBouquets(bloomDay, k, m) = 7

    This means the minimum number of days required to make 2 bouquets of 3 flowers each is 7 days.
*/

const canMakeBouquets = (arr, day, m, k) => {
    let count = 0;
    let noOfBouquet = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= day) {
            count++;
        } else {
            noOfBouquet += Math.floor(count / k);  // Count how many bouquets we can make
            count = 0;  // Reset count for consecutive flowers
        }
    }
    noOfBouquet += Math.floor(count / k);  // Check the last batch of flowers
    return noOfBouquet >= m;
};

const minDaysToMakeBouquets = (arr, k, m) => {
    let val = m * k;
    if (val > arr.length) return -1;  // Impossible case if we need more flowers than are available

    let start = Math.min(...arr);
    let end = Math.max(...arr);

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        // Check if we can make the required number of bouquets by this mid day
        if (canMakeBouquets(arr, mid, m, k)) {
            end = mid - 1;  // If possible, try for a smaller day
        } else {
            start = mid + 1;  // Otherwise, try for a larger day
        }
    }
    return start;
};

let bloomDay = [7, 7, 7, 7, 13, 11, 12, 7];
let k = 3;
let m = 2;
console.log(minDaysToMakeBouquets(bloomDay, k, m));  // Output: 12
