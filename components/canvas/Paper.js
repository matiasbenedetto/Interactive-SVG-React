import Circle from '../shapes/Circle';
import { addPoint } from '../../utils/utils';

export default class Paper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            points: [[]]
        };
        this.handleClick = this.handleClick.bind( this );
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

    render(){
        const { points } = this.state;
        return(
            <svg className="paper" onClick={ this.handleClick }>
                <style jsx>{`
                    .paper {
                        background-color: transparent;
                        height: 700px;
                        position: relative;
                        width: 100%;
                    }
                `}</style>
                { points.map( group => (
                    group.map( item => (
                        item.print && <Circle x={ item.x }  y={ item.y } size={ item.size } fill="red" />
                    ))
                ) ) }
            </svg>
        )
    }
}