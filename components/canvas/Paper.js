import Circle from '../shapes/Circle';
import Parallelogram from '../shapes/Parallelogram';
import { addPoint } from '../../utils/utils';
import uuidv4 from  'uuid/v4';

export default class Paper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            points: [[]]
        };
        this.handleClick = this.handleClick.bind( this );
        this.handleMouseMove = this.handleMouseMove.bind( this );
    }

    handleClick( event ){
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
    }

    handleMouseMove( event ){
        this.setState({
            mouseX: event.clientX,
            mouseY: event.clientY
        });
    }

    render(){
        const { points, mouseX, mouseY } = this.state;
        return(
            <svg className="paper" onClick={ this.handleClick } onMouseMove={ this.handleMouseMove } >
                <style jsx>{`
                    .paper {
                        background-color: #111122;
                        height: 100vh;
                        position: relative;
                        width: 100%;
                    }
                `}</style>
                { points.map( group => (
                    <Parallelogram points={ group } key={uuidv4()} mouseX={ mouseX } mouseY={ mouseY } />
                ) ) }                
            </svg>
        )
    }
}