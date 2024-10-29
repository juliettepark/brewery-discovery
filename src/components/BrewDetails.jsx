
const BrewDetails = (props) => {
    let { brewID } = useParams();

    return (
        <h2>This is page for {brewID}</h2>
    );
}