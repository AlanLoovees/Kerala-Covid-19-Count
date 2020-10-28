import React from "react";

function RenderDistrict({ districtCount }) {
    if(districtCount != null) {
        return Object.keys(districtCount).map((district) => {
            if (district === "Other State") return null;
            else {
                return (
                    <div className="state-count" key={district}>
                        {district}: {districtCount[district].delta.confirmed}
                        <br />
                    </div>
                );
            }
        })
    }
    else {
        return <div>Loading...</div>;
    }
}

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stateCount: null,
            districtCount: null,
            hasErrors: null
        };
    }

    componentDidMount() {

        fetch("https://api.covid19india.org/data.json")
        .then(response => response.json())
        .then(data => this.setState({ stateCount: data.statewise[7] }));

        fetch("https://api.covid19india.org/state_district_wise.json")
        .then(res => res.json())
        .then(data => this.setState({ districtCount: data.Kerala.districtData}));
    }

    render() {
        return (
            <div>
                <h1>Kerala Covid Numbers</h1>
                <div>
                    <div className="count">
                        Total New Cases:{" "}
                        {JSON.stringify(
                            this.state.stateCount
                                ? this.state.stateCount.deltaconfirmed
                                : 0
                        )}
                    </div>
                </div>
                <div>
                    <div>
                        <RenderDistrict districtCount={this.state.districtCount}/>
                    </div>
                </div>
                <h4>Last Updated:{" "}{JSON.stringify(this.state.stateCount? this.state.stateCount.lastupdatedtime: 0)}</h4>
            </div>
        );
    }
}

export default Main;