import Parallelogram from '../shapes/Parallelogram';
import { addPoint, getParallelogramLastPointCoords } from '../../utils/utils';

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
        this.erasePaper = this.erasePaper.bind( this );
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
        let pointFound = false;
        for ( let polygon of newPoints )  {
            for ( let point of polygon ) {
                if ( point.x === lastPoint.x  &&  point.y === lastPoint.y ){
                    point.x = updatedPoint.x;
                    point.y = updatedPoint.y;
                    pointFound = true;
                    break;
                }
            }
            if ( polygon.length === 4 ){
                const calculatedPoint = getParallelogramLastPointCoords( polygon );
                polygon[3].x = calculatedPoint.x;
                polygon[3].y = calculatedPoint.y;
            }
            if ( pointFound ){
                break;
            }
        };
        this.setState({
            points: newPoints 
        })
    }

    erasePaper( event ){
        event.stopPropagation();
        if ( window.confirm( 'Really you want to erase your draw?' ) ){
            this.setState( { points: [[]] } );
        }
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
                        .controls{
                            position: absolute;
                            bottom:15px;
                            margin-left: auto;
                            margin-right: auto;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                        .controls button{
                            background: transparent;
                            white-space: nowrap;
                            border: 2px solid cyan;
                            color: cyan;
                            border-radius: 15px;
                            outline: none;
                            padding: 5px 10px;
                            cursor: pointer;
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
                <div className="controls">
                        <button onClick={ this.erasePaper }>Erase Content</button>
                </div>
            </div>
        )
    }
}