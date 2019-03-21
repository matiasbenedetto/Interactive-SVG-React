export default class Circle extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (event) {
    const { toggleIsDraggingPoint, x, y, updateLastSelectedPoint } = this.props
    toggleIsDraggingPoint()
    updateLastSelectedPoint(x, y)
  }

  render () {
    let { x, y, size, fill, stroke, draggable, centered } = this.props
    if (centered) {
      x = x - size / 2
      y = y - size / 2
    }
    return (
      <React.Fragment>
        <style jsx>{`
                        .circle {
                            cursor: pointer;
                        }
                        text{
                            font-family: Sans-Serif;
                            font-size: 10px;
                        }
                `}</style>
        <circle
          cx={x}
          cy={y}
          r={size}
          fill={fill}
          stroke={stroke}
          className='circle'
          onMouseDown={draggable ? this.handleMouseDown : () => {}}
        />
        <text x={x} y={y} fill={fill} transform={`translate( ${size + 10} )`}>{ `x:${~~x}, y:${~~y} ` }</text>
      </React.Fragment>
    )
  }
}
