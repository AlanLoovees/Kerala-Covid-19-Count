import React from "react";
import 'materialize-css';
import { Card } from 'react-materialize';

function RenderDistrict({ districtCount }) {
    if(districtCount != null) {
        var districts = ['ALP', 'EKM', 'IDK', 'KNR', 'KGD', 'KLM', 'KTM', 'KZD', 'MLP', 'PKD', 'PTM', 'TVM', 'TSR', 'WYD']
        var i = 0, color = '#27ae60', shadow = '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )';
        return Object.values(districtCount).map((data) => {
            if (data[0] === "Date") return null;
            else {
                if (data[1]>900) {
                    color = '#c0392b';
                    shadow = '0 8px 32px 0 rgba( 192, 57, 43, 0.37 )';
                }
                else if (data[1]>600) {
                    color = '#d35400';
                    shadow = '0 8px 32px 0 rgba( 211, 84, 0, 0.37 )';
                }
                else if (data[1]>250) {
                    color = '#f39c12';
                    shadow = '0 8px 32px 0 rgba( 243, 156, 18, 0.37 )';
                }
                else if (data[1]>100) {
                    color = '#f1c40f';
                    shadow = '0 8px 32px 0 rgba( 241, 196, 15, 0.37 )';
                }
                else {
                    color = '#27ae60';
                    shadow = '0 8px 32px 0 rgba( 39, 174, 96, 0.37 )';
                }
                return (
                    <div className="col s6 l2" key={data[0]}>
                        <Card
                            className="state-count"
                            style={{ backgroundColor: color, boxShadow: shadow }}
                        >
                            <div className="card-title">{districts[i++]}</div>
                            <div>{data[1]}</div>
                        </Card>
                    </div>
                );
            }
        })
    }
    else {
        return <div className="center">Loading...</div>;
    }
}

function RenderDate({ districtCount }) {
    if(districtCount!= null) {
        return Object.values(districtCount).map((data) => {
            if (data[0] === "Date") {
                return (
                    <div className="updated" key={data[0]}>
                    Last Updated:{" "}{data[1]}
                    </div>
                )
            }
            else return null;
        })
    }
    else return null
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

        fetch("https://kcc-server.herokuapp.com/fetchStateWise")
        .then(response => response.json())
        .then(data => this.setState({ stateCount: data }))
        .then(() => {
            fetch("https://kcc-server.herokuapp.com/fetchDistrictWise")
            .then(res => res.json())
            .then(data => this.setState({ districtCount: data}));
        });

        
    }

    render() {
        return (
            <div>
                <div className="web-title">Kerala Covid 19</div>
                <div className="row">
                    <div className="col s12 m6 l4 offset-m3 offset-l4">
                        <Card className="confirmed">
                            <div className="card-title">New Confirmed</div>
                            <div className="count">
                                {JSON.stringify(
                                    this.state.stateCount
                                        ? +this.state.stateCount
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
                <div>
                    <RenderDate districtCount={this.state.districtCount}
                    />
                </div>
            </div>
        );
    }
}

export default Main;