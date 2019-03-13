export function addPoint( points, pointToAdd ){
    let newPoints = points.slice();
    let lastGroupLength = newPoints[ points.length -1 ].length;

    if ( lastGroupLength < 3 ){
        newPoints[ points.length -1 ].push( pointToAdd );
        lastGroupLength ++;
    }
    
    if ( lastGroupLength === 3 ){
        newPoints[ points.length -1 ].push( { x: 10, y: 10, size: 11, print: false } );
        lastGroupLength ++;
    }
    
    if ( lastGroupLength === 4 ) {
        newPoints.push( [ pointToAdd ] );
    }

    return newPoints
}