export default class Circle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
            size: this.props.size,
            fill: this.props.fill,
            isDragging: false
        }
        this.handleClick = this.handleClick.bind( this );
        this.handleMouseDown = this.handleMouseDown.bind( this );
        this.handleMouseUp = this.handleMouseUp.bind( this );
        this.handleMouseMove = this.handleMouseMove.bind( this );
    }

    handleClick(event){
        event.stopPropagation();
    }

    handleMouseDown(event){
        event.stopPropagation();
        console.log("mouse down");
        this.setState({ isDragging: true, fill: "yellow" });
    }

    handleMouseUp(event){
        event.stopPropagation();
        console.log("mouse up");
        this.setState({ isDragging: false, fill: this.props.fill });
    }

    handleMouseMove(event){
        event.stopPropagation();
        console.log("mouse move");
        if ( this.state.isDragging ){
            this.props.updatePoint( { x: this.state.x, y: this.state.y }, { x: event.pageX, y: event.pageY } );
            this.setState({ x: event.pageX, y: event.pageY });
        }
    }

    render(){
        let { x, y, size, fill } = this.state;
        x = x - size / 2;
        //console.log(size);
        y = y - size / 2;
        return(
            <circle
                cx={ x }
                cy={ y }
                r={ size }
                { ...this.props }
                draggable="true"
                onClick={ this.handleClick }
                onMouseDown={ this.handleMouseDown }
                onMouseUp={ this.handleMouseUp }
                onMouseMove={ this.handleMouseMove }
                className="circle"
            >
                <style jsx>{`
                    .circle {
                        cursor: pointer;
                    }
                `}</style>
            </circle>
        )
    }
}