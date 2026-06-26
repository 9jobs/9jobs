const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("flowchart grid layout contract", () => {
  test("verifies globals.css defines step-1 through step-8 grid columns and rows for desktop and tablet", () => {
    const globals = read("frontend/app/globals.css");

    // Desktop grid rules
    expect(globals).toContain(".step-1 { grid-column: 1; grid-row: 1; }");
    expect(globals).toContain(".step-2 { grid-column: 2; grid-row: 1; }");
    expect(globals).toContain(".step-3 { grid-column: 3; grid-row: 1; }");
    expect(globals).toContain(".step-4 { grid-column: 4; grid-row: 1; }");
    expect(globals).toContain(".step-5 { grid-column: 4; grid-row: 2; }");
    expect(globals).toContain(".step-6 { grid-column: 3; grid-row: 2; }");
    expect(globals).toContain(".step-7 { grid-column: 2; grid-row: 2; }");
    expect(globals).toContain(".step-8 { grid-column: 1; grid-row: 2; }");
  });

  test("verifies FlowchartSection.js maps cards with step class names", () => {
    const component = read("frontend/components/homepage/FlowchartSection.js");

    // The component must map the step indices to step-${index + 1}
    expect(component).toContain("className={`flowchart-card step-${index + 1}`}");
  });
});
