import Circle from './Circle'

export default class Parallelogram extends React.Component {
  getPolygonCoordsString (points) {
    let coordPoints = ''
    points.forEach(point => {
      coordPoints += `${point.x}, ${point.y} `
    })
    return coordPoints
  }

  getCenter (points) {
    const x = (points[0].x + points[2].x) / 2
    const y = (points[0].y + points[2].y) / 2
    return { x, y }
  }

  getCenteredCircle (points, area) {
    if (points.length === 4) {
      const center = this.getCenter(points)
      const radius = this.getRadiusFromArea(area)
      const x = center.x + radius / 2
      const y = center.y + radius / 2
      return (<Circle x={x} y={y} fill='transparent' stroke='yellow' size={radius} stroke-width='3' draggable={false} centered />)
    }
    return null
  }

  getDistance (point1, point2) {
    const a = point1.x - point2.x
    const b = point1.y - point2.y
    return Math.sqrt(a * a + b * b)
  }

  getArea (points) {
    if (points.length === 4) {
      const b = this.getDistance(points[0], points[1])
      const h = this.getDistance(points[1], points[2])
      return ~~(b * h)
    } else {
      return undefined
    }
  }

  getRadiusFromArea (area) {
    const radius = Math.sqrt(area / Math.PI)
    return radius
  }

  render () {
    const { points, toggleIsDraggingPoint, updateLastSelectedPoint } = this.props
    const coords = this.getPolygonCoordsString(points)
    const area = this.getArea(points)
    const centeredCircle = this.getCenteredCircle(points, area)
    return (
      <React.Fragment>
        <style jsx>{`
                    polygon{
                        pointer-events: none;
                    }
                    text{
                        font-family: Sans-Serif;
                        font-size: 10px;
                        user-select: none;
                    }
                `}</style>
        <polygon points={coords} fill='transparent' stroke='blue' />
        { points.map((point, i) => (
          point.print &&
          <React.Fragment key={i}>
            <Circle
              {...point}
              updatePoint={this.updatePoint}
              toggleIsDraggingPoint={toggleIsDraggingPoint}
              updateLastSelectedPoint={updateLastSelectedPoint}
              draggable
            />
            { (i === 0 && points.length === 4) &&
            <text x={point.x} y={point.y} fill='blue' transform={`translate( -10, -20 )`} >Area: { area }</text>
            }
          </React.Fragment>
        )) };

        { centeredCircle }
      </React.Fragment>
    )
  }
}
