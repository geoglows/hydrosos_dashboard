import { computePercentileWaterYearCurve }
    from "./computePercentileWaterYearCurve";

export function computeWaterYearCurveStatistics(
    waterYearCurves
) {

    if (waterYearCurves.length === 0) {
        throw new Error("No water year curves were provided.");
    }

    const wettestYear = waterYearCurves.reduce(
        (wettest, curve) =>
            curve.finalVolume > wettest.finalVolume
                ? curve
                : wettest
    );

    const driestYear = waterYearCurves.reduce(
        (driest, curve) =>
            curve.finalVolume < driest.finalVolume
                ? curve
                : driest
    );

    const medianCurve =
        computePercentileWaterYearCurve(
            waterYearCurves,
            50
        );

    medianCurve.name = "Median";

    const percentile25Curve =
        computePercentileWaterYearCurve(
            waterYearCurves,
            25
        );

    percentile25Curve.name = "25th Percentile";

    const percentile75Curve =
        computePercentileWaterYearCurve(
            waterYearCurves,
            75
        );

    percentile75Curve.name = "75th Percentile";

    return {

        wettestYear,

        driestYear,

        medianCurve,

        percentile25Curve,

        percentile75Curve

    };

}