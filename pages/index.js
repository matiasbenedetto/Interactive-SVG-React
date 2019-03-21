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
        <style jsx>{`
            header{
              position: absolute;
              left: 15px;
              top: 15px;
              color: white;
              font-family: Sans-Serif;
              
            }
            h1{
              font-size: 18px;
              margin:0;
            }
            h2{
              font-size: 14px;
              font-weight:300;
              margin:0;
            }
            button{
              background: transparent;
              padding: 1px 10px;
              border: 1px solid white;
              outline: none;
              color: white;
              font-size: 10px;
              margin-top:10px;
              cursor: pointer;
              border-radius: 6px;
            }
        `}</style>
        <header>
            <h1>Shapes</h1>
            <h2>A React test app made by <b>Matias Benedetto</b></h2>
            <button>About</button>
        </header>
        <div className="draw">
          <Paper>
          </Paper> 
        </div>
      </div>
    )
  }
}
