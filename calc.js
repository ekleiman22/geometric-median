////function distance(p1, p2) {
////    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
////}
function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}
function geometricMedian(xCenter, yCenter, points,
    epsilon = 1e-6) {
    //firstly check if one of points satisfy to 
    // a criterion of minimality
    for (let i = 0; i < points.length; i++) {
        let beginPoint = points[i];
        let res = getNormalizedVectorsSumModule(points, i);
        if (res < 0) {
            alert("The selected points are too close to each other");
            return;
        }
        if (res <= 1) {
            return [points[i].x, points[i].y];
        }
    }

    let guess = [xCenter, yCenter];
    let prevGuess;

    do {
        prevGuess = guess;
        let weightedSumX = 0, weightedSumY = 0, sumWeights = 0;

        for (let point of points) {
            let d = distance(guess, [point.x,point.y]);
            if (d > epsilon) { // Avoid division by zero
                let weight = 1 / d;
                weightedSumX += point.x * weight;
                weightedSumY += point.y * weight;
                sumWeights += weight;
            }
        }

        guess = [weightedSumX / sumWeights, weightedSumY / sumWeights];
    } while (distance(guess, prevGuess) > epsilon);

    return guess;
}
//Given array of points and an index k of one of them
//compute sum of normalized vectors beginning
//in k-th point and ended in all other points
function getNormalizedVectorsSumModule(points, k) {
    let result = 0;
    let sv = [0,0]; //this is the summary vector
    let p = [points[k].x, points[k].y];
    for (let i = 0; i < points.length; i++) {
        if (i == k)
            continue;
        let d = distance(p, [points[i].x, points[i].y]);
        if (d < 1)
        {
            result = -1;
            break;
        }
        sv[0] += (points[i].x - p.x) / d;
        sv[1] += (points[i].y - p.y) / d;
    }
    if (result == 0) {
        result = sv[0] * sv[0] + sv[1] * sv[1];
    }
    return result;
}