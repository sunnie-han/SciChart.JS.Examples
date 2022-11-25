import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpers/types/types";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";
import exampleImage from "./javascript-style-animation.jpg"

const previewDescription = ``;// `Demonstrates how to run style and data animations simultaneously for a JavaScript Chart.`;
const description = `By clicking the buttons the chart styles and data transform from one value to another`;
const tips: string[] = ["Use runAnimation or enqueueAnimation method"];

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
        href: ExampleStrings.urlStyleAnimationDocumentation,
        title: ExampleStrings.urlTitleStyleAnimationDocumentation,
        linkTitle: "JavaScript Style Transition Animation Documentation"
    },
    {
        href: ExampleStrings.urlRenderSeriesPropertiesDocumentation,
        title: ExampleStrings.urlTitleRenderSeriesProperties,
        linkTitle: "Common RenderableSeries Properties"
    }
];

const Subtitle = () => (
    <p>
        Demonstrates how to run <strong>Style Transition Animations</strong> using SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

export const styleAnimationExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleStyleAnimation,
    pageTitle: ExampleStrings.titleStyleAnimation + ExampleStrings.exampleGenericTitleSuffix,
    path: ExampleStrings.urlStyleAnimation,
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    previewDescription,
    code,
    githubUrl,
    metaDescription: "Demonstrates how to run Style Transition Animations with JavaScript.",
    metaKeywords: "style, animation, javascript, webgl, canvas",
    thumbnailImage: exampleImage
};
