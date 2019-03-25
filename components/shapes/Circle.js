import PropTypes from 'prop-types'

export default class Circle extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (event) {
    const { id, parentId, draggable, toggleIsDraggingPoint, updateLastSelectedPoint } = this.props
    if (draggable) {
      toggleIsDraggingPoint()
      updateLastSelectedPoint(id, parentId)
    } else {
      event.preventDefault()
    }
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
                            cursor: ${draggable ? 'grab' : 'auto'};
                            pointer-events: ${draggable ? 'auto' : 'none'};
                        }
                        text{
                            font-family: Sans-Serif;
                            font-size: 10px;
                            pointer-events: none;
                            user-select: none;
                        }
                `}</style>
        <circle
          cx={x}
          cy={y}
          r={size}
          fill={fill}
          stroke={stroke}
          className='circle'
          onMouseDown={this.handleMouseDown}
        />
        <text x={x} y={y} fill={fill} transform={`translate( ${size + 10} )`}>{ `x:${~~x}, y:${~~y} ` }</text>
      </React.Fragment>
    )
  }
}

Circle.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  draggable: PropTypes.bool,
  toggleIsDraggingPoint: PropTypes.func,
  updateLastSelectedPoint: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  centered: PropTypes.bool
}
