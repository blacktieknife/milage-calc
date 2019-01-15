import { LitElement, html } from "../../assets/@polymer/lit-element/lit-element.js";

class CheckBox extends LitElement {
    static get properties() {
        return {
            name:{type:String},
            label:{type:String},
            checked:{type:Boolean, reflect:true},
            labelSize:{type:String},
            color:{type:String},
            borderColor:{type:String},
            checkColor:{type:String}
        }
    }
    constructor() {
        super();
        this.name = '';
        this.label = '';
        this.checked = false;
        this.labelSize = false;
        this.color = '';
        this.borderColor = '';
        this.checkColor = '';
    }
    render() {
        return html`
            <style>
                input[type="checkbox"] {
                  position:absolute;
                  opacity:0;    
                }
                .checkbox label {
                    cursor:pointer;
                    position: relative;
                    display: inline-block;
                    font-weight:bold;
                    /*16px width of fake checkbox + 6px distance between fake checkbox and text*/
                    padding-left: 30px;
                    padding-top:3px;
                    font-size:${this.labelSize ? this.labelSize :`15pt`};
                    color:${this.color ? this.color : ''};
                    transition:all .3s;
                }

                .checkbox label::before,
                .checkbox label::after {
                    position: absolute;
                    content: "";   
                    /*Needed for the line-height to take effect*/
                    display: inline-block;
                    
                }

                .checkbox label::before{
                    height: 21px;
                    width: 21px;
                    
                    border: 1.5px solid ${this.borderColor};
                    border-radius:4px;
                    left: 0px;
                    
                    /*(24px line-height - 16px height of fake checkbox) / 2 - 1px for the border
                    *to vertically center it.
                    */
                    top: 3px;
                    transition:all .3s;
                }
                .checkbox label::after {
                    height: 6px;
                    width: 11px;
                    border-left: 2.5px solid ${this.checkColor};
                    border-bottom: 2.5px solid ${this.checkColor};
                    
                    transform: rotate(-45deg);
                    
                    left: 5px;
                    top: 8px;

                    transition:all .3s;
                }
                .checkbox input[type="checkbox"] + label::after {
                    opacity: 0;
                }

                .checkbox input[type="checkbox"]:checked + label::after {
                    opacity: 1;
                } 

                .checkbox input[type="checkbox"]:focus + label::before {
                    outline: rgb(59, 153, 252) auto 5px;
                }           
            </style>
            <div class="checkbox">
                <input type="checkbox" .checked="${this.checked}" .name="${this.name}">
                <label for="${this.name}">${this.label}</label>
            </div>
        `;
    }
}

customElements.define('check-box', CheckBox);