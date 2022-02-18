import { Link } from "react-router-dom"


const Home = () => {
    return (
        <div>
            <div className='homeBackground'>
 <Link to='/'><div className='homeLogo'></div><div className="homeLogo2"></div></Link>
              <h2 className="homeSlogan1">Why just create art?</h2>
              <h2 className="homeSlogan2">When you can wear it!</h2>
              <Link to="/products"><button className="homeInvButton">Shop Now</button></Link>
            </div>
           
        </div>
    )
}

export default Home
