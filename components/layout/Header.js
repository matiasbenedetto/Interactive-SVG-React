import Link from 'next/link'

export default function Header () {
    return (
        <header>
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
                a{
                background: transparent;
                padding: 1px 10px;
                border: 1px solid white;
                outline: none;
                color: white;
                font-size: 10px;
                margin-top:10px;
                cursor: pointer;
                border-radius: 6px;
                text-decoration:none;
                margin-right:10px;
                }
            `}</style>
        
            <h1>Shapes</h1>
            <h2>A React test app made by <b>Matias Benedetto</b></h2>
            <Link href="/">
                <a>App</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
        </header>
    )
}
