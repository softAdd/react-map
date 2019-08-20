import React, { Component, Fragment } from 'react';

import PointList from './yandex_map/PointList';
import YMap from './yandex_map/YMap';

class YandexMap extends Component {
    state = {
        marks: [],
    }

    addMark = mark => {
        this.setState({
            marks: [...this.state.marks, mark]
        })
    }

    removeMark = index => {
        let arrPoints = this.state.marks.slice();
        arrPoints.splice(index, 1);
        this.setState({
            marks: arrPoints,
        })
    }

    render() {
        return (
            <Fragment>
                <PointList addMark={this.addMark} removeMark={this.removeMark} />
                <YMap marks={this.state.marks} />
            </Fragment>
        )
    }
}

export default YandexMap;