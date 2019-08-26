import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

const { ymaps } = window;

class YMap extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  getAllCoordinates = () => {
    const { marks } = this.props;
    const coordinates = marks.map(mark => mark.geometry);
    return coordinates;
  }

  getCenterGeometry = () => {
    return this.map.current.getCenter();
  }

  getDefaultGeometry = mark => {
    if (mark.geometry.length !== 0) {
      return mark.geometry;
    }
    mark.geometry = this.getCenterGeometry();
    return this.getCenterGeometry();
  }

  setGeometry = (mark, event) => {
    const geometry = event.get('target').geometry.getCoordinates();
    mark.geometry = geometry;
    this.props.setMarkGeometry(mark);
    ymaps.geocode(mark.geometry).then(res => {
      console.log(res.geoObjects.get(0).properties.get('metaDataProperty'));
    });
  }

  render() {
    const { marks, mapDefaultState, mapWidth, mapHeight } = this.props;
    return (
      <div className="yandex-map-container">
        <YMaps>
          <Map defaultState={mapDefaultState} style={{ height: mapHeight, width: mapWidth }} instanceRef={this.map}>
            {marks.map(mark => (
              <Placemark 
                geometry={this.getDefaultGeometry(mark)} 
                options={{ draggable: true }} 
                key={`${mark.title}-${mark.id}`} 
                onDragEnd={(event) => { this.setGeometry(mark, event) }}
              />
            ))}
            <Polyline
              geometry={{
                type: 'LineString',
                coordinates: this.getAllCoordinates(),
              }}
              options={{
                strokeWidth: 4,
                strokeColor: '000000',
                draggable: false,
                strokeOpacity: 0.5,
              }}
            />
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
  setMarkGeometry: PropTypes.func.isRequired,
}

export default YMap;