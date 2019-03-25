import PropTypes from 'prop-types'

export default class Layout extends React.Component {
  render () {
    const { children } = this.props
    return (
      <main>
          <style jsx global>{`
              body{
                background-color: #111122;
              }
            `}</style>
        {children}
      </main>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
}