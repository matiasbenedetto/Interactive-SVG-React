export default class Circle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size,
            fill: this.props.fill,
        }
        this.handleMouseDown = this.handleMouseDown.bind( this );
    }

    handleMouseDown(event){
        const { toggleIsDraggingPoint, x, y, updateLastSelectedPoint } = this.props;
        toggleIsDraggingPoint();
        updateLastSelectedPoint( x, y );
    }
    
    render(){
        let { x, y } = this.props;
        const { size, fill } = this.state;
        x = x - size / 2;
        y = y - size / 2;
        return(
            <circle
                cx={ x }
                cy={ y }
                r={ size }
                { ...this.props }
                className="circle"
                onMouseDown={ this.handleMouseDown }
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