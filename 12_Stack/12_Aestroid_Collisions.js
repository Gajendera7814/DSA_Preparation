/*
    Aestroid Collisions
    <------------------>

    The asteroid collision problem involves determining the state of asteroids after they collide. Each asteroid moves 
    either left or right, and when two asteroids collide, the smaller one (by absolute size) gets destroyed. If they are 
    equal in size, both get destroyed. The goal is to simulate the collisions and return the final state of the asteroids.

    Problem Statement:

        Asteroids are represented as an array of integers. Each integer represents the size and direction of the asteroid:

        - Positive numbers represent asteroids moving to the right (→).
        - Negative numbers represent asteroids moving to the left (←).

        If the sizes are equal, both asteroids are destroyed.
        Otherwise, the smaller asteroid is destroyed.


        1. Positive numbers represent asteroids moving to the right (→).
        2. Negative numbers represent asteroids moving to the left (←).
        3. If the sizes are equal, both asteroids are destroyed.
        4. Otherwise, the smaller asteroid is destroyed.
        5. Same sign number is not collied.
        6. If two asteroids collide, the smaller one is destroyed.
        7. If two asteroids are equal in size, both are destroyed.
        8. Asteroids are destroyed in the order they collide.
        9. The final state of the asteroids is returned as an array of integers.


    Input: [3, 5, -3],  Output: [3, 5]

        Explainaton -
            3, 5 --> move in right direction they are never collied because both are in same direction with same speed
            -3 --> move in left direction
            5 and -3 collide, -3 is destroyed --> Because (5 > |-3|)


    Input: [3, 4, -10, 2, 6, -3, 5],  Output: [-10, 2, 6, 5]

        Explanation: 
            Step - 1.   3, 4 ---> move in right direction.

            Step - 2.   -10 ---> move in left direction.
                        -10 and 4 collide, 4 is destroyed ---> Because (4 < |-10|)
                        Now,
                        -10 and 3 collide, 3 is distroyed ---> Because (3 < |-10|)  ---> [-10, 2, 6, -3, 5]

            Step - 3.   2, 6 ---> move in right direction.

            Step - 4.   -3 ---> move in left direction.
                        -3 and 6 collide, -3 is destroyed ---> Because (|-3| < 6)  ---> [-10, 2, 6, 5]

            Step - 5.   5 ---> move in right direction.

            so final output is [-10, 2, 6, 5]


    Input: [3, 4, -3, 2, 5, -7],  Output: [-7]

        Explanation:
            3, 4 ---> move in right direction.
            -3 ---> move in left direction.
                -3 and 4 collide, -3 is destroyed ---> Because (4 > |-3|)   ---> [3, 4, 2, 5, -7]
            2, 5 ---> move in right direction.
            -7 ---> move in left direction.
                -7 and 5 collide, 5 is destroyed ---> Because (5 < |-7|)
                -7 and 2 collide, 2 is destroyed ---> Because (2 < |-7|)
                -7 and 4 collide, 4 is destroyed ---> Because (4 < |-7|)
                -7 and 3 collide, 3 is destroyed ---> Because (3 < |-7|)

        so final output is [-7]


    Input: [4, 3, 7, -7],  Output: [4, 3]

        Explanation:
            4, 3 ---> move in right direction.
            -7 ---> move in left direction.
                -7 and 7 collide, Both are distroy because of same number with different sign.
*/


const AestroidCollisions = (arr) => {
    let stack = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            stack.push(arr[i]);
        } else { /* when collision happens */
            while (stack.length !== 0 && stack[stack.length - 1] > 0 && stack[stack.length - 1] < Math.abs(arr[i])) {
                stack.pop();
            } if (stack.length !== 0 && stack[stack.length - 1] === Math.abs(arr[i])) {
                stack.pop();
            } else if(stack.length === 0 || stack[stack.length - 1] < 0) {
                stack.push(arr[i]);
            }
        }
    };
    return stack;
};
console.log(AestroidCollisions([3, 5, -3])); // Output: [ 3, 5 ]
console.log(AestroidCollisions([4, 3, 7, -7])); // Output: [ 4, 3 ]
console.log(AestroidCollisions([5, 2, 7, -1])); // Output: [ 5, 2, 7 ]
console.log(AestroidCollisions([3, 4, -3, 2, 5, -7])); // Output: [ -7 ]
console.log(AestroidCollisions([3, 4, -10, 2, 6, -3, 5])); // Output: [ -10, 2, 6, 5 ]


/*
    Time Complexity: O(n)
    Space Complexity: O(n)
*/