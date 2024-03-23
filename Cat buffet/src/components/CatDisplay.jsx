import { useState , useEffect } from "react";
import CatImage from "./CatImage";
import BanList from "./BanList";

const CatDisplay = () => {
    const [currentCat, setCurrentCat] = useState(null);
    const [banList, setBanList] = useState([]);
    const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

    useEffect(() => {
        callAPI();
    }, []);

    useEffect(() => {
        console.log("Updated banList:", banList);
    }, [banList]);
    
    const callAPI = async () => {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${ACCESS_KEY}`);
        const json = await response.json();
        const url = json[0].url;
        const breed = json[0].breeds[0];
        const cat = {
            image: url,
            name: breed.name,
            desc: breed.description,
            origin: breed.origin,
            lifespan: breed.life_span,
            weight: breed.weight.imperial,
        };

        const catAttributes = [cat.origin, cat.lifespan, `${cat.weight} lbs`];
        if (catAttributes.some(attribute => banList.includes(attribute))) {
            callAPI();
        } else {
            setCurrentCat(cat);
        }

        setCurrentCat(cat);
    }

    const handleInfoClick = (attributeValue) => {
        const bannedAttribute = `${attributeValue}`;
        if (!banList.includes(bannedAttribute)) {
            setBanList([...banList, bannedAttribute]);
        }
    }

    const removeItemFromBanList = (attribute) => {
        setBanList(banList.filter((item) => item !== attribute));
    }
    
    return (
        <div className="container">
            <div className="display">  
                {currentCat && (
                <CatImage 
                    image={currentCat.image}
                    name={currentCat.name}
                    desc={currentCat.desc}
                    origin={currentCat.origin}
                    lifespan={currentCat.lifespan}
                    weight={currentCat.weight}
                    onClickFunction={handleInfoClick}
                />
                )}
                
                <div>
                    <button onClick={callAPI}>Shuffle</button>
                </div>
                
            </div>
            
            <div className="ban-list">
                <BanList banList={banList} handleClick={removeItemFromBanList} />
            </div>
        </div>
        
    )
}

export default CatDisplay;