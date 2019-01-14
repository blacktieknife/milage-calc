import {LitElement, html} from '../../assets/@polymer/lit-element/lit-element';
import './CheckBox.js';


class TripBuilder extends LitElement {
    static get properties() {
        return {
            tripStats:{type:Object},
            daysPerWeek:{type:Number},
            roundTrip:{type:Boolean}
        }
    }
    constructor() {
        super();
        this.daysPerWeek = 1;
        this.roundTrip = true;

    }
    render() {
        return html`
            <style>
                .trip_builder{
                    background-color:#c5cae9;
                    min-height:52vh;
                }
                .position_container, .distance_container {
                    transition:opacity .5s;
                }
                .position_container{
                    background-color:rgb(19,55,140);
                    box-shadow:.4px .6px 5px #333;
                }
                .distance_container {
                    padding:10px;
                }
                .pos_flex {
                    display:flex;
                    justify-content:center;
                }
                label {
                    text-align:center;
                    font-weight:bold;
                    color:silver;
                    transition:font-size .3s
                }
                .miles::after {
                    font-size:.5em;
                    padding-left:4px;
                    content:'Miles'
                }
                .hours::after {
                    font-size:.5em;
                    padding-left:4px;
                    content:'Hours'
                }
                .current_pos{
                    padding:5px;
                }
                .control_grid{
                    display:grid;
                    margin-top:15px;
                    grid-template-columns: 1fr;
                    grid-template-rows:50px 50px;
                    justify-items:center;
                    align-items:center;
                    grid-gap:8px;
                }
                input[type="text"] {
                    border:none;
                    text-align:center;
                    background-color:inherit;
                    font-size:.6em;
                    color:white;
                    min-width:128px;
                    transition:font-size .3s
                }
                input[type="number"] {
                    border:none;
                    width:50px;
                    font-weight:bolder;
                    border-top:none;
                    border-left:none;
                    border-right:none;
                    background-color:inherit;
                    font-size:18pt;
                    text-align:center;
                    color:#333;
                }
                .day_input_label{
                   color:#333;
                   font-size:17pt;
                   font-weight:bold;
                }
                .input{
                    transition:all .3s;
                }
                .closeTripBtn{
                    cursor:pointer;
                    background-color:inherit;
                    position:absolute;
                    right:8px;
                    width:20px;
                    height:20px;
                    border:none; 
                    margin-top:-5px;
                    border-radius:50%; 
                    line-height:20px;
                    font-family:Tahoma, Geneva, sans-serif;
                    font-weight:bold;
                    text-align:center;
                    font-size:8pt;
                    transition:background-color .4s;
                }
                .closeTripBtn:hover{
                  background-color:rgba(77,77,77, .2);
                }
                .grid-wrapper{
                    display:grid;
                    grid-template-columns: 1fr;
                    grid-template-rows:repeat(4, 45px);
                    grid-gap:10px;
                }
                .stat-grid-item{
                    display:grid;
                    border-radius:6px;
                    padding:12px;
                    background-color:#455a64;
                    grid-template:1fr / repeat(12, 1fr);
                    grid-gap:0px;
                    grid-template-areas:
                        "t t t t t t t t t t t b";  
                    color:white;
                    font-size: 14pt;
                    transition: padding font-size .3s;
                }
                .stat-item-label{
                    grid-area:t;
                    transition:font-size .3s;
                }
                .stat-item-label + div {
                    grid-area:b;
                    transition:font-size .3s;
                }
                h4{
                    font-size:14pt;
                    margin-top:18px;
                    margin-bottom:8px;
                }
                
                /* Extra small devices (phones, 600px and down)
                @media only screen and (max-width: 600px) {
                 
                }  */

                /* Small devices (portrait tablets and large phones, 600px and up) */
                @media only screen and (min-width: 600px) {
                    input[type="text"] {
                        font-size:.8rem;
                        min-width:165px;
                    }
                    label {
                        font-size:1em;
                    }
                    .control_grid{
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows:1fr;
                        justify-items:space-around;
                        align-items:center;
                    }
                    .day_input{
                        margin-left:auto;
                    }
                    .input_flex{
                        margin-right:auto;
                    }
                    .grid-wrapper{
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: repeat(2, 50px);
                        grid-gap:15px;
                    }
                    .stat-item-label + div {
                        font-size:1.1em;
                    }
                    .stat-item-label {
                        font-size:1.1em;
                    }

                } 

                /* Medium devices (landscape tablets, 768px and up) */
                @media only screen and (min-width: 768px) {
                    input[type="text"] {
                        font-size:1em;
                    }
                    label {
                        font-size:1.2em;
                    }                
                } 

                /* Large devices (laptops/desktops, 992px and up) */
                @media only screen and (min-width: 992px) {
                    input[type="text"] {
                        font-size:1.2em;
     
                    }
                    label {
                        font-size:1.4em;
                    }
                    .grid-wrapper{
                        grid-template-columns: repeat(auto-fill, 1fr);
                        grid-template-rows: repeat(2, 80px);
                        grid-gap:18px;
                    }
                    .stat-grid-item{
                        grid-template:1fr 1fr/ repeat(12, 1fr);
                        grid-template-areas:
                            "t t t t t t t t t t t t"
                            "b b b b b b b b b b b b";
                        color:white;
                        font-size: 14pt;
                        justify-items:center;
                    }
                    .stat-item-label + div {
                        grid-area:t;
                        margin-left:0;
                        font-weight:bold;
                        font-size:1.7em;
                    }
                    .stat-item-label {
                        grid-area:b;
                        font-size:1.1em;
                    }
                } 

                /* Extra large devices (large laptops and desktops, 1200px and up) */
                @media only screen and (min-width: 1200px) {
                    input[type="text"] {
                        font-size:1.3em;
                        min-width:255px;
                    }
                    label {
                        font-size:1.6em;
                    }
                    .grid-wrapper{
                        grid-template-columns: repeat(4, 1fr);
                        grid-template-rows: repeat(1, 100px);
                        grid-gap:25px;
                    }
                    .stat-item-label {
                        margin-left:0;
                    }
                    .stat-grid-item {
                        align-items:center;
                    }
                    .stat-item-label + div {
                        margin-left:0;
                        font-weight:bold;
                        font-size:2em;
                    }
                    .stat-item-label {
                        font-size:1.2em;
                    }
                }
            </style>
            <div class="trip_builder">
                <div class="position_container" style="${this.tripStats && this.tripStats.positions.posA && this.tripStats.positions.posB ? `opacity:1` : `opacity:0`}">
                    <div class="pos_flex">
                        <div class="current_pos">
                            <label>A</label>
                            <input readonly type="text" .value="${this.tripStats && 'lat: '+this.tripStats.positions.posA.split(',')[1]+', lng: '+this.tripStats.positions.posA.split(',')[0]}"/>
                        </div>
                        <div class="current_pos">
                            <label>B</label>
                            <input readonly type="text" id="round_trip" .value="${this.tripStats && 'lat: '+this.tripStats.positions.posB.split(',')[1]+', lng: '+this.tripStats.positions.posB.split(',')[0]}"/>
                        </div>
                    </div>
                </div>
                <div class="distance_container" style="opacity:${this.tripStats ? `1` : `0`}">
                    <button class="closeTripBtn" 
                                @click="${this.handleClearMap}"
                                @keypress="${this.handleCloseKeyPress}"
                            >
                                X
                            </button>
                    <div class="control_grid">
                        <div class="input day_input">
                            <label class="day_input_label" for="dayInput">Days per week</label>
                            <input 
                                id="dayInput"
                                type="number" 
                                max="7" 
                                min="1" 
                                .value=${this.daysPerWeek} 
                                @input="${this.handleDaysPerWeek}"
                                @click="${this.handleDaysPerWeekClick}"
                            > 
                        </div>
                        <div class="input_flex">
                            <check-box 
                                class="input"
                                name="round_trip_check" 
                                label="Round Trip"
                                labelSize="15pt"
                                color="#333"
                                borderColor="lightslategrey"
                                checkColor="#333"
                                .checked=${this.roundTrip} 
                                @click="${this.handleRoudTripCheck}"
                                @keypress="${this.handleRoundTripKeyPress}"
                            >
                            </check-box>
                        </div>
                    </div>
                    <h4>Driving Miles</h4>
                    <div class="grid-wrapper">
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Total</div>
                            <div class="miles">${this.roundTrip ? this.tripStats && (this.tripStats.distance*2).toFixed(2) : this.tripStats && (this.tripStats.distance)}</div>
                        </div>
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Per Week</div>
                            <div class="miles">${this.roundTrip ? this.tripStats && ((this.tripStats.distance*2)*this.daysPerWeek ).toFixed(2): this.tripStats && (this.tripStats.distance*this.daysPerWeek).toFixed(2)}</div>
                        </div> 
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Per Month</div>
                            <div class="miles">${this.roundTrip ? this.tripStats && ((this.tripStats.distance*2)*this.daysPerWeek*4.34524).toFixed(2) : this.tripStats && (this.tripStats.distance*this.daysPerWeek*4.34524).toFixed(2)}</div>
                        </div> 
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Per Year</div>
                            <div class="miles">${this.roundTrip ? this.tripStats && (( this.tripStats.distance*2)*this.daysPerWeek*52.1429).toFixed(2) : this.tripStats && (this.tripStats.distance*this.daysPerWeek*52.1429).toFixed(2)}</div>
                        </div>
                    </div>
                    <h4>Driving Hours</h4> 
                    <div class="grid-wrapper">
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Total</div>
                            <div class="hours">${this.roundTrip ? this.tripStats && (this.tripStats.duration*2).toFixed(2) : this.tripStats && (this.tripStats.duration)}</div>
                        </div>  
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Per Week</div>
                            <div class="hours">${this.roundTrip ? this.tripStats && ((this.tripStats.duration*2)*this.daysPerWeek).toFixed(2) : this.tripStats && (this.tripStats.duration*this.daysPerWeek).toFixed(2)}</div>
                        </div> 
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Per Month</div>
                            <div class="hours">${this.roundTrip ? this.tripStats && ((this.tripStats.duration*2)*(this.daysPerWeek*4)).toFixed(2) : this.tripStats && (this.tripStats.duration*this.daysPerWeek*4).toFixed(2)}</div>
                        </div> 
                        <div class="stat-grid-item">
                            <div class="stat-item-label">Per Year</div>
                            <div class="hours">${this.roundTrip ? this.tripStats && ((this.tripStats.duration*2)*this.daysPerWeek*52.1429).toFixed(2) : this.tripStats && (this.tripStats.duration*this.daysPerWeek*52.1429).toFixed(2)}</div>
                        </div>   
                    </div>
                </div>
            </div>  
        `;
    }
    handleClearMap() {
        this.daysPerWeek = 1;
        this.dispatchEvent(new CustomEvent('clearMap'));
    }
    handleCloseKeyPress(e) {
        if (e.keyCode === 13) {
            this.daysPerWeek = 1;
            this.dispatchEvent(new CustomEvent('clearMap'));
        }
    }
    handleRoudTripCheck(e) {
        this.roundTrip = !this.roundTrip;
    }
    handleRoundTripKeyPress(e) {
        if (e.keyCode === 13) {
            this.roundTrip = !this.roundTrip;
        }
    }
    handleDaysPerWeek(e) {
        if(e.target.value > 7) {
            e.target.value = 7;
        }
        if(e.target.value < 1) {
            e.target.value = 1;
        }
        this.daysPerWeek = e.target.value;
    }
    handleDaysPerWeekClick(e) {
        e.target.select()
    }
}

customElements.define("trip-builder", TripBuilder);