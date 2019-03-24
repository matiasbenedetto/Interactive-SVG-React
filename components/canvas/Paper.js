import Parallelogram from '../shapes/Parallelogram'

export default class Paper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      points: [[]],
      isDraggingPoint: false,
      lastSelectedPoint: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.toggleIsDraggingPoint = this.toggleIsDraggingPoint.bind(this)
    this.updateLastSelectedPoint = this.updateLastSelectedPoint.bind(this)
    this.updatePoint = this.updatePoint.bind(this)
    this.erasePaper = this.erasePaper.bind(this)
  }

  addPoint (points, pointToAdd) {
    let newPoints = points.slice()
    let lastGroupLength = newPoints[ points.length - 1 ].length

    if (lastGroupLength < 3) {
      newPoints[ points.length - 1 ].push(pointToAdd)
      lastGroupLength++
    }

    if (lastGroupLength === 3) {
      const calculatedCoords = this.getParallelogramLastPointCoords(newPoints[ points.length - 1 ])
      newPoints[ points.length - 1 ].push({ ...calculatedCoords, size: 11, print: false })
      lastGroupLength++
    } else if (lastGroupLength === 4) {
      newPoints.push([ pointToAdd ])
    }

    return newPoints
  }

  getParallelogramLastPointCoords (points) {
    const x = points[0].x + (points[2].x - points[1].x)
    const y = points[0].y + (points[2].y - points[1].y)
    return { x, y }
  }

  handleClick (event) {
    if (!this.state.isDraggingPoint) {
      const newPoints = this.addPoint(
        this.state.points,
        {
          x: event.pageX,
          y: event.pageY,
          size: 11,
          fill: 'red',
          print: true
        }
      )
      this.setState({
        points: newPoints
      })
    } else {
      this.setState({
        isDraggingPoint: false
      })
    }
  }

  handleMouseMove (event) {
    const { isDraggingPoint, lastSelectedPoint } = this.state
    if (isDraggingPoint) {
      const x = event.pageX
      const y = event.pageY
      this.updatePoint(lastSelectedPoint, { x, y })
    }
  }

  toggleIsDraggingPoint () {
    this.setState({
      isDraggingPoint: true
    })
  }

  updateLastSelectedPoint (id, parentId) {
    this.setState({
      lastSelectedPoint: { id, parentId }
    })
  }

  updatePoint (ids, newCoords) {
    const { id, parentId } = ids
    let newPoints = this.state.points
    newPoints[parentId][id].x = newCoords.x
    newPoints[parentId][id].y = newCoords.y
    if (newPoints[parentId].length === 4) {
      const calculatedPoint = this.getParallelogramLastPointCoords(newPoints[parentId])
      newPoints[parentId][3].x = calculatedPoint.x
      newPoints[parentId][3].y = calculatedPoint.y
    }
    this.setState({
      points: newPoints
    })
  }

  erasePaper (event) {
    event.stopPropagation()
    if (window.confirm('Really you want to erase your draw?')) {
      this.setState({ points: [[]] })
    }
  }

  render () {
    const { points, mouseX, mouseY } = this.state
    return (
      <div
        className='paper'
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
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
                        .controls{
                            position: absolute;
                            bottom:15px;
                            margin-left: auto;
                            margin-right: auto;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                        .controls button{
                            background: transparent;
                            white-space: nowrap;
                            border: 2px solid cyan;
                            color: cyan;
                            border-radius: 15px;
                            outline: none;
                            padding: 5px 10px;
                            cursor: pointer;
                        }
                    `}
        </style>
        <svg>
          { points.map((group, i) => (
            <Parallelogram
              points={group}
              key={i}
              id={i}
              mouseX={mouseX}
              mouseY={mouseY}
              toggleIsDraggingPoint={this.toggleIsDraggingPoint}
              updatePoint={this.updatePoint}
              updateLastSelectedPoint={this.updateLastSelectedPoint}
            />
          )) }
        </svg>
        <div className='controls'>
          <button onClick={this.erasePaper}>Erase Content</button>
        </div>
      </div>
    )
  }
}
