import { useParams } from "react-router-dom";

interface RouteParams {
  id: string
}

function GameDetails() {
  const params = useParams<RouteParams>();
  console.log("Rendering MyComponent...");
  console.log(params.id);
  return (
    <div></div>
  );
};
/*
class GameDetails extends React.Component<RouteParams> {
  render() {
    console.log(this.props); // Prints all props including routing-related
    console.log(this.props.match.params.id); // Prints 'abc'
    return <div></div>
  }
}
*/

export default GameDetails;