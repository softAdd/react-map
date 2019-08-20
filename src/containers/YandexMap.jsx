import React, { Component, Fragment } from 'react';

import PointList from './map_containers/PointList';
import YMap from './map_containers/YMap';

class YandexMap extends Component {
    render() {
        return (
            <Fragment>
                <PointList />
                <YMap />
            </Fragment>
        )
    }
}

export default YandexMap;