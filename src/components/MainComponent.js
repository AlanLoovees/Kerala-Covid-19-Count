import React from "react";
import 'materialize-css';
import { Card } from 'react-materialize';

function RenderDistrict({ districtCount }) {
    if(districtCount != null) {
        var colors = ['#1abc9c', '#16a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#f1c40f', '#f39c12', '#e67e22', '#d35400', '#e74c3c', '#c0392b'];
        var districts = ['ALP', 'EKM', 'IDK', 'KNR', 'KGD', 'KLM', 'KTM', 'KZD', 'MLP', 'PKD', 'PTM', 'TVM', 'TSR', 'WYD']
        var i = 0;
        return Object.keys(districtCount).map((district) => {
            if (district === "Other State") return null;
            else {
                return (
                    <div className="col s12 m6 l2" key={district}>
                        <Card
                            className="state-count"
                            style={{ backgroundColor: colors[i] }}
                        >
                            <div className="card-title">{districts[i++]}</div>
                            <div>{districtCount[district].delta.confirmed}</div>
                        </Card>
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
        .then(data => this.setState({ stateCount: data.statewise[6] }));

        fetch("https://api.covid19india.org/state_district_wise.json")
        .then(res => res.json())
        .then(data => this.setState({ districtCount: data.Kerala.districtData}));
    }

    render() {
        return (
            <div>
                <div className="web-title">Kerala Covid Numbers</div>
                <div className="row">
                    <div className="col s12 m6 l4 offset-m3 offset-l4">
                        <Card className="confirmed">
                            <div className="card-title">New Confirmed</div>
                            <div className="count">
                                {JSON.stringify(
                                    this.state.stateCount
                                        ? +this.state.stateCount.deltaconfirmed
                                        : 0
                                )}
                            </div>
                        </Card>
                    </div>
                </div>

                <div>
                    <div className="row">
                        <RenderDistrict
                            districtCount={this.state.districtCount}
                        />
                    </div>
                </div>
                <div className="updated">
                    Last Updated:{" "}
                    {JSON.stringify(
                        this.state.stateCount
                            ? this.state.stateCount.lastupdatedtime
                            : 0
                    )}
                </div>
            </div>
        );
    }
}

export default Main;