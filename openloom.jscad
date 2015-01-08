function main() {
    var loomDiameter = 140;
    var circleThickness = 19;
    var circleHeight = 13;
    var pegDiameter = 9;
    var pegHeight = 30;
    var pegSlotDiam = 4;
    var numPegs = 24;
    var numSegments = 4;
    var includeStartPeg = true;
    var startPegDiameter = 7;
    var startPegLength = 18;

    var outerRadius = (loomDiameter+circleThickness)/2;
    var innerRadius = (loomDiameter-circleThickness)/2;
    var outer = cylinder({r:outerRadius, h:circleHeight});
    var inner = cylinder({r:innerRadius, h:circleHeight});

    // Make first peg:
    var pegs = cylinder({r:pegDiameter/2, h:pegHeight});
    pegs = pegs.translate([loomDiameter/2, 0, circleHeight]);

    // Make the rest of the pegs:
    for (i=1; i<numPegs; ++i) {
        var newPeg = cylinder({r:pegDiameter/2, h:pegHeight});
        newPeg = newPeg.translate([loomDiameter/2, 0, circleHeight]);
        pegs = pegs.rotateZ(360/numPegs);
        pegs = union(pegs, newPeg);
    }

    var ring = difference(outer, inner);
    return union(ring, pegs);
}
