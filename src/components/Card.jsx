const Card = (props) => {
    return (
        <div className="Card">
            <h3>{props.descrip}</h3>
           <h2>{props.metric}</h2> 
        </div>
    );
}

export default Card;