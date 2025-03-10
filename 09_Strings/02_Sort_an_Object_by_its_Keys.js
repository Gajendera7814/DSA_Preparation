/*
    Sort an Object by its Keys.
    <-------------------------->

    Input: { '2' : "Car", '1' : "Bike", '3' : "ATempo" }

    Output: { '1': 'Bike', '2': 'Car', '3': 'ATempo' }
*/


/*<--------------------------------------- Using Object.keys() and Sorting ----------------------------------------->*/

/*
    Input: { '2': "Car", '1': "Bike", '3': "ATempo" }


    Step-by-Step Dry Run -

        | Step |                   Operation                |                   Current State                   |
        |------|--------------------------------------------|---------------------------------------------------|
        |   1  | Extract keys using Object.keys(obj).       |           ['2', '1', '3']                         |
        |   2  | Sort the keys using .sort().               |           ['1', '2', '3']                         |
        |   3  | Initialize sortedObj = {}.                 |           {} (empty object)                       |
        |   4  | Start iterating over sorted keys.          |           -                                       |
        |   5  | Assign sortedObj['1'] = obj['1'] (Bike).   |           {'1': "Bike"}                           |
        |   6  | Assign sortedObj['2'] = obj['2'] (Car).    |           {'1': "Bike", '2': "Car"}               |
        |   7  | Assign sortedObj['3'] = obj['3'] (ATempo). |           {'1': "Bike", '2': "Car", '3': "ATempo"}|
        |   8  | Return the sorted object.                  |           {'1': "Bike", '2': "Car", '3': "ATempo"}|

    Final Output -
        {
            "1": "Bike",
            "2": "Car",
            "3": "ATempo"
        }
*/

const sortObjectByKeys = (obj) => {
    /* Sort the keys */
    let sortedKeys = Object.keys(obj).sort();

    let sortedObj = {};
    sortedKeys.forEach(key => {
        /* Build the new object */
        sortedObj[key] = obj[key];
    });

    return sortedObj;
};
console.log(sortObjectByKeys({ '2': "Car", '1': "Bike", '3': "ATempo" }));

/* Output:- { '1': 'Bike', '2': 'Car', '3': 'ATempo' } */

/*
    Object.keys(obj) ----> O(N) Extracting all keys takes linear time.

    .sort() ----> O(Nlog N) Sorting the keys takes O(Nlog N) time.

    forEach loop ----> O(N) Iterates through N keys and assigns them to the new object.

    Final Complexity
        - Time Complexity: O(Nlog N)
        - Space Complexity: O(N)
*/