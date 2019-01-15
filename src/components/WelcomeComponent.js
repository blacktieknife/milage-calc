import {LitElement, html} from "../../assets/@polymer/lit-element/lit-element.js";

class Welcome extends LitElement {
    static get properties() {
        return {
            dark:{type:Boolean},
            // tripStats:{type:Object},
            // clearMap:{type:Boolean}
        }
    }
    constructor() {
        super();
        // this.tripStats = null;
        // this.clearMap = false;
    }
    render() {
        return html`
            <div id="welcome_container">
                <div class="header">Daily Driver Calculator</div>
                <div class="content">
                    <h2>Calculate the total milage & time of your daily routes</h2>
                    <p>To get started, click between two locations on the map.  The app will find an effeicent route <small>(using mapbox api)</small> between both locations
                    & calculate the milage and time. For your 'daily' routes you can choose "round trip" & number of 
                    days per week you drive this route.</p><p><b>Note: </b>You can save the route after it's 
                    calculated and add multiple routes.</p>
                    
                </div>
                <div class="actions"></div>
            </div>
            <style>
                :host{
                   
                }
                p{
                    font-size:1.2em;
                }
                #welcome_container {
                    display:grid;
                    grid-template:40px auto 40px / repeat(12, 1fr);
                    background-color:#c5cae9;
                    min-height:52vh;
                }
                .header {
                    display:flex;
                    background-color:purple;
                    align-items:center;
                    justify-content:center;
                    height:100%;
                    grid-column: 1 / -1;
                    font-size:18pt;
                    color:whitesmoke;
                }
                .actions {
                   
                }
                .content {
                    grid-column-start: 2;
                    grid-column-end: 12;
                }
            </style>
        `;
    }
}



customElements.define('welcome-component', Welcome);