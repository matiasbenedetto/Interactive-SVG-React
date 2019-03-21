import Circle from './Circle'
import { getRadiusFromArea } from '../../utils/utils'

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
      const radius = getRadiusFromArea(area)
      const x = center.x + radius / 2
      const y = center.y + radius / 2
      return (<Circle x={x} y={y} fill='transparent' stroke='yellow' size={radius} stroke-width='3' draggable={false} centered />)
    }
    return null
  }

  getArea (points) {
    if (points.length === 4) {
      const b = Math.abs(points[0].x - points[2].x)
      const h = Math.abs(points[0].y - points[2].y)
      return b * h
    } else {
      return undefined
    }
  }

  render () {
    const { points, toggleIsDraggingPoint, updateLastSelectedPoint } = this.props
    const coords = this.getPolygonCoordsString(points)
    const area = this.getArea(points)
    const centeredCircle = this.getCenteredCircle(points, area)
    return (
      <React.Fragment>
        <style jsx>{`
                    text{
                        font-family: Sans-Serif;
                        font-size: 10px;
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
