function main() {
    // All units are in mm.
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

    // Make the ring:
    var outerRadius = (loomDiameter+circleThickness)/2;
    var innerRadius = (loomDiameter-circleThickness)/2;
    var outer = cylinder({r:outerRadius, h:circleHeight});
    var inner = cylinder({r:innerRadius, h:circleHeight});
    var ring = difference(outer, inner);

    // Make first peg:
    var pegBase = cylinder({r:pegDiameter/2, h:pegHeight});
    var pegSlot = cylinder({r:pegSlotDiam/2, h:pegHeight});
    pegSlot = pegSlot.translate([pegDiameter/2, 0, 0]);
    pegs = difference(pegBase, pegSlot);
    pegs = pegs.translate([loomDiameter/2, 0, circleHeight]);

    // Make the rest of the pegs:
    for (i=1; i<numPegs; ++i) {
        var newPegBase = cylinder({r:pegDiameter/2, h:pegHeight});
        var newPegSlot = cylinder({r:pegSlotDiam/2, h:pegHeight});
        newPegSlot = newPegSlot.translate([pegDiameter/2, 0, 0]);
        var newPeg = difference(newPegBase, newPegSlot);
        newPeg = newPeg.translate([loomDiameter/2, 0, circleHeight]);
        pegs = pegs.rotateZ(360/numPegs);
        pegs = union(pegs, newPeg);
    }

    // Make the starting peg
    var startingPegRound = cylinder({r:startPegDiameter/2, h:startPegLength+(circleThickness/2), center:true});
    startingPegRound = startingPegRound.rotateX(90);
    var startingPegFlat = cube({center:true, size:[startPegDiameter,startPegLength+(circleThickness/2),startPegDiameter]});
    startingPegFlat = startingPegFlat.translate([0,0,-startPegDiameter/2]);
    var startingPeg = difference(startingPegRound, startingPegFlat);
    startingPeg = startingPeg.translate([0,loomDiameter/2+startPegLength/2+circleThickness/4,0]);

    // Combine the parts:
    return union(ring, pegs, startingPeg);
}
