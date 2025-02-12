/*
    Best Time to Buy and Sell Stock    Leetcode Problem
    <------------------------------>   <--------------->

    You are given an array prices where prices[i] is the price of a given stock on the ith day.

    You want to maximize your profit by choosing a single day to buy one stock and choosing a different day 
    in the future to sell that stock.

    Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

    
    If you are selling on ith day you buy on the minimum price from 1st day - (i - 1)th day.

    Example - 1

        Input: prices = [7, 1, 5, 3, 6, 4], Output: 5
    
        prices ---> 7 1 5 3 6 4
        days -----> 1 2 3 4 5 6

        Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.

    Example - 2

        Input: prices = [7, 6, 4, 3, 1], Output: 0
        
        Explanation: In this case, no transactions are done, and the max profit = 0.

    Note: Buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
*/


/*<---------------------------------------------- Brute Force Approach --------------------------------------------->*/

/*
    Explanation of the Logic -

    This function finds the maximum profit that can be obtained from a given list of stock prices, where:
        - Each index in the array represents a day.
        - The value at each index represents the stock price on that day.
        - You are allowed to buy the stock on one day and sell it on another day that comes after the buying day.

    Logic Breakdown -
        1. Initialize maxProfit to 0.
        
        2. Use two nested loops:
            - Outer loop (i) iterates over the prices (buy day).
            - Inner loop (j) iterates over the prices that come after i (sell day).
        3. Calculate the profit as prices[j] - prices[i].
        4. Update maxProfit to the maximum value found so far.
        5. Finally, return maxProfit.

    Example 1: [7, 6, 4, 3, 1]


        | i (Buy Day) | j (Sell Day) |  Buy Price (prices[i])  |  Sell Price (prices[j]) |  Profit (prices[j] - prices[i])  | maxProfit |
        |-------------|--------------|-------------------------|-------------------------|----------------------------------|-----------|
        | 0           |  1           | 7                       | 6                       | -1                               | 0         |
        | 0           |  2           | 7                       | 4                       | -3                               | 0         |
        | 0           |  3           | 7                       | 3                       | -4                               | 0         |
        | 0           |  4           | 7                       | 1                       | -6                               | 0         |
        | 1           |  2           | 6                       | 4                       | -2                               | 0         |
        | 1           |  3           | 6                       | 3                       | -3                               | 0         |
        | 1           |  4           | 6                       | 1                       | -5                               | 0         |
        | 2           |  3           | 4                       | 3                       | -1                               | 0         |
        | 2           |  4           | 4                       | 1                       | -3                               | 0         |
        | 3           |  4           | 3                       | 1                       | -2                               | 0         |

        Final Output: 0 (No profit is possible)


    Example 2: [7, 1, 5, 3, 6, 4]

        | i (Buy Day) | j (Sell Day) |  Buy Price (prices[i])  |  Sell Price (prices[j]) |  Profit (prices[j] - prices[i])  | maxProfit |
        |-------------|--------------|-------------------------|-------------------------|----------------------------------|-----------|
        | 0           |  1           | 7                       | 1                       | -6                               | 0         |
        | 0           |  2           | 7                       | 5                       | -2                               | 0         |
        | 0           |  3           | 7                       | 3                       | -4                               | 0         |
        | 0           |  4           | 7                       | 6                       | -1                               | 0         |
        | 0           |  5           | 7                       | 4                       | -3                               | 0         |
        | 1           |  2           | 1                       | 5                       | 4                                | 4         |
        | 1           |  3           | 1                       | 3                       | 2                                | 4         |
        | 1           |  4           | 1                       | 6                       | 5                                | 5         |
        | 1           |  5           | 1                       | 4                       | 3                                | 5         |
        | 2           |  3           | 5                       | 3                       | -2                               | 5         |
        | 2           |  4           | 5                       | 6                       | 1                                | 5         |
        | 2           |  5           | 5                       | 4                       | -1                               | 5         |
        | 3           |  4           | 3                       | 6                       | 3                                | 5         |
        | 3           |  5           | 3                       | 4                       | 1                                | 5         |
        | 4           |  5           | 6                       | 4                       | -2                               | 5         |

        Final Output: 5 (Buy at 1, sell at 6)

*/

const maxProfit = (prices) => {
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            let profit = prices[j] - prices[i];  // Sell on day j, buy on day i
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    return maxProfit;
};
console.log(maxProfit([7, 6, 4, 3, 1]));   // Output: 0
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // Output: 5

/*
    Time complexity: O(n²)
    Space Complexity: O(1)
*/



/*<----------------------------------------------- Optimal Approach ----------------------------------------------->*/

/*
    Approach :- Step-by-Step Explanation

        1. Initialize minPrice to Infinity  
            - This ensures any stock price encountered is initially lower than minPrice.

        2. Initialize maxProfit to 0  
            - This stores the maximum profit found so far.

        3. Iterate through the array (prices)  
            - If the current price (prices[i]) is lower than minPrice, update minPrice.  
            - Else, compute the profit (prices[i] - minPrice) and update maxProfit if this profit is higher.

        4. Return maxProfit, which stores the highest possible profit.


    Example 1: [7, 6, 4, 3, 1]

        |    Day (i)  |     Price (prices[i])   |    minPrice (Lowest Seen)    |    Profit (prices[i] - minPrice)    |     maxProfit (Max Profit)    |
        |-------------|-------------------------|------------------------------|-------------------------------------|-------------------------------|
        |     0       |     7                   |     7                        |     -                               |     0                         |
        |     1       |     6                   |     6                        |     -                               |     0                         |
        |     2       |     4                   |     4                        |     -                               |     0                         |
        |     3       |     3                   |     3                        |     -                               |     0                         |
        |     4       |     1                   |     1                        |     -                               |     0                         |

        Final Output: 0 (No profit is possible)


    Example 2: [7, 1, 5, 3, 6, 4]

        |   Day (i)  |    Price (prices[i])   |    minPrice (Lowest Seen)   |   Profit (prices[i] - minPrice) | maxProfit (Max Profit) |
        |------------|------------------------|-----------------------------|---------------------------------|------------------------|
        |    0       |    7                   |    7                        |    -                            |    0                   |
        |    1       |    1                   |    1                        |    -                            |    0                   |
        |    2       |    5                   |    1                        |    4 (5 - 1)                    |    4                   |
        |    3       |    3                   |    1                        |    2 (3 - 1)                    |    4                   |
        |    4       |    6                   |    1                        |    5 (6 - 1)                    |    5                   |
        |    5       |    4                   |    1                        |    3 (4 - 1)                    |    5                   |

        Final Output: 5 (Buy at 1, sell at 6)
*/

