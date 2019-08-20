import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class YMap extends Component {
  constructor(props) {
    super(props);
    // this.myPlacemark = React.createRef();
    this.map = React.createRef();
  }

  getCenterGeometry = () => {
    return this.map.current.getCenter();
  }

  render() {
    const { marks, mapDefaultState, mapWidth, mapHeight } = this.props;
    return (
      <div className="yandex-map-container">
        <YMaps>
          <Map defaultState={mapDefaultState} style={{ height: mapHeight, width: mapWidth }} instanceRef={this.map}>
            {marks.map((mark, id) => (
              <Placemark geometry={this.getCenterGeometry()} options={{ draggable: true }} key={`${mark}-${id}`} />
            ))}
            {/* <Placemark geometry={[55.75, 37.57]} options={{ draggable: true }} onGeometryChange={() => { console.log(this.myPlacemark.current.geometry._coordinates) }} instanceRef={this.myPlacemark} /> */}
          </Map>
        </YMaps>
      </div>
    );
  }
}

YMap.propTypes = {
  marks: PropTypes.array.isRequired,
  mapDefaultState: PropTypes.object.isRequired,
  mapWidth: PropTypes.string.isRequired,
  mapHeight: PropTypes.string.isRequired,
}

export default YMap;