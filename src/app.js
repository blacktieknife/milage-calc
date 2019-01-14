import {LitElement, html} from "../assets/@polymer/lit-element/lit-element";
import {connectRouter} from "lit-redux-router";

import './components/MapComponent.js';
import './components/TripBuilder.js';
import './components/WelcomeComponent.js';

import store from "./store.js";

connectRouter(store);

class App extends LitElement {
    static get properties() {
        return {
            dark:{type:Boolean},
            tripStats:{type:Object},
            clearMap:{type:Boolean}
        }
    }
    constructor() {
        super();
        this.tripStats = null;
        this.clearMap = false;
    }
    render() {
        return html`
            <div id="app">
                <map-component 
                    .clearMap=${this.clearMap}
                    @updateTripStats=${this.handleUpdateTripStats} 
                >
                </map-component> 
                <div style="position:relative;">
                    <div class="fade" style="${this.tripStats == null ? `display:none;opacity:0;z-index:0;`: `display:'';opacity:1;z-index:2;`};position:absolute;width:100%;">
                        <trip-builder 
                            .tripStats=${this.tripStats}
                            @clearMap=${this.handleClearMap}
                        >
                        </trip-builder>
                    </div>
                    <div class="fade" style="${this.tripStats !== null ? `opacity:0;z-index:0;`: `opacity:1;z-index:2;`};position:absolute;width:100%;">
                        <welcome-component></welcome-component>
                    </div>
                </div>
            </div>
            <style>
                :host{
                   
                }
                .fade {
                    transition:opacity 1s;
                }
            </style>
        `;
    }
    handleUpdateTripStats(e) {
        this.tripStats = e.detail;
    }
    handleClearMap() {
        this.clearMap = true;
        setTimeout(()=>{
            this.clearMap = false;
        }, 300)
    }
}



customElements.define('milage-calc', App);