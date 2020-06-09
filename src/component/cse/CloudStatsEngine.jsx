import React, {Component} from 'react'
import ApiService from "../../service/ApiService";


class CloudStatsEngine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            originalInput: [],
            percentile: 75,
            guavaDepth: "0",
            guavaGammaRay: "0",
            guavaRhob: "0",
            apacheDepth: "0",
            apacheGammaRay: "0",
            apacheRhob: "0"
        };
    }

    componentDidMount() {
        ApiService.getDefaultData(this.state.percentile)
            .then(res => {
                console.log(res.data);
                this.updateView(res);
            })
    }

    markIgnored(input) {
        if (input === "-999.25") {
            return input + " (ignored)"
        }  else {
            return input
        }
    }

    updateView(res) {
        this.setState({
            guavaDepth: res.data.guavaCalculatedPercentile.depth,
            guavaGammaRay: res.data.guavaCalculatedPercentile.gammaRay,
            guavaRhob: res.data.guavaCalculatedPercentile.rhob,
            apacheDepth: res.data.apacheCalculatedPercentile.depth,
            apacheGammaRay: res.data.apacheCalculatedPercentile.gammaRay,
            apacheRhob: res.data.apacheCalculatedPercentile.rhob,
            originalInput: res.data.originalInput
        });
    }

    uploadFile() {
        if (!this.state.selectedFile) {
            alert("Please attach an CSV file");
            return
        }
        if (this.state.percentile < 0 || this.state.percentile > 100) {
            alert("Percentile should be between 0 and 100");
            return
        }
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        ApiService.upload(formData, this.state.percentile)
            .then(res => {
                console.log(res.data);
                this.updateView(res);
            })
    }

    onFileChanged = (e) => {
        e.preventDefault();
        let fileExt = e.target.files[0].name.split('.').pop();
        if (fileExt !== 'csv') {
            alert("Only csv files are supported.");
            return
        }
        this.setState({
            selectedFile: e.target.files[0]
        });
    };

    onPercentileChanged = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group files color">
                                <label>Choose Your CSV file with geometric model: </label>
                                <input type="file" className="form-control" name="file"
                                       onChange={this.onFileChanged}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Specify percentile:</label>
                        <input type="number" placeholder="percentile" name="percentile" className="form-control" value={this.state.percentile} onChange={this.onPercentileChanged}/>
                    </div>
                    <button className="btn btn-danger" style={{width: '100px'}} onClick={() => this.uploadFile()}> Upload CSV
                    </button>
                    <form>
                        <div className="form-group">
                            <label>Guava calculated DEPTH</label>
                            <input type="text" placeholder="Guava calculated DEPTH" name="depth" className="form-control"
                                   readOnly="{true}"
                                   value={this.state.guavaDepth}/>
                        </div>
                        <div className="form-group">
                            <label>Guava calculated Gamma Ray</label>
                            <input type="text" placeholder="Guava calculated Gamma Ray" name="gammaRay" className="form-control"
                                   readOnly="{true}"
                                   value={this.state.guavaGammaRay}/>
                        </div>
                        <div className="form-group">
                            <label>Guava calculated RHOB</label>
                            <input type="text" placeholder="Guava calculated RHOB" name="rhob" className="form-control"
                                   readOnly="{true}"
                                   value={this.state.guavaRhob}/>
                        </div>
                    </form>

                    <form>
                        <div className="form-group">
                            <label>Apache calculated DEPTH</label>
                            <input type="text" placeholder="Apache calculated DEPTH" name="depth" className="form-control"
                                   readOnly="{true}"
                                   value={this.state.apacheDepth}/>
                        </div>
                        <div className="form-group">
                            <label>Apache calculated Gamma Ray</label>
                            <input type="text" placeholder="Apache calculated Gamma Ray" name="gammaRay" className="form-control"
                                   readOnly="{true}"
                                   value={this.state.apacheGammaRay}/>
                        </div>
                        <div className="form-group">
                            <label>Apache calculated RHOB</label>
                            <input type="text" placeholder="Apache calculated RHOB" name="rhob" className="form-control"
                                   readOnly="{true}"
                                   value={this.state.apacheRhob}/>
                        </div>
                    </form>

                </div>

                <h3 className="text-center">Original CSV</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>DEPTH</th>
                        <th>GR</th>
                        <th>RHOB</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.originalInput.map(
                            geometricModel =>
                                <tr key={geometricModel.depth}>
                                    <td>{this.markIgnored(geometricModel.depth)}</td>
                                    <td>{this.markIgnored(geometricModel.gammaRay)}</td>
                                    <td>{this.markIgnored(geometricModel.rhob)}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default CloudStatsEngine;