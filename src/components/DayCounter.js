import { LitElement, html } from "../../assets/@polymer/lit-element/lit-element.js";

class DayCounter extends LitElement {
    static get properties() {
        return {
           value:{type:Number, reflect:true},
           fontSize:{type:String},
           color:{type:String}
        }
    }
    constructor() {
        super();
        this.value = 1;
        this.fontSize = '16pt';
        this.color = 'black';
    }
    render() {

        return html`
        <style>
            .container {
                display:grid;
                font-size:${this.fontSize};
                grid-template-columns: 30px 1fr 30px;
                grid-template-rows: auto 2px 1fr 17px 1fr 2px;
            }
            .down-arrow {
                position:relative;
                cursor:pointer;
                border: 10px solid ${this.color};
                width: 0;
                height: 0;
                border-left-color: transparent;
                border-right-color: transparent;
                border-top-color: ${this.color};
                border-bottom-color: transparent;
                padding:0!important;
                background-color:inherit;
            }
            .up-arrow {
                position:relative;
                top:-10px;
                cursor:pointer;
                border: 10px solid ${this.color};
                width: 0;
                height: 0;
                border-left-color: transparent;
                border-right-color: transparent;
                border-top-color: transparent;
                border-bottom-color: ${this.color};
                padding:0!important;
                background-color:inherit;
            }
            input {
                padding:0;
                color:${this.color};
                margin-left:3px;
                font-size:${this.fontSize};
                text-align:center;
                background-color:inherit;
                border:none;
                grid-column: 2 / 3;
                grid-row: 2 / -1;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            .increament-down {
                cursor:pointer;
                grid-column: 1 / 2;
                grid-row: 2 / -1;
                align-self:start;
                justify-self:center;
      
            }
            .increament-up {
                cursor:pointer;
                grid-column: 3 / -1;
                grid-row: 2 / -1;
                justify-self:center;

            }
            ::slotted(.day_input_label) {
                grid-column: 1 / -1;
                grid-row:1 / 2
            }
            
            
        </style>
        <div class="container">
            <slot class="slot"></slot>
            <div class="increament-down" for="control" @click="${this.decreaseCount}">
                <button class="down-arrow"></button>
            </div>
            <input 
                @click="${this.handleSelect}"
                @input="${this.handleInput}" 
                type="number" 
                for="numbers" 
                .value="${this.value}" 
                min="1" 
                max="7"
            >
            <div class="increament-up" @click="${this.increaseCount}">
                <button class="up-arrow"></button>
            </div>
        </div>
        `;
    }
    increaseCount(e) {
        if (this.value < 7) {
            this.value++
            this.dispatchEvent(new CustomEvent('input', {detail:this.value}));
        } 
    }
    decreaseCount(e) {
        if (this.value > 1) {
            this.value--;
            this.dispatchEvent(new CustomEvent('input', {detail:this.value}));
        }
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
        this.dispatchEvent(new CustomEvent('input', {detail:this.value}))
    }
}

customElements.define('day-counter', DayCounter);