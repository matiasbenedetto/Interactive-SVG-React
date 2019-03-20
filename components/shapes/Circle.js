export default class Circle extends React.Component{

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind( this );
    }

    handleMouseDown(event){
        const { toggleIsDraggingPoint, x, y, updateLastSelectedPoint } = this.props;
        toggleIsDraggingPoint();
        updateLastSelectedPoint( x, y );
    }
    
    render(){
        let { x, y, size, fill, stroke, draggable } = this.props;
        x = x - size / 2;
        y = y - size / 2;
        return(
            <circle
                cx={ x }
                cy={ y }
                r={ size }
                fill={ fill }
                stroke={ stroke }
                className="circle"
                onMouseDown={ draggable ? this.handleMouseDown : () => {} }
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