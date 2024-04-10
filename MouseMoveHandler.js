
class MouseMoveHandler {


    constructor(canvas, offset) {
        this.status = 1; //1:move nearest point
        //2: add new point by mouseUp
        this.canvas = canvas;
        this.offset = offset;
        this.canvas.addEventListener('mousedown', (evt) => this.handle_MouseDown(evt));
        //this.canvas.addEventListener('mousemove', (evt) => this.handle_MouseMove(evt));
        this.canvas.addEventListener('mouseup', (evt) => this.handle_MouseUp(evt));
        this.strokes = [];
    }

    handle_MouseDown(event) {
        //console.log("handle_MouseDown")
        if (getPointsChoice()==2) //add points by mouse click
            this.isDrawing = true;
        
    };

    //handle_MouseMove(event) {
    //    if (this.isDrawing) {
    //        const rect = this.canvas.getBoundingClientRect();
    //        const x = event.clientX - rect.left;
    //        const y = event.clientY - rect.top;
            
    //        let stroke = new Point(x, y);//add trace
    //        this.strokes.push(stroke);            
    //        this.clearAll();
    //        //draw trace advance from last position to current one
    //        const ctx = this.canvas.getContext("2d");
    //        ctx.strokeStyle = 'green';
    //        ctx.lineWidth = 1;
    //        ctx.setLineDash([]);
    //        ctx.beginPath();
    //        for (var i = 0; i < this.strokes.length; i++) {
    //            ctx.lineTo(this.strokes[i].x, this.strokes[i].y);
    //            ctx.stroke();
    //        }
    //    }
    //};

    handle_MouseUp(event) {
       // console.log("handle_MouseUp")
        if (this.isDrawing) {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            drawer.points.push(new Point(x, y));
            drawer.clearCanvas();
            drawer.drawPoints();
            drawer.drawMedian();            
            this.isDrawing = false;
        }
    };
}



