
class Drawings {
    constructor(xCenter, yCenter, axeColor,
        pointRadius, pointColor, minimalDistancePointColor,
        minimalDistancePointRadius, canvas) {
        this.xCenter = xCenter;
        this.yCenter = yCenter;
        this.axeColor = axeColor;
        this.pointRadius = pointRadius;
        this.pointColor = pointColor;
        this.minimalDistancePointColor = minimalDistancePointColor;
        this.minimalDistancePointRadius = minimalDistancePointRadius;
        this.canvas = canvas;
        this.points = [];
    }
    drawBorder() {
        const canvas = this.canvas;
        const ctx = canvas.getContext("2d");
        let w = canvas.width;
        let offset = 0; 
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(offset, w - offset);
        ctx.lineTo(offset, offset);
        ctx.lineTo(w - offset, offset);
        ctx.lineTo(w - offset, w - offset);
        ctx.lineTo(offset, w - offset);
        
        ctx.stroke();
        ctx.closePath();
    }
    drawAxes() {
       
        const ctx = this.canvas.getContext("2d");
        let w = this.canvas.width;
        ctx.strokeStyle = this.axeColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(this.xCenter, this.yCenter);        
        ctx.lineTo(this.xCenter, this.yCenter-w/2);       
        ctx.moveTo(this.xCenter, this.yCenter)
        ctx.lineTo(this.xCenter, this.yCenter + w / 2);

        ctx.moveTo(this.xCenter, this.yCenter);
        ctx.lineTo(this.xCenter - w / 2, this.yCenter);
        ctx.moveTo(this.xCenter, this.yCenter)
        ctx.lineTo(this.xCenter + w / 2, this.yCenter );

        ctx.stroke();
        ctx.closePath();
    }
    drawRandomPoints(n) {
        this.points = [];
        let offset = 5;
        let w = this.canvas.width;
        for (let i = 0; i < n; i++) {
            let cx = Math.random() * (w - offset);
            let cy = Math.random() * (w - offset);
            this.points.push(new Point(cx, cy));
            
        }
        this.drawPoints();
    }

    drawPoints() {
        this.clearCanvas();
        const ctx = this.canvas.getContext("2d");
        let w = this.canvas.width;
        ctx.fillStyle = this.pointColor;
        let n = this.points.length;
        for (let i = 0; i < n; i++) {
            let cx = this.points[i].x;
            let cy = this.points[i].y;            
            this.drawPoint(cx, cy)
        }
    }

    drawMedian() {
        if (this.points.length < 2)
            return;
        let medianPointCoords =
            geometricMedian(this.xCenter, this.yCenter, this.points, 1e-6)
        let medianPoint =
            new Point(medianPointCoords[0], medianPointCoords[1]);
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.minimalDistancePointColor;
        ctx.beginPath();
        ctx.arc(medianPoint.x, medianPoint.y, this.minimalDistancePointRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    drawPoint(x,y) {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.pointColor;
        /*this.points.push(new Point(x, y));*/
        ctx.beginPath();
        ctx.arc(x, y, this.pointRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    getRandomNumber(w) {
      return  Math.random() * w;
    }
    clearCanvas() {
        const ctx = this.canvas.getContext("2d");
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        ctx.clearRect(0, 0, width, height);
        this.drawBorder();
        this.drawAxes();
    }
    clearAll() {
        this.points = [];
        this.clearCanvas();
    }

}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}



