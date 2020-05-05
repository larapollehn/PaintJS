import {CANVAS, COLORS, DEFAULT_COLOR, DEFAULT_GEAR, GEARS} from "../Globals";
import Gear from "../Gear/Gear";
import Brush from "../Gear/Brush";
import {Color} from "../Colors/Color";

export default class PaintView {
    public currentColor: Color = DEFAULT_COLOR;
    public currentGear: Gear = DEFAULT_GEAR;
    public cache: Map<string, Function> = new Map();
    public colorOptions: Map<string, Color> = new Map<string, Color>();
    public gearOptions: Map<string, Gear> = new Map<string, Gear>();

    constructor() {
        COLORS.forEach(color => {
            this.colorOptions[color.id] = color;
        });

        GEARS.forEach(gear => {
            this.gearOptions[gear.constructor.name] = gear;
        })

        this.cache["oldStart"] = this.currentGear.start;
        this.cache['oldFinish'] = this.currentGear.finish;
        this.cache['oldDraw'] = this.currentGear.draw(this.currentColor);

        this.addEventListener = this.addEventListener.bind(this);
        this.displayColorPallet = this.displayColorPallet.bind(this);
        this.colorChange = this.colorChange.bind(this);
        this.displayGearOptions = this.displayGearOptions.bind(this);
    }

    initialize(){
        this.displayColorPallet();
        this.displayCurrentColor();
        this.displayGearOptions();
        this.addEventListener();
    }

    addEventListener() {
        CANVAS.removeEventListener("mousedown", this.cache["oldStart"]);
        CANVAS.removeEventListener('mouseup', this.cache['oldFinish']);
        CANVAS.removeEventListener('mousemove', this.cache['oldDraw']);

        this.cache["oldStart"] = this.currentGear.start;
        this.cache['oldFinish'] = this.currentGear.finish;
        this.cache['oldDraw'] = this.currentGear.draw(this.currentColor);

        CANVAS.addEventListener('mousedown',  this.cache["oldStart"])
        CANVAS.addEventListener('mouseup', this.cache['oldFinish']);
        CANVAS.addEventListener('mousemove', this.cache['oldDraw']);
    }

    displayCurrentColor() {
        const currentColorSquare = document.getElementById('currentColor');
        currentColorSquare.style.backgroundColor = this.currentColor.rgbValue;
    }

    displayColorPallet() {
        const colorOptionsContainer = document.getElementById('colorOptions');
        for(let color in this.colorOptions){
            const square = document.createElement('div');
            square.classList.add('colorOptions');
            square.style.backgroundColor = this.colorOptions[color].rgbValue;
            square.id = this.colorOptions[color].id;
            square.addEventListener('click', this.colorChange)
            colorOptionsContainer.appendChild(square);
        }
    }

    displayGearOptions(){
        const GearOptionContainer = document.getElementById('gearOptions');
        for (let gear in this.gearOptions){
            const square = document.createElement('div');
            square.classList.add('gearOption');
            square.id = gear;
            square.style.backgroundImage = 'url("' + this.gearOptions[gear].icon + '")';
            square.style.backgroundSize = 'cover';
            GearOptionContainer.appendChild(square);
        }
    }

    colorChange(event) {
        this.currentColor = this.colorOptions[event.toElement.id];
        this.displayCurrentColor();
        this.addEventListener();
    }

}