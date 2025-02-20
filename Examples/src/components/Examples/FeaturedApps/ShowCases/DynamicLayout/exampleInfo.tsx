import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";
import exampleImage from "./javascript-dynamic-layout.jpg";

const Subtitle = () => (
    <p>
        Demonstrates a custom modifier which can convert from single chart to grid layout and back using SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

const previewDescription = ``;
const description = `Dynamic layout`;
const tips = [
    ``
];
const documentationLinks: TDocumentationLink[] = [{
    href: ExampleStrings.urlDocumentationHome,
    title: ExampleStrings.titleDocumentationHome,
    linkTitle: "SciChart.js Documentation Home"
}];

export const dynamicLayoutExampleInfo: TExampleInfo = {
    onWebsite: false,
    title: ExampleStrings.titleDynamicLayout,
    pageTitle: ExampleStrings.titleDynamicLayout + ExampleStrings.exampleGenericTitleSuffix,
    path: ExampleStrings.urlDynamicLayout,
    filepath: "FeaturedApps/ShowCases/DynamicLayout",
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    previewDescription,
    githubUrl,
    metaDescription:
        "Demonstrates a custom modifier which can convert from single chart to grid layout and back.",
    metaKeywords: "subcharts, layout, demo, chart, javascript, webgl, canvas",
    thumbnailImage: exampleImage
};
