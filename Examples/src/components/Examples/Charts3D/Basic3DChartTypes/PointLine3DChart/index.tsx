import * as React from "react";
import classes from "../../../styles/Examples.module.scss";
import { appTheme } from "scichart-example-dependencies";

import {
    SciChart3DSurface,
    CameraController,
    Vector3,
    MouseWheelZoomModifier3D,
    OrbitModifier3D,
    ResetCamera3DModifier,
    NumericAxis3D,
    NumberRange,
    XyzDataSeries3D,
    SpherePointMarker3D,
    TGradientStop,
    parseColorToUIntArgb,
    PointLineRenderableSeries3D,
    HeatmapLegend
} from "scichart";
import { Radix2FFT } from "../../../FeaturedApps/ScientificCharts/AudioAnalyzer/Radix2FFT";

const divElementId = "chart";
const divHeatmapLegend = "heatmapLegend";

type TMetadata = {
    vertexColor: number;
    pointScale: number;
};

// This function generates some spectral data for the waterfall chart
const createSpectralData = (n: number) => {
    const spectraSize = 1024;
    const timeData = new Array(spectraSize);

    // Generate some random data with spectral components
    for (let i = 0; i < spectraSize; i++) {
        timeData[i] =
            4.0 * Math.sin((2 * Math.PI * i) / (20 + n * 0.2)) +
            10 * Math.sin((2 * Math.PI * i) / (10 + n * 0.01)) +
            20 * Math.sin((2 * Math.PI * i) / (5 + n * -0.002)) +
            3.0 * Math.random();
    }

    // Do a fourier-transform on the data to get the frequency domain
    const transform = new Radix2FFT(spectraSize);
    const yValues = transform.run(timeData);
    // .slice(0, 300); // We only want the first N points just to make the example cleaner

    // This is just setting a floor to make the data cleaner for the example
    for (let i = 0; i < yValues.length; i++) {
        yValues[i] =
            yValues[i] < -30 || yValues[i] > -5 ? (yValues[i] < -30 ? -30 : Math.random() * 9 - 6) : yValues[i];
    }
    yValues[0] = -30;

    // we need x-values (sequential numbers) for the frequency data
    const xValues = yValues.map((value, index) => index);

    return { xValues, yValues };
};

// SCICHART CODE
const drawExample = async () => {
    const { sciChart3DSurface, wasmContext } = await SciChart3DSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });
    sciChart3DSurface.worldDimensions = new Vector3(300, 100, 300);
    sciChart3DSurface.camera = new CameraController(wasmContext, {
        position: new Vector3(-141.6, 310.29, 393.32),
        target: new Vector3(0, 50, 0)
    });

    sciChart3DSurface.chartModifiers.add(new MouseWheelZoomModifier3D());
    sciChart3DSurface.chartModifiers.add(new OrbitModifier3D());
    sciChart3DSurface.chartModifiers.add(new ResetCamera3DModifier());

    sciChart3DSurface.xAxis = new NumericAxis3D(wasmContext, {
        axisTitle: "Frequency (Hz)",
        drawMinorGridLines: false,
        drawMajorGridLines: false,
        tickLabelsOffset: 20
    });
    sciChart3DSurface.yAxis = new NumericAxis3D(wasmContext, {
        axisTitle: "Power (dB)",
        drawMinorGridLines: false,
        drawMajorGridLines: false,
        tickLabelsOffset: 20
    });
    sciChart3DSurface.zAxis = new NumericAxis3D(wasmContext, {
        axisTitle: "Time (s)",
        drawMinorGridLines: false,
        drawMajorGridLines: false,
        tickLabelsOffset: 20
    });

    for (let i = 0; i < 50; i++) {
        // Create some data for the example
        // xValues are frequency values (Hz)
        // yValues are heights or magnitude
        const { xValues, yValues } = createSpectralData(i);
        // zValues are the 3rd dimension where we will spread out our series in time
        const zValues = Array.from({ length: xValues.length }).map(_ => i * 2);

        // Metadata in scichart.js 3D controls color 3D line series. It can also hold additional optional properties
        // Below we format the data for yValues into metadata colour coded and scaled depending on the value
        const metadata = formatMetadata(yValues, [
            { offset: 1, color: appTheme.VividPink },
            { offset: 0.9, color: appTheme.VividOrange },
            { offset: 0.7, color: appTheme.MutedRed },
            { offset: 0.5, color: appTheme.VividGreen },
            { offset: 0.3, color: appTheme.VividSkyBlue },
            { offset: 0.2, color: appTheme.Indigo },
            { offset: 0, color: appTheme.DarkIndigo }
        ]);

        // Add a 3D Point-Line chart
        sciChart3DSurface.renderableSeries.add(
            new PointLineRenderableSeries3D(wasmContext, {
                dataSeries: new XyzDataSeries3D(wasmContext, {
                    xValues,
                    yValues,
                    zValues,
                    metadata
                }),
                strokeThickness: 3,
                opacity: 0.5
            })
        );
    }

    return { sciChart3DSurface, wasmContext };
};

