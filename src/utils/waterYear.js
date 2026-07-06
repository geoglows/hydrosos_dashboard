export function computeWaterYearCurves(records) {

    const recordsByWaterYear = {};

    // Group records by water year
    records.forEach(record => {

        if (!recordsByWaterYear[record.waterYear]) {
            recordsByWaterYear[record.waterYear] = [];
        }

        recordsByWaterYear[record.waterYear].push(record);

    });

    const waterYearCurves = [];

    // Build one cumulative curve for each water year
    Object.entries(recordsByWaterYear).forEach(([waterYear, rows]) => {

        rows.sort(
            (a, b) => a.waterYearDay - b.waterYearDay
        );

        let cumulative = 0;

        const days = [];
        const cumulativeVolume = [];

        rows.forEach(record => {

            cumulative += record.volume;

            days.push(record.waterYearDay);
            cumulativeVolume.push(cumulative);

        });

        waterYearCurves.push({

            waterYear: Number(waterYear),

            name: waterYear.toString(),

            days,

            cumulativeVolume,

            finalVolume: cumulativeVolume.at(-1)

        });

    });

    // Sort chronologically
    waterYearCurves.sort(
        (a, b) => a.waterYear - b.waterYear
    );

    return waterYearCurves;

}