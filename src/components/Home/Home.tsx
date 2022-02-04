import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link to='/products'><button>Inventory</button></Link>
        </div>
    )
}

export default Home
