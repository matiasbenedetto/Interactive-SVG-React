export function addPoint( points, pointToAdd ){
    let newPoints = points.slice();
    let lastGroupLength = newPoints[ points.length -1 ].length;

    if ( lastGroupLength < 3 ){
        newPoints[ points.length -1 ].push( pointToAdd );
        lastGroupLength ++;
    }
    
    if ( lastGroupLength === 3 ){
        const calculatedCoords = getParallelogramLastPointCoords( newPoints[ points.length -1 ] );
        newPoints[ points.length -1 ].push( { ...calculatedCoords, size: 11, print: false } );
        lastGroupLength ++;
    }else if ( lastGroupLength === 4 ) {
        newPoints.push( [ pointToAdd ] );
    }

    return newPoints
}


export function getParallelogramLastPointCoords( points ){
    const x = points[0].x + (points[2].x - points[1].x); 
    const y = points[0].y + (points[2].y - points[1].y);
    return { x, y }
}

export function getRadiusFromArea ( area ){
    const radius = Math.sqrt( area / Math.PI );
    return radius;
}