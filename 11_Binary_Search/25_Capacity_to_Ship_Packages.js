/*
    Capacity to Ship Packages within D Days     Leetcode Problem
    <------------------------------------->    <----------------->

    To determine the capacity required to ship packages within a specified number of days (d), you need to consider the 
    total weight of the packages and how they can be distributed over those days. The capacity of the shipping method 
    must be sufficient to handle the total weight, ideally allowing for optimal distribution to ensure all goods are 
    shipped within the set timeframe.

    Leetcode Problem Statement -

        A conveyor belt has packages that must be shipped from one port to another within days days.

        The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on 
        the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity
        of the ship.

        Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being 
        shipped within days days.

    <----------------------------------------------------------------------------------------------------------------->

    Input: weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],    days = 5,    capacity / Output: 15

    Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
        
        1st day :- { 1, 2, 3, 4, 5 } = sum = 15 === capacity (15)
        2nd day :- { 6, 7 } = sum = 13 < capacity (15)
        3rd day :- 8 < capacity (15)
        4th day :- 9 < capacity (15)
        5th day :- 10 < capacity (15)

    Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages 
    into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.


    <---------------------------------------------------------------------------------------------------------------->
    
    Input: weights = [3, 2, 2, 4, 1, 4],    days = 3,    capacity / Output: 6

    Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
        1st day :- { 3, 2 } = sum = 3 < capacity (6)
        2nd day :- { 2, 4 } = sum = 6 === capacity (6)
        3rd day :- { 1, 4 } = sum = 5 < capacity (6)
*/


/*<------------------------------------------- Brute Force Approach ------------------------------------------------>*/

/*
    Given input:
    
    weight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  d1 = 5;

    - Max Weight (maxWeight) = 10
    - Total Weight (totalWeight) = 55

    The loop will check capacities from 10 to 55.


    Dry Run for canShipWithCapacitys(weights, capacity) -

    We'll check canShipWithCapacitys for each capacity from 10 onward until it satisfies d ≤ 5.

    Checking for Capacity = 15

    | Step | Package | Load Before | Load After | New Day? | Days Count |
    |------|---------|-------------|------------|----------|------------|
    | 1    |  1      |  0          |  1         | No       | 1          |
    | 2    |  2      |  1          |  3         | No       | 1          |
    | 3    |  3      |  3          |  6         | No       | 1          |
    | 4    |  4      |  6          |  10        | No       | 1          |
    | 5    |  5      |  10         |  15        | No       | 1          |
    | 6    |  6      |  15         |  6         | Yes      | 2          |
    | 7    |  7      |  6          |  13        | No       | 2          |
    | 8    |  8      |  13         |  8         | Yes      | 3          |
    | 9    |  9      |  8          |  9         | No       | 3          |
    | 10   |  10     |  9          |  10        | No       | 3          |

    Result: Days = 5 (valid solution)

    Return the Minimum Capacity

    Since capacity = 15 satisfies d = 5, we return 15 as the answer.

    Final Output - 15
*/

const canShipWithCapacitys = (weights, capacity) => {
    let days = 1;
    let load = 0;

    for (let i = 0; i < weights.length; i++) {
        if (load + weights[i] > capacity) {
            days = days + 1;
            load = weights[i];
        } else {
            load += weights[i];
         }
    }
    return days;
};

const shipWithinDay = (weights, d) => {
    let maxWeight = Math.max(...weights);
    let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

    for (let i = maxWeight; i <= totalWeight; i++) {
        if (canShipWithCapacitys(weights, i) <= d) {
            return i;
        }
    }
    return -1;
};

let weight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let d1 = 5;
console.log(shipWithinDay(weight, d1));  // Output: 15

let weights2 = [3, 2, 2, 4, 1, 4];
let days2 = 3;
console.log(shipWithinDay(weights2, days2));  // Output: 6




/*<------------------------------------------- By Using Binary Search ---------------------------------------------->*/

/*

    - We need to find the minimum capacity required to ship all packages within d = 5 days.
    - The function uses binary search on the possible capacities (start to end).

    Given input: weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],   d = 5;
    
    - Start (max(weights)) = 10
    - End (sum(weights)) = 55

    The binary search runs between 10 to 55.

    - We calculate the midpoint and check how many days it takes using canShipWithCapacity(weights, mid). 

        | Iteration | Start | End | Mid | Days Required | Update start or end |
        |-----------|-------|-----|-----|---------------|---------------------|
        | 1         | 10    | 55  | 32  |  3            |       end = 31      |
        | 2         | 10    | 31  | 20  |  4            |       end = 19      |
        | 3         | 10    | 19  | 14  |  5            |       end = 13      |
        | 4         | 10    | 13  | 11  |  5            |       end = 10      |
        | 5         | 10    | 10  | 10  |  6            |       start = 11    |

        At the end, start = 11, so the answer is 15.


    Dry Run for canShipWithCapacity(weights, 15) -

    Let's verify if 15 is a valid answer.

        | Step | Package | Load Before | Load After | New Day? | Days Count |
        |------|---------|-------------|------------|----------|------------|
        | 1    |  1      |  0          |  1         | No       | 1          |
        | 2    |  2      |  1          |  3         | No       | 1          |
        | 3    |  3      |  3          |  6         | No       | 1          |
        | 4    |  4      |  6          |  10        | No       | 1          |
        | 5    |  5      |  10         |  15        | No       | 1          |
        | 6    |  6      |  15         |  6         | Yes      | 2          |
        | 7    |  7      |  6          |  13        | No       | 2          |
        | 8    |  8      |  13         |  8         | Yes      | 3          |
        | 9    |  9      |  8          |  9         | No       | 3          |
        | 10   |  10     |  9          |  10        | No       | 3          |

        Result: Days = 5 (valid solution)


        Final Output - 15
    
    This means the minimum capacity required to ship within 5 days is 15.
*/

const canShipWithCapacity = (weights, capacity) => {
    let days = 1;
    let load = 0;

    for (let i = 0; i < weights.length; i++) {
        if (load + weights[i] > capacity) {
            days += 1;
            load = weights[i];
        } else {
            load += weights[i];
        }
    }
    return days;
};

const shipWithinDays = (weights, d) => {
    let start = Math.max(...weights);
    let end = weights.reduce((sum, weight) => sum + weight, 0);

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        let numberOfDays = canShipWithCapacity(weights, mid);

        if (numberOfDays <= d) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return start;
};

let weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let d = 5;
console.log(shipWithinDays(weights, d));  // Output: 15