const maxProfitOptimalWay = (prices) => {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        /* Update minPrice if we find a lower price */
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            /* Calculate profit if we sell at the current price */
            const profit = prices[i] - minPrice;
            maxProfit = Math.max(maxProfit, profit);
        }
    };
    return maxProfit;
};
console.log(maxProfitOptimalWay([7, 6, 4, 3, 1]));   // Output: 0
console.log(maxProfitOptimalWay([7, 1, 5, 3, 6, 4])); // Output: 5

/*
    Time complexity: O(n)

        - Single pass O(n).

    Space Complexity: O(1)

        - Tracks only two values (minPrice and maxProfit).

*/


/* OR */

const maxProfitOptimalWay2 = (prices) => {
    let minimum = prices[0];
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        let cost = prices[i] - minimum;
        maxProfit = Math.max(maxProfit, cost);
        minimum = Math.min(minimum, prices[i]);
    }
    return maxProfit;
};
console.log(maxProfitOptimalWay2([7, 6, 4, 3, 1]));  // Output: 0
console.log(maxProfitOptimalWay2([7, 1, 5, 3, 6, 4])); // Output: 5

/*
    Time complexity: O(n)
    Space Complexity: O(1)
*/




/*<--------------------------------------------- Kadane’s Algorithm ----------------------------------------------->*/

/*
    Algorithm :-

    - Initialize currentProfit and maxProfit to 0.

    - Loop through the prices array:
        - Update currentProfit by adding the difference between today's price and yesterday's price.
        - If currentProfit becomes negative, reset it to 0.
    
    - Keep track of the maximum profit seen so far.
*/

/*
    How the Logic Works -

        1. Instead of tracking absolute stock prices, we focus on daily price changes (differences between consecutive days).
        2. If the price increases from one day to the next, we add the difference to currentProfit.
        3. If currentProfit becomes negative, we reset it to 0 (indicating no profit if we start buying from this day).
        4. We continuously track the maximum profit encountered so far.

    Step-by-Step Explanation

        - maxProfit = 0: Stores the maximum profit observed.
        - currentProfit = 0: Tracks the running sum of consecutive gains.

    Iterate Through the Prices
        - Compute daily profit/loss: prices[i] - prices[i - 1]
        - If adding this profit keeps currentProfit positive, continue accumulating.
        - If currentProfit turns negative, reset it to 0 (meaning, start fresh).
        - Update maxProfit whenever a new high is found.


    Example 1: [7, 6, 4, 3, 1]

        | Day (i) |  Price (prices[i])  | Daily Change (prices[i] - prices[i-1]) | currentProfit (Sum of Gains) |  maxProfit  |
        |---------|---------------------|----------------------------------------|------------------------------|-------------|
        | 0       | 7                   | -                                      | -                            | 0           |
        | 1       | 6                   | -1                                     | 0 (reset)                    | 0           |
        | 2       | 4                   | -2                                     | 0 (reset)                    | 0           |
        | 3       | 3                   | -1                                     | 0 (reset)                    | 0           |
        | 4       | 1                   | -2                                     | 0 (reset)                    | 0           |

        Final Output: 0 (No profit is possible)


    Example 2: [7, 1, 5, 3, 6, 4]

        | Day (i) |  Price (prices[i])  | Daily Change (prices[i] - prices[i-1]) | currentProfit (Sum of Gains) |  maxProfit  |
        |---------|---------------------|----------------------------------------|------------------------------|-------------|
        | 0       | 7                   | -                                      |  -                           | 0           |
        | 1       | 1                   | -6                                     |  0 (reset)                   | 0           |
        | 2       | 5                   | +4                                     |  4                           | 4           |
        | 3       | 3                   | -2                                     |  2                           | 4           |
        | 4       | 6                   | +3                                     |  5                           | 5           |
        | 5       | 4                   | -2                                     |  3                           | 5           |

        Final Output: 5 (Buy at 1, sell at 6)
*/

const maxProfitKadane = (prices) => {
    let maxProfit = 0;
    let currentProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        /* Calculate daily profit (difference between consecutive days) */
        currentProfit += prices[i] - prices[i - 1];
        
        /* Reset currentProfit if it goes negative */
        if (currentProfit < 0) {
            currentProfit = 0;
        }
        
        /* Update maxProfit */
        maxProfit = Math.max(maxProfit, currentProfit);
    };
    return maxProfit;
};
console.log(maxProfitKadane([7, 6, 4, 3, 1]));   // Output: 0
console.log(maxProfitKadane([7, 1, 5, 3, 6, 4])); // Output: 5

/*
    Time complexity: O(n)
    Space Complexity: O(1)
*/
