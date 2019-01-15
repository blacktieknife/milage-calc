import { LitElement, html } from "../../assets/@polymer/lit-element/lit-element.js";

class DayCounter extends LitElement {
    static get properties() {
        return {
           value:{type:Number, reflect:true},
           fontSize:{type:String}
        }
    }
    constructor() {
        super();
        this.value = 1;
        this.fontSize = '16pt';
    }
    render() {
        return html`
        <style>
            .container {
                display:grid;
                font-size:${this.fontSize};
                grid-template-columns: repeat(12, 12px);
                grid-template-rows: 12px 1fr 12px
                
            }
            input {
                padding:0;
                margin-left:3px;
                font-size:${this.fontSize};
                text-align:center;
                background-color:inherit;
                border:none;
                grid-row: 1 / -1; 
                grid-column: 1 / 3;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        </style>
        <div class="container">
            <input 
                @click="${this.handleSelect}"
                @input="${this.handleInput}" 
                type="number" 
                for="numbers" 
                .value="${this.value}" 
                min="1" 
                max="7"
            >
            <div @click="${this.increaseCount}">&#x21e7;</div>
        </div>
        `;
    }
    increaseCount(e) {
        if (this.value < 7) this.value++;
    }
    handleSelect(e) {
        e.target.select()
    }
    handleInput(e) {
        if (e.target.value <= 0) {
            e.target.value = 1;
            this.value = 1
        } else if (e.target.value > 7) {
            e.target.value = 7;
            this.value = 7
        } else {
            this.value = e.target.value;
        }
    }
}

customElements.define('day-counter', DayCounter);