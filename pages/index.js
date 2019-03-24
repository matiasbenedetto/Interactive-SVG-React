import Layout from '../components/layout/Layout'
import Paper from '../components/canvas/Paper'

export default function index() {
  return (
    <Layout>
      <style jsx global>{`
          body{
            padding:0;
            margin:0;
          }
      `}</style>
      <div className='draw'>
        <Paper />
      </div>
    </Layout>
  )
}
