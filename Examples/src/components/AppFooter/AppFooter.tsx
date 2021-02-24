import * as React from "react";
import {
    MENU_ITEMS_2D,
    MENU_ITEMS_2D_ID,
    MENU_ITEMS_3D,
    MENU_ITEMS_3D_ID,
    MENU_ITEMS_FEATURED_APPS,
    MENU_ITEMS_FEATURED_APPS_ID
} from "../AppRouter/examples";
import FooterGrid from "./FooterGrid";
import { useHistory } from "react-router-dom";
import { Link, Typography } from "@material-ui/core";
// import "./AppFooter.scss";
import classes from "./AppFooter.module.scss";
import Box from "../shared/Helpers/Box/Box";

export type TFooterlink = {
    link: string;
    text: string;
};

export default function AppFooter() {
    const history = useHistory();

    const historyPushPath = (path: string) => {
        if (!path) return;
        history.push(path);
    };

    return (
        <>
            {/* <div className="Some"> */}
            <div className={classes.AppFooter}>
                <Box mb={32}>
                    <h4>All JavaScript Chart Examples</h4>
                </Box>
                <FooterGrid
                    historyPushPath={historyPushPath}
                    title="Featured Apps"
                    menuItems={MENU_ITEMS_FEATURED_APPS}
                    menuItemsId={MENU_ITEMS_FEATURED_APPS_ID}
                />
                <FooterGrid
                    historyPushPath={historyPushPath}
                    title="2D Charts"
                    menuItems={MENU_ITEMS_2D}
                    menuItemsId={MENU_ITEMS_2D_ID}
                />
                <FooterGrid
                    historyPushPath={historyPushPath}
                    title="3D Charts"
                    menuItems={MENU_ITEMS_3D}
                    menuItemsId={MENU_ITEMS_3D_ID}
                />
                <Box mb={32}>
                    <h4>SciChart.js: Fast, Realtime, High Performance </h4>
                    <Box mt={8} className={classes.SiteLinks}>
                        <Link
                            className={classes.Link}
                            title="JavaScript Charts"
                            href="https://www.scichart.com/javascript-chart-features"
                        >
                            <p>JavaScript Charts</p>
                        </Link>

                        <Link className={classes.Link} title="JavaScript Chart Examples" href="/">
                            <Typography> JavaScript Chart Examples</Typography>
                        </Link>

                        <Link className={classes.Link} title="Sitemap" href="/sitemap.xml">
                            <Typography> Sitemap</Typography>
                        </Link>
                    </Box>
                </Box>
            </div>
        </>
    );
}
