const utilities = (() => {
    const responsiveFont = function responsiveFont(sizePx, fontFamily, canvasWidth) {
        let ratio = sizePx / 1523;
        let fontSize = canvasWidth * ratio;
        return `${fontSize}px ${fontFamily}`;
    }

    const toRads = (degrees) => (Math.PI / 180) * degrees;

    const pctMeasure = (percent, measurement) => Math.floor(measurement * (percent * 0.01));

    return {
    	responsiveFont,
    	toRads,
    	pctMeasure,
    };
})();

export default utilities;
