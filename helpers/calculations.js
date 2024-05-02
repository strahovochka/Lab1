function permutations(nums) {
    const result = [];

    function permute(current, remaining) {
        if (remaining.length === 0) {
            result.push(current.slice());
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const newCurrent = current.concat(remaining[i]);
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            permute(newCurrent, newRemaining);
        }
    }

    permute([], nums);
    return result;
}

function permute(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }


    return permutations(arr);

}

function createRangeMatrix(userResults, finalArray) {
    let ranges = createMatrix(Object.keys(finalArray).length, Object.keys(userResults).length);
    let i = 0;
    Object.keys(userResults).forEach((user) => {
        userResults[user].forEach((result) => {
            let index = Object.keys(finalArray).findIndex(string => string == result.name);
            ranges[index][i] = result.priority;
        })
        i++;
    })
    return ranges
}

function createMatrix(n, m) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix.push([]);
        for (let j = 0; j < m; j++) {
            matrix[i].push(0);
        }
    }
    return matrix;
}

function checkDistance(permutation, ranges) {
    let result = [];
    for (let j = 0; j < ranges[0].length; j++) {
        let sum = 0;
        for (let i = 0; i < ranges.length; i++) {
            if (!(ranges[i][j] === 0)) {
                sum += Math.abs(permutation[i] - ranges[i][j]);
            }
        }
        result.push(sum);
    }
    return result;
}

function rowSum(row) {
    let sum = 0;
    row.forEach((element) => {
        sum += element;
    })
    return sum;
}

function permutationResult(n, rangeMatrix) {
    let permutations = permute(n);

    let resultObject = [];
    permutations.forEach((permutation, i) => {
        console.log(i, "START", permutation);

        let result = {};
        result.permutation = permutation


        let distanceArray = checkDistance(permutation, rangeMatrix);
        result.distance = distanceArray;

        let sum = rowSum(distanceArray);
        let max = Math.max(...distanceArray);
        result.sum = sum;
        result.max = max;

        resultObject.push(result);
        console.log("END", result.permutation);

        console.log(result);
        console.log(resultObject);
    })
    console.log(resultObject);
    return resultObject;
}

function getMinRanges(permutationsResults, criteria) {
    let elementArray = permutationsResults.map((object) => {
        return object[criteria];
    })

    let minElement = Math.min(...elementArray);

    let resultArray = [];
    permutationsResults.forEach((object) => {
        if (object[criteria] === minElement) {
            resultArray.push({ permutation: object.permutation, value: object[criteria] });
        }
    })

    return resultArray;
}

function convertToRanguvannia(range) {
    let ranguvannia = [...range];
    for (let i = 0; i < range.length; i++) {
        ranguvannia[range[i] - 1] = i + 1;
    }
    return ranguvannia;
}

export default { createRangeMatrix, permutationResult, getMinRanges, convertToRanguvannia };
