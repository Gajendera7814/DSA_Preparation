/*
    Quick Sort
    <--------->

    Quick sort is a sorting algorithm based on the divide and conqure algorithm that picks an element as a pivot and 
    partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.

    Three options to choose pivot element :-

    1. Left end or right end. this could give O(n2) performance depending in the input so this is a bad choise but 
       easiest to implement.

    2. Beat of 3, left, middle and right this gives substantially better performance than simply choosing an end in 
       the worst case.

    3. Choosing a random pivot is fairly easy to implement and guarantees nlogn performanve so it is a very good choice. 
*/

/*
    Input: [11, 9, 7, 13, 12, 16, 4, 18, 15],   Output: [4, 7, 9, 11, 12, 13, 15, 16, 18]


     0   1  2   3   4   5  6   7   8
    [11, 9, 7, 13, 12, 16, 4, 18, 15]       pivot = length / 2 = 4
    ---           ----           ----
    i = 0         pivot          j = 8
    ---->                       <------
    i++                           j--
    
    
    -> choose best of three, we choose 15, 12, 11

    -> 15 > 12 < 11

    -> All smaller elements are presents left side of pivot element and larger element is right side.


    Algorithm :-

    while(arr[i] < pivot){
        i++;
    }
    while(arr[j] > pivot){
        j--;
    }


     0   1  2  3     4    5  6   7  8
    [11, 9, 7, 13,  12,  16, 4, 18, 15]
    <------------> Pivot <------------>

    all elem lesser       all element larger
    than pivot is         than pivot is right
    left side             side


    while(i <= j){
        while(arr[i] < pivot){
            i++;
        }
        while(arr[j] > pivot){
            j--;
        }
        if(i <= j){
            swap;
            i++;
            j--;
        }
    }
*/

const QuickSort = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
        const partitionIndex = partition(arr, low, high);

        /* Left side part */
        QuickSort(arr, low, partitionIndex - 1);

        /* Right side part */
        QuickSort(arr, partitionIndex, high);
    }
    return arr;
};

const partition = (arr, low, high) => {
    const pivot = arr[Math.floor((low + high) / 2)];

    while (low <= high) {
        while (arr[low] < pivot) {
            low++;
        }
        while (arr[high] > pivot) {
            high--;
        }
        if (low <= high) {
            [arr[low], arr[high]] = [arr[high], arr[low]];
            low++;
            high--;
        }
    }
    return low;
};
console.log(QuickSort([11, 9, 7, 13, 12, 16, 4, 18, 15])); /* Output: [4, 7, 9, 11, 12, 13, 15, 16, 18] */

/*
    Time Complexity :- O(n log n)
    Space Complexity :- O(n)
*/



/*<-----------------------------------------------------------------------------------------------------------------*/

const quickSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
};
console.log(quickSort([5, 2, 9, 3, 6, 1, 8, 7]));

/*
  Time Complexity -
    Average Case - O(nlog n)
    Best Case - O(nlog n)
    Worst Case - O(n^2)
    
  Space Complexity -
    Average Case - O(log n)
    Worst Case - O(n)
*/