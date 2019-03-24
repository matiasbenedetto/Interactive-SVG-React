import Circle from './Circle'

export default function Parallelogram (props) {
  function getPolygonCoordsString (points) {
    let coordPoints = ''
    points.forEach(point => {
      coordPoints += `${point.x}, ${point.y} `
    })
    return coordPoints
  }

  function getCenter (points) {
    const x = (points[0].x + points[2].x) / 2
    const y = (points[0].y + points[2].y) / 2
    return { x, y }
  }

  function getCenteredCircle (points, area) {
    if (points.length === 4) {
      const center = getCenter(points)
      const radius = getRadiusFromArea(area)
      const x = center.x + radius / 2
      const y = center.y + radius / 2
      return (<Circle x={x} y={y} fill='transparent' stroke='yellow' size={radius} stroke-width='3' draggable={false} centered />)
    }
    return null
  }

  function getDistance (point1, point2) {
    const a = point1.x - point2.x
    const b = point1.y - point2.y
    return Math.sqrt(a * a + b * b)
  }

  function getArea (points) {
    if (points.length === 4) {
      const b = getDistance(points[0], points[1])
      const h = getDistance(points[1], points[2])
      return ~~(b * h)
    } else {
      return undefined
    }
  }

  function getRadiusFromArea (area) {
    const radius = Math.sqrt(area / Math.PI)
    return radius
  }

  const { id, points, toggleIsDraggingPoint, updateLastSelectedPoint } = props
  const coords = getPolygonCoordsString(points)
  const area = getArea(points)
  const centeredCircle = getCenteredCircle(points, area)
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
            id={i}
            parentId={id}
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
