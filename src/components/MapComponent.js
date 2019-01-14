import {LitElement, html} from '../../assets/@polymer/lit-element/lit-element';
import L from 'leaflet';

//stupid hack so that leaflet's images work after going through webpack
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
});

class Map extends LitElement {
    static get properties() {
        return {
            dark:{type:Boolean},
            map:{type:Object},
            positions:{type:Object},
            tripStats:{type:Object},
            roundTrip:{type:Boolean, reflected:true},
            daysPerWeek:{type:Number},
            clearMap:{type:Boolean}
        }
    }
    constructor() {
        super();
        this.map = null;
        this.currentPosText = null;
        this.tripStats = null;
        this.positions = {
            posA:null,
            posB:null
        }
        this.markers = [];
    }
    render() {
        if(this.clearMap) {
            this.resetMap();
        }
        return html`
            <link href='leaflet.css' rel="stylesheet" type="text/css"> 
            <style>
                :host {
                    color:${this.dark ? `#E8E8E8!important` : '#333'};
                }
                #map {
                    height:48vh;
                }
                .leaflet-popup-content {
                    text-align:center;
                    width:44px;
                }
                .position_container, .distance_container {
                    transition:opacity .5s;
                }
            </style> 
            <div id="map">
            </div> 
        `;
    }
    async firstUpdated() {
        const mapEl = this.shadowRoot.querySelector('#map');
        this.map = await this.setMap(mapEl);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        //set up event listeners
        this.map.on('click', (e)=>{
            this.mapClicked(e)
        });
    }
    updateTotalDriveMiles(e) {
        this.tripStats = {...this.tripStats, distance:e.target.value}
    }
    setMap(mapEl) {
        return new Promise((resolve, reject)=>{
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos)=>{
                    resolve(L.map(mapEl).setView([pos.coords.latitude, pos.coords.longitude], 13));
                }, (err)=>{
                    resolve(L.map(mapEl).setView([40.0415, -99.7119], 4));
                })
            } else {
                resolve(L.map(mapEl).setView([40.0415, -99.7119], 4));
            }
        })
    }
    resetMap() {
        this.positions.posA = null;
        this.positions.posB = null;
        this.currentPosText = null;
        this.tripStats = null;
        this.markers.forEach(marker=>{
            marker.mark.removeFrom(this.map)
        })
        this.markers = [];
        this.dispatchEvent(new CustomEvent('updateTripStats', {detail:this.tripStats}));
    }
    mapClicked(e) {
        if (!this.currentPosText) {
            this.currentPosText = 'A'
        } else if (this.currentPosText === 'A') {
            this.currentPosText = 'B'
        } else {
            this.currentPosText = 'A'
        }
        this.markers.push({mark:L.marker(e.latlng), text:this.currentPosText});
        if (this.markers.length > 2) {
            this.markers[0].mark.removeFrom(this.map)
            this.markers.splice(0,1);
        }
        if (this.markers.length === 2) {
            const aMarker = this.markers.find(el=>el.text === 'A')
            const bMarker = this.markers.find(el=>el.text === 'B')
            this.positions.posA = (aMarker.mark.getLatLng().lng).toFixed(4)+','+(aMarker.mark.getLatLng().lat).toFixed(4);
            this.positions.posB = (bMarker.mark.getLatLng().lng).toFixed(4)+','+(bMarker.mark.getLatLng().lat).toFixed(4);
            this.getTotalDriveMiles(this.positions.posA, this.positions.posB);
        }
        this.markers.forEach(marker=>{
            marker.mark.addTo(this.map);
            marker.mark.closePopup();
            marker.mark.bindPopup('<b>'+marker.text+'</b>', {autoClose:false, closeOnClick:false}).openPopup();
            marker.mark.on('click', this.markerClicked);
        })

    }
    markerClicked(e) {
        console.log("marker cliked", e)
    }
    async getTotalDriveMiles(a, b) {
        //meters to miles divide the length value by 1609.344
        //seconds to hours divide the time value by 3600
        const directionsApiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${a};${b}?access_token=pk.eyJ1IjoiYmxhY2t0aWVrbmlmZSIsImEiOiJjanF0M3FlYjIwNXB1NDJxdHV0cDh5MDVnIn0.XYXCauCcB9vGyu957DwPxQ&alternatives=true`;
        try {
            const rawResp = await fetch(directionsApiUrl);
            const {routes} = await rawResp.json();
            const totalDistance = (routes[0].distance / 1609.344).toFixed(2);
            const totalHours = (routes[0].duration / 3600).toFixed(2);
            this.tripStats = {
                positions:this.positions,
                distance:totalDistance,
                duration:totalHours
            };
            this.dispatchEvent(new CustomEvent('updateTripStats', {detail:this.tripStats}));
        } catch(err) {
            console.error("Error getting total drive miles", err)
        }
       
    }
}

customElements.define("map-component", Map);