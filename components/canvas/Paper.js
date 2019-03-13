import Circle from '../shapes/Circle';

export default class Paper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            points: [[]]
        };
        this.handleClick = this.handleClick.bind( this );
    }

    addPoint( points, pointToAdd ){
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

    handleClick( event ){
        const newPoints = this.addPoint(
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