import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpers/types/types";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";
import exampleImage from "./javascript-realtime-ticking-stock-charts.jpg";

const previewDescription = `An example which demonstrates real-time ticking / updating stock charts in JavaScript with Price data as
Candlesticks or Ohlc and Moving average indicators on the chart.`;
const description = `Technical indicators are for demonstration purposes only. We recommend using the open source TA-Lib`;
const tips = [`You can change the series type from Candlestick to Ohlc to Mountain and more.`];

const documentationLinks: TDocumentationLink[] = [
    {
        href: ExampleStrings.urlDocumentationHome,
        title: ExampleStrings.titleDocumentationHome,
        linkTitle: "SciChart.js Documentation Home"
    },
    {
        href: ExampleStrings.urlTutorialsHome,
        title: ExampleStrings.titleTutorialsHome,
        linkTitle: "SciChart.js Tutorials"
    },
    {
        href: ExampleStrings.urlCandlestickChartDocumentation,
        title: ExampleStrings.urlTitleCandlestickChartDocumentation,
        linkTitle: "JavaScript Candlestick Chart Documentation"
    }
];

const Subtitle = () => (
    <p>
        Get the code view our example to learn how create a <strong>JavaScript Stock Chart</strong>{" "}
        with live real-time ticking and updating, using SciChart.js, our range of{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank" title="High Performance JavaScript Charts">
            High Performance JavaScript Charts
        </a>.
    </p>
);

export const realtimeTickingStockChartsExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleRealtimeTickingStockCharts,
    pageTitle: ExampleStrings.pageTitleRealtimeTickingStockCharts,
    path: ExampleStrings.urlRealtimeTickingStockCharts,
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    previewDescription,
    code,
    githubUrl,
    metaDescription:
        "Create a JavaScript Realtime Ticking Candlestick / Stock Chart with live ticking and updating, using the high performance SciChart.js chart library. Get free demo now.",
    metaKeywords: "real-time, ticking, updating, stock, chart, javascript, webgl, canvas",
    thumbnailImage: exampleImage
};
