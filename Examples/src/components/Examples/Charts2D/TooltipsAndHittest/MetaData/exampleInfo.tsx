import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpers/types/types";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";
import exampleImage from "./javascript-chart-metadata.jpg";

const previewDescription = `Demonstrates the Metadata API, which allows you to associate custom data to each point,
which can be displayed using cursor or rollover modifiers, or used to drive a palletprovider.`;
const description = `The metadata holds a text value and the value of the previous data point, which is used by the pallet provider to color
increasing and decreasing parts of the chart.`;
const tips = [
    `MetaData can be anything that implements IPointMetadata.  You do not have to assign metadata to every point.`
];

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
        href: ExampleStrings.urlMetaDataDocumentation,
        title: ExampleStrings.urlTitleMetaDataDocumentation,
        linkTitle: "MetaData API documentation"
    }
];

const Subtitle = () => (
    <p>
        Demonstrates how to add and use <strong>MetaData</strong> in a chart using SciChart.js, High
        Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

export const metaDataExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleMetaData,
    pageTitle: ExampleStrings.titleMetaData + ExampleStrings.exampleGenericTitleSuffix,
    path: ExampleStrings.urlMetaData,
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    previewDescription,
    code,
    githubUrl,
    metaDescription:
        "Demonstrates using MetaData in a JavaScript Chart - add custom data to points for display or to drive visual customisation",
    metaKeywords: "metaData, api, chart, javascript, webgl, canvas",
    thumbnailImage: exampleImage
};
