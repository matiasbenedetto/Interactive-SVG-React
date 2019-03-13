import Paper from '../components/canvas/Paper';
import Circle from '../components/shapes/Circle';

export default class Index extends React.Component{
  render(){
    return(
      <div>
        <style jsx global>{`
            body{
              padding:0;
              margin:0;
            }
        `}</style>
        <div className="paper">
          <Paper>
          </Paper> 
        </div>
      </div>
    )
  }
}
