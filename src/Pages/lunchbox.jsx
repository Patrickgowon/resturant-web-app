import Lunch from "../component/lunchcart"
import {lunchItems} from "../component/jasonfile"

const Lunchbox = () =>{
    return(
        <div>
            <div className="flex flex-wrap gap-3 justify-center">
            {lunchItems.map((item) =>(
              <Lunch key={item.id} name={item.name} price={item.price}description={item.description}image={item.image}/>
            ))}
            
            </div>
        </div>
    )
}
export default Lunchbox