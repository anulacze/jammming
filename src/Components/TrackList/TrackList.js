import React from 'react';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((object) => {
                    return <Track key={object.id} informacjeOUtworze={object} onAddDalejDalej={this.props.onAddDalej} isRemoval={this.props.isRemoval} onRemoveDalejDalej={this.props.onRemoveDalej} />
                })}
            </div>
        )
    }
}