import Paper from './Paper'

const pointToAdd = {
  x: 300,
  y: 400,
  size: 11,
  fill: 'red',
  print: true
}

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

describe('Add points in paper to create a parallelogram', () => {
  it('adds a point to an empty matrix', () => {
    const paper = new Paper()
    const points = [[]]
    const data = paper.addPoint(points, pointToAdd)
    expect(data).toEqual([[pointToAdd]])
  })

  it('adds a point to a matrix with 2 points', () => {
    const paper = new Paper()
    const points = [[
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
      }
    ]]
    const data = paper.addPoint(points, pointToAdd)
    expect(data).toEqual([parallelogramPoints])
  })

  it('adds a point to a matrix with a complete group of 4 points', () => {
    const paper = new Paper()
    const points = [parallelogramPoints]
    const data = paper.addPoint(points, pointToAdd)
    expect(data).toEqual([parallelogramPoints, [pointToAdd]])
  })
})

describe('Given 3 points it returns the calculated last point to create a parallelogram', () => {
  it('receives 3 points as a paremeter and returns the remaining point', () => {
    const paper = new Paper()
    const points = [
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
      }
    ]
    const data = paper.getParallelogramLastPointCoords(points)
    expect(data).toEqual({ x: 200, y: 300 })
  })
})
