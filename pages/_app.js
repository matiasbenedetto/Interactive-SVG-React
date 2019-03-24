import React from 'react'
import App, { Container } from 'next/app'
import Header from '../components/layout/Header'

class ShapesApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default ShapesApp