function formatMetadata(valuesArray: number[], gradientStops: TGradientStop[]): TMetadata[] {
    const low = Math.min(...valuesArray);
    const high = Math.max(...valuesArray);

    const sGradientStops = gradientStops.sort((a, b) => (a.offset > b.offset ? 1 : -1));
    // Compute a scaling factor from 0...1 where values in valuesArray at the lower end correspond to 0 and
    // values at the higher end correspond to 1
    return valuesArray.map(x => {
        // scale from 0..1 for the values
        const valueScale = (x - low) / (high - low);
        // Find the nearest gradient stop index
        const index = sGradientStops.findIndex(gs => gs.offset >= valueScale);
        // const nextIndex = Math.min(index + 1, sGradientStops.length - 1);
        // work out the colour of this point
        const color1 = parseColorToUIntArgb(sGradientStops[index].color);
        // const color2 = parseColorToUIntArgb(sGradientStops[nextIndex].color);
        // const ratio = (valueScale - sGradientStops[index].offset) / (sGradientStops[nextIndex].offset - sGradientStops[index].offset)
        // const colorScale = uintArgbColorLerp(color1, color2, ratio)
        // console.log(`valueScale ${valueScale} low ${sGradientStops[index].offset} high ${sGradientStops[nextIndex].offset} ratio ${ratio}`);
        return {pointScale: 0.1 + valueScale, vertexColor: color1};
    });
}

const drawHeatmapLegend = async () => {
    const { heatmapLegend, wasmContext } = await HeatmapLegend.create(divHeatmapLegend, {
        theme: {
            ...appTheme.SciChartJsTheme,
            sciChartBackground: appTheme.DarkIndigo + "BB",
            loadingAnimationBackground: appTheme.DarkIndigo + "BB"
        },
        yAxisOptions: {
            axisBorder: {
                borderLeft: 1,
                color: appTheme.ForegroundColor + "77"
            },
            majorTickLineStyle: {
                color: appTheme.ForegroundColor,
                tickSize: 6,
                strokeThickness: 1
            },
            minorTickLineStyle: {
                color: appTheme.ForegroundColor,
                tickSize: 3,
                strokeThickness: 1
            },
            axisTitle: "Power (dB)",
            axisTitleStyle: { fontSize: 14 }
        },
        colorMap: {
            minimum: -30,
            maximum: 0,
            gradientStops: [
                { offset: 1, color: appTheme.VividPink },
                { offset: 0.9, color: appTheme.VividOrange },
                { offset: 0.7, color: appTheme.MutedRed },
                { offset: 0.5, color: appTheme.VividGreen },
                { offset: 0.3, color: appTheme.VividSkyBlue },
                { offset: 0.15, color: appTheme.Indigo },
                { offset: 0, color: appTheme.DarkIndigo }
            ]
        }
    });

    return heatmapLegend;
};

// REACT COMPONENT
export default function PointLine3DChart() {
    const sciChartSurfaceRef = React.useRef<SciChart3DSurface>();
    const heatmapLegendRef = React.useRef<HeatmapLegend>();

    React.useEffect(() => {
        const chartInitializationPromise = Promise.all([
            drawExample(),
            drawHeatmapLegend()
        ]).then(([{ sciChart3DSurface }, legend]) => {
            sciChartSurfaceRef.current = sciChart3DSurface;
            heatmapLegendRef.current = legend;
        });

        return () => {
            // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                sciChartSurfaceRef.current.delete();
                heatmapLegendRef.current.delete();
                sciChartSurfaceRef.current = undefined;
                heatmapLegendRef.current = undefined;
                return;
            }

            // else postpone deletion
            chartInitializationPromise.then(() => {
                sciChartSurfaceRef.current.delete();
                heatmapLegendRef.current.delete();
                sciChartSurfaceRef.current = undefined;
                heatmapLegendRef.current = undefined;
            });
        };
    }, []);

    return (
        <div className={classes.ChartWrapper}>
            <div style={{ position: "relative", height: "100%", width: "100%" }}>
                <div id={divElementId} style={{ position: "absolute", height: "100%", width: "100%" }}></div>
                <div
                    id={divHeatmapLegend}
                    style={{ position: "absolute", height: "95%", width: "110px", right: "20px", margin: "20" }}
                ></div>
            </div>
        </div>
    );
}
