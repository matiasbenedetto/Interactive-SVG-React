export default class Circle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({ isDragging: true });
        document.addEventListener('mousemove', this.handleMouseMove.current);
    }

    handleMouseUp(event){
        event.stopPropagation();
        console.log("mouse up");
        this.setState({ isDragging: false });
        document.removeEventListener('mousemove', this.handleMouseMove.current);
    }

    
    handleMouseMove(event){
        console.log("mouse move x:", event.pageX);
        console.log("mouse move y:", event.pageY);
        
        if ( this.state.isDragging ){
            //this.props.updatePoint( { x: this.state.x, y: this.state.y }, { x: event.pageX, y: event.pageY } );
            this.setState({ x: event.pageX, y: event.pageY });
        }
    }
    

    render(){
        let { x, y } = this.props;
        const { size, fill, isDragging } = this.state;
        x = x - size / 2;
        y = y - size / 2;
        return(
            <circle
                cx={ x }
                cy={ y }
                r={ size }
                { ...this.props }
                draggable="true"
                className="circle"
                draggable="true"
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