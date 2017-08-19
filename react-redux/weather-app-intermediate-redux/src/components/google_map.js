import React, { Component } from 'react';

// Note that we imported the Google Maps javascript library in the index.html file
// so the google.maps object is immediately available to us here (and in the console),
// we didn't have to npm install anything.
// We could have used the 'react-google-maps' npm library instead!
class GoogleMap extends Component {
  // This is how interfacing with a lot of 3rd party libraries is done.
  // Google Maps has its own rendering logic, it knows nothing about React's
  // render() method.
  componentDidMount() {
    // First argument is the HTMLElement we want to render the map into.
    new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: this.props.lat,
        lng: this.props.lon,
      },
    })
  }

  render() {
    // The ref attribute allows to refer to this HTMLElement through this.ref.[valueOfRefAttribute],
    // see this.ref.map in componentDidMount
    return <div ref="map" />;
  }
}

export default GoogleMap;
