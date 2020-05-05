class YellowColor implements IColor{

    name(): string {
        return "yellow";
    }

    rgbValue(): string {
        return "rgb(255,255,0)";
    }

}

const Yellow: YellowColor = new YellowColor();
Object.freeze(Yellow);

export default Yellow;