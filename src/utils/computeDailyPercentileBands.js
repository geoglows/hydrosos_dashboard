import { percentile } from "./percentile.js";


export function computeDailyPercentileBands(
    waterYearCurves
) {

    // Group all historical values by normalized calendar date
    const dailyGroups = {};

    waterYearCurves.forEach(curve => {

        curve.days.forEach((date, i) => {

            const key =
                `${date.getUTCMonth()+1}-${date.getUTCDate()}`;

            if (!dailyGroups[key]) {
                dailyGroups[key] = [];
            }

            dailyGroups[key].push(
                curve.cumulativeVolume[i]
            );

        });

    });


    const days = [];

    const minimum = [];
    const p10 = [];
    const p25 = [];
    const median = [];
    const p75 = [];
    const p90 = [];
    const maximum = [];


    // Build a normalized water-year calendar
    const start = new Date(
        Date.UTC(2000, 9, 1) // Oct 1, 2000
    );

    const end = new Date(
        Date.UTC(2001, 8, 30) // Sep 30, 2001
    );


    for (
        let date = new Date(start);
        date <= end;
        date.setUTCDate(date.getUTCDate()+1)
    ) {

        const key =
            `${date.getUTCMonth()+1}-${date.getUTCDate()}`;


        const values =
            dailyGroups[key];


        if (!values || values.length === 0) {
            continue;
        }


        days.push(
            new Date(date)
        );


        values.sort(
            (a,b)=>a-b
        );


        minimum.push(
            values[0]
        );

        p10.push(
            percentile(values,10)
        );

        p25.push(
            percentile(values,25)
        );

        median.push(
            percentile(values,50)
        );

        p75.push(
            percentile(values,75)
        );

        p90.push(
            percentile(values,90)
        );

        maximum.push(
            values.at(-1)
        );

    }


    return {

        days,

        minimum,

        p10,

        p25,

        median,

        p75,

        p90,

        maximum

    };

}