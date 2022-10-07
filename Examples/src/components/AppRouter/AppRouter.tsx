import * as React from "react";
import { Switch, Route } from "react-router-dom";
import PageHome from "../PageHome/PageHome";
import { PAGES } from "./pages";
import { EXAMPLES_PAGES, TExamplePage } from "./examplePages";
import ExamplesRoot from "../Examples/ExamplesRoot";
import { getExampleComponent } from "./examples";

type TProps = {
    currentExample: TExamplePage;
    isIFrame?: boolean;
};

const examplePagesKeys = Object.keys(EXAMPLES_PAGES);

export default function AppRouter(props: TProps) {
    const { currentExample, isIFrame = false } = props;
    if (isIFrame) {
        const ExampleComponent = getExampleComponent(currentExample.id);
        return (
            <Switch>
                {examplePagesKeys.map(key => {
                    const exPage = EXAMPLES_PAGES[key];
                    return <Route key={key} path={`/iframe${exPage.path}`} component={ExampleComponent} />;
                })}
            </Switch>
        );
    } else {
        return (
            <Switch>
                {examplePagesKeys.map(key => {
                    const exPage = EXAMPLES_PAGES[key];
                    return (
                        <Route
                            key={key}
                            path={exPage.path}
                            render={() => <ExamplesRoot examplePage={currentExample} />}
                        />
                    );
                })}
                <Route path={PAGES.homapage.path} component={PageHome} />
            </Switch>
        );
    }
}
