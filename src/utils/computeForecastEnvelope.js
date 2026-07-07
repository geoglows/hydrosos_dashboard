import { percentile } from "./percentile.js";

export function computeForecastEnvelope(
    forecastCurves
) {

    if (forecastCurves.length === 0) {
        return null;
    }

    const days = forecastCurves[0].days;

    const minimum = [];
    const p25 = [];
    const median = [];
    const p75 = [];
    const maximum = [];

    for (let i = 0; i < days.length; i++) {

        const values = forecastCurves
            .map(curve => curve.incrementalVolume[i])
            .filter(v => v !== undefined)
            .sort((a, b) => a - b);

        if (values.length === 0) {

            minimum.push(null);
            p25.push(null);
            median.push(null);
            p75.push(null);
            maximum.push(null);

            continue;

        }

        minimum.push(values[0]);

        p25.push(
            percentile(values, 25)
        );

        median.push(
            percentile(values, 50)
        );

        p75.push(
            percentile(values, 75)
        );

        maximum.push(
            values.at(-1)
        );

    }

    return {

        days,

        minimum,

        p25,

        median,

        p75,

        maximum

    };

}