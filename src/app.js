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
        if(this.tripStats === null) {
            this.fadeComponent('welcome')
        } else {
            this.fadeComponent('trip')
        }
        return html`
            <div id="app">
                <map-component 
                    .clearMap=${this.clearMap}
                    @updateTripStats=${this.handleUpdateTripStats} 
                >
                </map-component>
                <div style="position:relative;">
                    <div class="tripFade" style="position:absolute;width:100%;">
                        <trip-builder 
                            .tripStats=${this.tripStats}
                            @clearMap=${this.handleClearMap}
                        >
                        </trip-builder>
                    </div>
                    <div class="welcomeFade" style="position:absolute;width:100%;">
                        <welcome-component></welcome-component>
                    </div>
                </div>
            </div>
            <style>
                #app{
                    height:100%;
                    background-color:#C5CAE9;
                }
                .welcomeFade, .tripFade{
                    opacity:0;
                    background-color:#C5CAE9;
                    transition:opacity .5s;
                }
                  /* Small devices (portrait tablets and large phones, 600px and up) */
                  /* @media only screen and (min-width: 600px) {
                   
                }  */

                /* Medium devices (landscape tablets, 768px and up) */
                /* @media only screen and (min-width: 768px) {
                   
                }  */

                /* Large devices (laptops/desktops, 992px and up) */
                /* @media only screen and (min-width: 992px) {
                    
                }  */

                /* Extra large devices (large laptops and desktops, 1200px and up) */
                /* @media only screen and (min-width: 1200px) {
                   
                }     */
            </style>
        `;
    }
    firstUpdated(changedProperties) {
        this.tripFadeElement = this.shadowRoot.querySelector('.tripFade');
        this.welcomeFadeElement = this.shadowRoot.querySelector('.welcomeFade');
      
    }
    fadeComponent(component) {
        switch(component) {
            case "welcome":
                setTimeout(()=>{
                    this.welcomeFadeElement ? this.welcomeFadeElement.style.opacity = 1 : false;
                    this.tripFadeElement ? this.tripFadeElement.style.opacity = 0 : false;
                    this.welcomeFadeElement ? this.welcomeFadeElement.style.zIndex = 2 : false;
                    this.tripFadeElement ? this.tripFadeElement.style.zIndex = 0 : false;
                    setTimeout(()=>{
                        this.tripFadeElement ? this.tripFadeElement.style.display = 'none' : false;
                    },505);
                }, 2)  
            break;
            case "trip":
                setTimeout(()=>{
                    this.tripFadeElement ? this.tripFadeElement.style.display = 'block' : false;
                    this.welcomeFadeElement ? this.welcomeFadeElement.style.opacity = 0 : false;
                    setTimeout(()=>{
                        this.tripFadeElement ? this.tripFadeElement.style.opacity = 1 : false;
                        this.welcomeFadeElement ? this.welcomeFadeElement.style.zIndex = 0 : false;
                        this.tripFadeElement ? this.tripFadeElement.style.zIndex = 2 : false;
                    },5)
                }, 2)

            break;
        }
    }
    handleUpdateTripStats(e) {
        this.tripStats = e.detail;
    }
    handleClearMap() {
        this.clearMap = true;
        setTimeout(()=>{
            this.clearMap = false;
        }, 150)
    }
}



customElements.define('milage-calc', App);