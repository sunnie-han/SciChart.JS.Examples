import * as path from "path";
import * as fs from "fs";
import { Request, Response } from "express";
import { getParameters } from "codesandbox/lib/api/define";
import { EXAMPLES_PAGES, TExampleInfo } from "../components/AppRouter/examplePages";
const pj = require("../../package.json");

interface IFiles {
    [key: string]: {
        content: string;
        isBinary: boolean;
    };
}

let csStyles: IFiles;
const loadStyles = async (folderPath: string) => {
    if (!csStyles) {
        const basePath = path.join(folderPath, "styles", "_base.scss");
        const base = await fs.promises.readFile(basePath, "utf8");
        const mixinsPath = path.join(folderPath, "styles", "mixins.scss");
        const mixins = await fs.promises.readFile(mixinsPath, "utf8");
        const examplesPath = path.join(folderPath, "styles", "Examples.module.scss");
        const examples = await fs.promises.readFile(examplesPath, "utf8");
        const componentPath = path.join(folderPath, "SciChartComponent.tsx");
        const component = await fs.promises.readFile(componentPath, "utf8");
        csStyles = {
            "src/styles/_base.scss": { content: base, isBinary: false },
            "src/styles/mixins.scss": { content: mixins, isBinary: false },
            "src/styles/Examples.module.scss": { content: examples, isBinary: false },
            "src/SciChartComponent.tsx": { content: component, isBinary: false }
        };
    }
};

const getCodeSandBoxForm = async (folderPath: string, currentExample: TExampleInfo) => {
    const tsPath = path.join(folderPath, "index.tsx");
    let code = await fs.promises.readFile(tsPath, "utf8");
    const localImports = Array.from(code.matchAll(/import.*from ["']\.\/(.*)["'];/g));
    code = code.replace(/\.\.\/.*styles\/Examples\.module\.scss/, `./styles/Examples.module.scss`);
    code = code.replace(/\.\.\/.*SciChartComponent/, `./SciChartComponent.tsx`);
    let files: IFiles = {
        "package.json": {
            // @ts-ignore
            content: {
                name: currentExample.path.replace("/", ""),
                version: "1.0.0",
                main: "src/index.tsx",
                scripts: {
                    start: "react-scripts start",
                    build: "react-scripts build",
                    test: "react-scripts test --env=jsdom",
                    eject: "react-scripts eject"
                },
                dependencies: {
                    "@material-ui/core": "4.12.4",
                    "@material-ui/lab": "4.0.0-alpha.61",
                    "sass": "^1.49.9",
                    "loader-utils": "3.2.1",
                    "react": "^17.0.2",
                    "react-dom": "^17.0.2",
                    "react-scripts": "5.0.1",
                    scichart: pj.dependencies.scichart,
                    "scichart-example-dependencies": pj.dependencies["scichart-example-dependencies"],
                    ...currentExample.extraDependencies
                },
                devDependencies: {
                    "@types/react": "^17.0.52",
                    "@types/react-dom": "18.0.9",
                    "@babel/runtime": "7.13.8",
                    "typescript": "4.9.5"
                },
                browserslist: [">0.2%", "not dead", "not ie <= 11", "not op_mini all"]
            }
        },
        "src/App.tsx": {
            content: code,
            isBinary: false
        },
        "src/index.tsx": {
            content: `
            import { hydrate } from "react-dom";
import { SciChartSurface, SciChart3DSurface } from "scichart";

import App from "./App";

const rootElement = document.getElementById("root");
SciChartSurface.useWasmFromCDN();
SciChart3DSurface.useWasmFromCDN();
hydrate( <App />, rootElement);
`,
            isBinary: false
        },
        "tsconfig.json": {
            content: `{
  "include": [
      "./src/**/*"
  ],
  "compilerOptions": {
      "strict": false,
      "esModuleInterop": true,
      "target": "es5",
      "downlevelIteration": true,
      "lib": [
          "dom",
          "es2015"
      ],
      "typeRoots": ["./src/types", "./node_modules/@types"],
      "jsx": "react-jsx"
  }
}`,
      isBinary: false
    },
      "sandbox.config.json": {
          content: `{
    "infiniteLoopProtection": false,
    "hardReloadOnChange": false,
    "view": "browser"
}`,
          isBinary: false
      },
      "src/types/declaration.d.ts": {
        content: `declare module "*.scss" {
            const content: Record<string, string>;
            export default content;
        }`,
        isBinary: false
      },
      "src/types/jpg.d.ts": {
        content: `declare module "*.jpg" {
            const value: any;
            export default value;
        }`,
        isBinary: false
      },
      "src/types/png.d.ts": {
        content: `declare module "*.png" {
            const value: any;
            export default value;
        } `,
        isBinary: false
      },
      "src/types/svg.d.ts": {
        content: `declare module "*.svg" {
            const value: any;
            export default value;
        }`,
        isBinary: false
      },
      "public/index.html": {
        content: `<!DOCTYPE html>
        <html lang="en">
          <head>
          <title>React App</title>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
          </body>
        </html>`,
        isBinary: false
      }
  };

  if (currentExample.sandboxConfig) {
    files["sandbox.config.json"] = {
      // @ts-ignore
      content: currentExample.sandboxConfig,
      isBinary: false
    };
  }
  files = {...files, ...csStyles };
    for (const localImport of localImports) {
        if (localImport.length > 1) {
            let content: string = "";
            try {
                const filepath = path.join(folderPath, localImport[1] + ".ts");
                const csPath = "src/" + localImport[1] + ".ts";
                content = await fs.promises.readFile(filepath, "utf8");
                files[csPath] = { content, isBinary: false };
            } catch (e) {
                const filepath = path.join(folderPath, localImport[1] + ".tsx");
                const csPath = "src/" + localImport[1] + ".tsx";
                content = await fs.promises.readFile(filepath, "utf8");
                files[csPath] = { content, isBinary: false };
            }
            const nestedImports = Array.from(content.matchAll(/import.*from "\.\/(.*)";/g));
            if (nestedImports.length > 0) {
                localImports.push(...nestedImports);
            }
        }
    }

    const parameters = getParameters({ files });
    return `<form name="codesandbox" id="codesandbox" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST">
        <input type="hidden" name="parameters" value="${parameters}" />
    </form>`;
};

const renderCodeSandBoxRedirectPage = (form: string) => {
    return `
    <html lang="en-us">
      <head>
          <meta charset="utf-8" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>SciChart.js Documentation Examples</title>
      </head>
      <body>
        <p>Redirecting To codesandbox...</p>
        ${form}
        <script type="text/javascript">
          document.querySelector("#codesandbox").submit();
        </script>
      </body>
  </html>`;
};

export const renderCodeSandBoxRedirect = async (req: Request, res: Response) => {
    const basePath = path.join(__dirname, "Examples");
    await loadStyles(basePath);
    // For charts without layout we use '/iframe' prefix, for example '/iframe/javascript-multiline-labels'
    const isIFrame = req.path.substring(1, 7) === "iframe";
    const pathname = isIFrame ? req.path.substring(7) : req.path;
    const currentExampleKey = Object.keys(EXAMPLES_PAGES).find(key => EXAMPLES_PAGES[key].path === pathname);
    const currentExample = EXAMPLES_PAGES[currentExampleKey];
    try {
        const folderPath = path.join(basePath, currentExample.filepath);
        const form = await getCodeSandBoxForm(folderPath, currentExample);
        const page = renderCodeSandBoxRedirectPage(form);
        res.send(page);
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
};
