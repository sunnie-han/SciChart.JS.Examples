import { EInnerAxisPlacementCoordinateMode } from "scichart/Charting/LayoutManager/EInnerAxisPlacementCoordinateMode";
import { CentralAxesLayoutManager } from "scichart/Charting/LayoutManager/CentralAxesLayoutManager";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { SciChartSurface } from "scichart";
import { NumberRange } from "scichart/Core/NumberRange";

export async function configureCentralAxesLayoutManager(divElementId: string) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId);
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);

    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);

    // EInnerAxisPlacementCoordinateMode.DataValue mode means that the axis would be placed accordingly to the coordinate values of the orthogonal axis (Y Axis in this example).
    const options = {
        horizontalAxisPositionCoordinateMode: EInnerAxisPlacementCoordinateMode.DataValue,
        verticalAxisPositionCoordinateMode: EInnerAxisPlacementCoordinateMode.Pixel,
        horizontalAxisPosition: 0,
        verticalAxisPosition: 100,

    };
    sciChartSurface.layoutManager = new CentralAxesLayoutManager(options);
}

export async function configureAxesLayoutStrategies(divElementId: string) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId);
    const xAxis = new NumericAxis(wasmContext, { isInnerAxis: true });
    const yAxis = new NumericAxis(wasmContext);

    sciChartSurface.layoutManager.bottomInnerAxesLayoutStrategy.coordinateMode = EInnerAxisPlacementCoordinateMode.Pixel;
    sciChartSurface.layoutManager.bottomInnerAxesLayoutStrategy.axisPosition = 100;

    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);
}

export async function customAxisIds(divElementId: string) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId);
    const ID_Y_AXIS_1 = "yAxis1";
    const ID_Y_AXIS_2 = "yAxis2";

    const xAxis = new NumericAxis(wasmContext, { isInnerAxis: true });
    const yAxis1 = new NumericAxis(wasmContext, { id: ID_Y_AXIS_1 });
    const yAxis2 = new NumericAxis(wasmContext, { id: ID_Y_AXIS_2, visibleRange: new NumberRange(-5, 5) });

    sciChartSurface.layoutManager.bottomInnerAxesLayoutStrategy.orthogonalAxisId = ID_Y_AXIS_1;
    // the xAxis will be positioned accordingly to value on the yAxis1
    sciChartSurface.layoutManager.bottomInnerAxesLayoutStrategy.axisPosition = 3;

    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis1);
    sciChartSurface.yAxes.add(yAxis2);
}
