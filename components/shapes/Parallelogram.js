import Circle from './Circle';
import { getRadiusFromArea } from '../../utils/utils';
import uuidv4 from  'uuid/v4';

export default class Parallelogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: this.props.points
        }
        this.updatePoint = this.updatePoint.bind( this );
    }

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
        if ( points.length === 4 ){ 
            const b = Math.abs( points[0].x - points[2].x ); 
            const h = Math.abs( points[0].y - points[2].y );
            return b * h;
        }else{
            return undefined;
        }
    }

    updatePoint( lastPoint, newPoint ){
        const newPoints = this.state.points.map( point => {
            if ( point.x === lastPoint.x  &&  point.y === lastPoint.y ){
                point.x = newPoint.x;
                point.y = newPoint.y;
            } 
            return point;
        } );

        console.log( "newPoints: ", newPoints );

        this.setState({
            points: newPoints 
        })
    }    

    render(){
        const { mouseX, mouseY } = this.props;
        const { points } = this.state;
        const coords = this.getPolygonCoordsString( points );
        const centeredCircle = this.getCenteredCircle( points );
        return(
            <React.Fragment>
                <polygon points={ coords } fill="transparent" stroke="blue" /> 
                { points.map( point => (
                    point.print && <Circle {...point} updatePoint={ this.updatePoint } key={uuidv4()} mouseX={ mouseX } mouseY={ mouseY } />
                ) ) };
                { centeredCircle }               
            </React.Fragment>
        )
    }
} 