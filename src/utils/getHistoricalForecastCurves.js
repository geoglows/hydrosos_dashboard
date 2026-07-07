export function getHistoricalForecastCurves(
    waterYearCurves,
    currentCurve,
    monthsAhead = 3
) {

    // Today's normalized position on the water year axis
    const today = new Date();

    const startDate =
    currentCurve.days.at(-1);
    

    // Three months later on the same normalized axis
    const endDate = new Date(startDate);
    endDate.setUTCMonth(endDate.getUTCMonth() + monthsAhead);

    return waterYearCurves
        .map(curve => {

            const startIndex = curve.days.findIndex(
                d => d.getTime() === startDate.getTime()
            );

            if (startIndex === -1) {
                return null;
            }

            let endIndex = curve.days.findIndex(
                d => d.getTime() >= endDate.getTime()
            );

            // If the end date isn't found (rare edge case),
            // just use the end of the water year.
            if (endIndex === -1) {
                endIndex = curve.days.length - 1;
            }

            const days = curve.days.slice(
                startIndex,
                endIndex + 1
            );

            const startVolume =
                curve.cumulativeVolume[startIndex];

            const cumulativeVolume =
                curve.cumulativeVolume.slice(
                    startIndex,
                    endIndex + 1
                );

            // NEW: Convert to cumulative increments
            const incrementalVolume =
                cumulativeVolume.map(
                    volume => volume - startVolume
                );

            return {

                waterYear: curve.waterYear,

                days,

                startVolume,

                endVolume:
                    cumulativeVolume.at(-1),

                incrementalVolume

            };

        })
        .filter(curve => curve !== null);

}