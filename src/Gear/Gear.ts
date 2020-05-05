import {Color} from "../Colors/Color";

export default abstract class Gear {
    painting: boolean;
    icon: any;

    protected constructor(icon) {
        this.icon = icon;
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    abstract start(event): void;

    abstract finish(event?): void;

    abstract draw(color: Color);
}