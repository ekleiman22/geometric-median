/*Given coordinates of n points on the plane find a point on the plane the sum of distances from which to the given points is minimal
ChatGPT:
The problem you're describing is known as the geometric median problem or the Fermat–Weber problem. The geometric median is a point that minimizes the sum of distances to a given set of points.

There isn't a simple formula to compute the geometric median, especially for a large number of points. However, there are algorithms to approximate it.

One common algorithm to find an approximate solution is the Weiszfeld's algorithm. It's an iterative algorithm where you start with an initial guess for the geometric median and iteratively refine it until convergence.

    Here's a basic outline of Weiszfeld's algorithm:

Start with an initial guess for the geometric median, for example, the centroid(average) of the points.
Repeat until convergence:
a.Compute the weighted average of the points, where each weight is inversely proportional to the distance from the current guess to the point.
    b.Update the guess to be the weighted average computed in the previous step.
The final guess is an approximation of the geometric median.
    Here's a simplified version of Weiszfeld's algorithm in JavaScript:*/
function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function geometricMedian(points, epsilon = 1e-6) {
    let guess = [0, 0]; // Initial guess, e.g., centroid
    let prevGuess;

    do {
        prevGuess = guess;
        let weightedSumX = 0, weightedSumY = 0, sumWeights = 0;

        for (let point of points) {
            let d = distance(guess, point);
            if (d > epsilon) { // Avoid division by zero
                let weight = 1 / d;
                weightedSumX += point[0] * weight;
                weightedSumY += point[1] * weight;
                sumWeights += weight;
            }
        }

        guess = [weightedSumX / sumWeights, weightedSumY / sumWeights];
    } while (distance(guess, prevGuess) > epsilon);

    return guess;
}

// Example usage:
let points = [[1, 2], [5, 2], [5, 6],[1.64,5.66]]; // Example points
let median = geometricMedian(points);
console.log("Geometric median:", median);
