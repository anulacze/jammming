import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        }
        return <button className="Track-action" onClick={this.addTrack}>+</button>;
    }

    addTrack() {
        this.props.onAddDalejDalej(this.props.informacjeOUtworze);
    }

    removeTrack() {
        this.props.onRemoveDalejDalej(this.props.informacjeOUtworze);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.informacjeOUtworze.name}</h3>
                    <p>{this.props.informacjeOUtworze.artist} | {this.props.informacjeOUtworze.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}