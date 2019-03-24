import Parallelogram from './Parallelogram'

const parallelogramPoints = [
  {
    x: 100,
    y: 300,
    size: 11,
    fill: 'red',
    print: true
  },
  {
    x: 200,
    y: 400,
    size: 11,
    fill: 'red',
    print: true
  },
  {
    x: 300,
    y: 400,
    size: 11,
    fill: 'red',
    print: true
  },
  {
    x: 200,
    y: 300,
    size: 11,
    print: false
  }
]

describe('Parallelogram geometric calculation', () => {
  it('Receibes an array of coords objects and transform it to a string of coords', () => {
    const parallelogram = new Parallelogram()
    const data = parallelogram.getPolygonCoordsString(parallelogramPoints)
    expect(data).toEqual('100, 300 200, 400 300, 400 200, 300 ')
  })

  it('Receibes two points and returns the distance between them', () => {
    const parallelogram = new Parallelogram()
    const data = parallelogram.getDistance(parallelogramPoints[0], parallelogramPoints[1])
    expect(data).toEqual(141.4213562373095)
  })

  it('Receibes four points cords and returns the area of the parallelogram', () => {
    const parallelogram = new Parallelogram()
    const data = parallelogram.getArea(parallelogramPoints)
    expect(data).toEqual(14142)
  })

  it('Receibes an polygon area and return the radio of a circle', () => {
    const parallelogram = new Parallelogram()
    const data = parallelogram.getRadiusFromArea(14142)
    expect(data).toEqual(67.09350497932843)
  })
})
