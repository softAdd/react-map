import React, { Component, Fragment } from 'react';

import PointList from './yandex_map/PointList';
import YMap from './yandex_map/YMap';

class YandexMap extends Component {
    state = {
        marks: [],
    }

    addMark = point => {
        const mark = {
            title: point,
            geometry: [],
        }
        this.setState({
            marks: [...this.state.marks, mark]
        });
    }

    removeMark = index => {
        let arrPoints = this.state.marks.slice();
        arrPoints.splice(index, 1);
        this.setState({
            marks: arrPoints,
        });
    }

    setMarkGeometry = (index, geometry) => {
        let arrMarks = this.state.marks.slice();
        arrMarks[index].geometry = geometry;
        this.setState({
            marks: arrMarks,
        });
    }

    getMarks = () => {
        const marks = this.state.marks.slice();
        return marks;
    }

    render() {
        return (
            <Fragment>
                <PointList 
                    addMark={this.addMark}
                    removeMark={this.removeMark}
                />
                <YMap 
                    marks={this.getMarks()}
                    mapDefaultState={{ center: [55.75, 37.57], zoom: 11 }}
                    mapWidth={'400px'}
                    mapHeight={'400px'}
                    setMarkGeometry={this.setMarkGeometry}
                />
            </Fragment>
        )
    }
}

export default YandexMap;