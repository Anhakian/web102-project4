
const CatImage = ( {image, name, desc, origin, lifespan, weight, onClickFunction} ) => {
    return (
        <div>
            <img src={image} alt={name} height="300px" weight="300px"/>
            <h3>{name}</h3>
            <div>{desc}</div>
            <div>
                <button onClick={() => onClickFunction(origin)}>{origin}</button>
                <button onClick={() => onClickFunction(lifespan)}>{lifespan}</button>
                <button onClick={() => onClickFunction(weight)}>{weight}</button>
            </div>
        </div>
    )
}

export default CatImage;