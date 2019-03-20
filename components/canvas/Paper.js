import Parallelogram from '../shapes/Parallelogram';
import { addPoint } from '../../utils/utils';

export default class Paper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            points: [[]],
            isDraggingPoint: false
        };
        this.handleClick = this.handleClick.bind( this );
        this.handleMouseMove = this.handleMouseMove.bind( this );
        this.toggleIsDraggingPoint = this.toggleIsDraggingPoint.bind( this );
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
        this.setState({
            mouseX: event.clientX,
            mouseY: event.clientY
        });
    }

    toggleIsDraggingPoint(){
        console.log("toggleIsDraggingPoint");
        this.setState({
            isDraggingPoint: true
        })
    }

    render(){
        const { points, mouseX, mouseY } = this.state;
        return(
            <div
                className="paper"
                onClick={ this.handleClick }
                onDrag={ this.handleDrag }
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
                            />
                    ) ) }                
                </svg>
            </div>
        )
    }
}