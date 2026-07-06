import Plotly from "plotly.js-dist-min";

import { buildRecords } from "../utils/buildRecords";
import { computeWaterYearCurves } from "../utils/waterYear";

export function plotCumulativeVolume(data) {

    const records = buildRecords(data);

    const waterYearCurves =
        computeWaterYearCurves(records);

    const traces = waterYearCurves.map(curve => ({

        x: curve.days,

        y: curve.cumulativeVolume.map(
            volume => volume / 1e9
        ),

        mode: "lines",

        name: curve.waterYear,

        line: {
            width: 1
        },

        opacity: 0.2

    }));

    Plotly.newPlot(
        "cumulative-volume",
        traces,
        {

            title: "Historical Cumulative Volume",

            xaxis: {
                title: "Water Year Day"
            },

            yaxis: {
                title: "Cumulative Volume (billion m³)"
            },

            showlegend: false

        }
    );

}