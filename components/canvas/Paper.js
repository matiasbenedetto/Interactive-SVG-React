import Parallelogram from '../shapes/Parallelogram';
import { addPoint } from '../../utils/utils';

export default class Paper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            points: [[]],
            isDraggingPoint: false,
            lastSelectedPoint: {}
        };
        this.handleClick = this.handleClick.bind( this );
        this.handleMouseMove = this.handleMouseMove.bind( this );
        this.toggleIsDraggingPoint = this.toggleIsDraggingPoint.bind( this );
        this.updateLastSelectedPoint = this.updateLastSelectedPoint.bind( this );
        this.updatePoint = this.updatePoint.bind( this );
    }

    handleClick( event ){
        if ( !this.state.isDraggingPoint ){
            const newPoints = addPoint(
                this.state.points,
                {
                    x: event.pageX,
                    y: event.pageY,
                    size: 11,
                    fill: "red",
                    print: true 
                }
            );
            this.setState({
                points: newPoints
            });
        }else{
            this.setState({
                isDraggingPoint: false
            })
        }
    }

    handleMouseMove( event ){
        const { isDraggingPoint, lastSelectedPoint } = this.state;
        if ( isDraggingPoint ){
            const x= event.pageX;;
            const y= event.pageY;
            this.updatePoint( lastSelectedPoint, { x, y } );
            this.updateLastSelectedPoint( x, y );
        }
    }

    toggleIsDraggingPoint(){
        this.setState({
            isDraggingPoint: true
        })
    }

    updateLastSelectedPoint( x, y ){
        this.setState({
            lastSelectedPoint: { x, y }
        })
    }
    
    updatePoint( lastPoint, updatedPoint ){
        let newPoints = this.state.points;
        newPoints.forEach( polygon => {
            polygon.forEach( point => {
                if ( point.x === lastPoint.x  &&  point.y === lastPoint.y ){
                    point.x = updatedPoint.x;
                    point.y = updatedPoint.y;
                }
            } )
        } );
        
        this.setState({
            points: newPoints 
        })
    }
        

    render(){
        const { points, mouseX, mouseY } = this.state;
        return(
            <div
                className="paper"
                onClick={ this.handleClick }
                onMouseMove={ this.handleMouseMove }
            >
                <style jsx>
                    {`
                        .paper {
                            background-color: #111122;
                            height: 100vh;
                            width: 100%;
                            display:flex;
                        }
                        .paper svg{
                            width: 100%;
                        }

                    `}
                </style>
                <svg>
                    { points.map( ( group, i ) => (
                        <Parallelogram
                            points={ group }
                            key={ i }
                            mouseX={ mouseX }
                            mouseY={ mouseY }
                            toggleIsDraggingPoint={ this.toggleIsDraggingPoint }
                            updatePoint={ this.updatePoint }
                            updateLastSelectedPoint={ this.updateLastSelectedPoint }
                        />
                    ) ) }                
                </svg>
            </div>
        )
    }
}