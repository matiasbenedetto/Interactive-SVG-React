import Circle from './Circle';
import { getRadiusFromArea } from '../../utils/utils';

export default class Parallelogram extends React.Component {

    getPolygonCoordsString( points ){
        let coordPoints = "";
        points.forEach( point => {
            coordPoints += `${point.x}, ${point.y} `;
        } )
        return coordPoints;
    }

    getCenter( points ){
        const x = ( points[0].x + points[2].x ) / 2;
        const y = ( points[0].y + points[2].y) / 2;
        return { x, y }
    }

    getCenteredCircle ( points ){
        if ( points.length === 4 ){ 
            const center = this.getCenter( points );
            const area = this.getArea( points );
            const radius = getRadiusFromArea( area );
            const x = center.x + radius / 2;
            const y = center.y + radius / 2;
            return ( <Circle x={ x } y={ y }  fill="transparent" stroke="yellow" size={ radius } stroke-width="3" /> );
        }
        return null;
    }

    getArea( points ){
        console.log(points);
        if ( points.length === 4 ){ 
            const b = Math.abs( points[0].x - points[2].x ); 
            console.log("b ", b);
            const h = Math.abs( points[0].y - points[2].y );
            console.log("h ", h);
            console.log( "Area: ",  b * h );
            return b * h;
        }else{
            return undefined;
        }
    }

    

    render(){
        const { points } = this.props;
        const coords = this.getPolygonCoordsString( points );
        const centeredCircle = this.getCenteredCircle( points );
        console.log ( this.getArea( points ) );
        return(
            <React.Fragment>
                <polygon points={ coords } fill="transparent" stroke="blue" /> 
                { points.map( point => (
                    point.print && <Circle {...point} />
                ) ) };
                { centeredCircle }               
            </React.Fragment>
        )
    }
} 