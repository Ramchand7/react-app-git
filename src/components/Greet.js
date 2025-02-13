import react, { components } from "react";

class Greet extends react.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.props = props;
    }
    render() {
        return (
            <div>
                <h1>Hello { this.props.name}</h1>
            </div>
        );
    }
}
export default Greet