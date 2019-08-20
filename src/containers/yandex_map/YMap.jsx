import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class YMap extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  getCenterGeometry = () => {
    return this.map.current.getCenter();
  }

  changeGeometry = (mark, index) => {
    this.props.setMarkGeometry(index, mark.geometry)
  }

  setDefaultGeometry = (mark, index) => {
    if (mark.geometry.length !== 0) {
      return mark.geometry;
    }
    const centerGeometry = this.getCenterGeometry();
    this.props.setMarkGeometry(index, centerGeometry);
    return this.getCenterGeometry();
  }

  handleClick = () => {
    console.log(this.props.marks)
  }

  render() {
    const { marks, mapDefaultState, mapWidth, mapHeight } = this.props;
    return (
      <div className="yandex-map-container">
        <YMaps>
          <Map defaultState={mapDefaultState} style={{ height: mapHeight, width: mapWidth }} instanceRef={this.map}>
            {marks.map((mark, index) => (
              <Placemark 
                geometry={this.setDefaultGeometry(mark, index)} 
                options={{ draggable: true }} 
                key={`${mark.title}-${index}`} 
                onGeometryChange={() => { this.changeGeometry(mark, index) }}
              />
            ))}
            {/* <Placemark geometry={[55.75, 37.57]} options={{ draggable: true }} onGeometryChange={() => { console.log(this.myPlacemark.current.geometry._coordinates) }} instanceRef={this.myPlacemark} /> */}
          </Map>
        </YMaps>
        <button onClick={this.handleClick}>LOG</button>
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