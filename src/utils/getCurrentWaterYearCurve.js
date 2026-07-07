export function getCurrentWaterYearCurve(waterYearCurves) {

    const today = new Date();

    const currentWaterYear =
        today.getUTCMonth() >= 9
            ? today.getUTCFullYear() + 1
            : today.getUTCFullYear();

    return waterYearCurves.find(
        curve => curve.waterYear === currentWaterYear
    );

}