import Layout from '../components/layout/Layout'

export default function about () {
  return (
    <Layout>
      <style jsx>{`
            .about-page{
                    font-family: Sans-Serif;
                    color:white;
                    padding-top:120px;
                    text-align: center;
              }
              .container{
                max-width:80%;
                margin: auto;
                width: auto;
              }

              a{
               color: cyan;   
              }
            `}</style>
      <div className='about-page'>
        <div className='container'>
          <h2>About the app</h2>
          <p>A simple React app that lets the user select points on the screen to create and modify parallelograms. As the user clicks on the screen a new point of a polygon is drawn. If the user clicks in an already existing point it can be dragged around, and the parallelogram which the point integrates will react accordingly to the movement of one of its vertex.</p>
          <p>The app was built in with a minimalist approach trying to keep it simple, because simpler is better. This motivated the technologies and tools used to construct the app. It is based on React Components, Next to manage in a simple way Babel and WebPack, the components are styles using Styled JSX, the tests are implemented with Jest, and the linting is done with StandardJS.</p>
          <p>The app was developed by Matias Benedetto and is available online at: <a target='_blank' href='https://shapes-test.matiasbenedetto.now.sh'>https://shapes-test.matiasbenedetto.now.sh</a></p>
        </div>
      </div>
    </Layout>
  )
}
