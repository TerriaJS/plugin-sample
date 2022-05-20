import { observer } from "mobx-react";
import React from "react";
import { Icon, ViewState } from "terriajs-plugin-api";
import WorkflowPanel from "terriajs/lib/ReactViews/Workflow/WorkflowPanel";

interface PropsType {
  viewState: ViewState;
}

// Note: we need to wrap this in observer() right now or else it results in a render loop.
// Will have to debug that later.
const TestTool: React.FC<PropsType> = observer((props: PropsType) => {
  return (
    <WorkflowPanel
      viewState={props.viewState}
      title="Test tool"
      icon={Icon.GLYPHS.cube}
      closeButtonText="Close"
      onClose={() => {props.viewState.closeTool()}}>
      <p>Hello, world</p>
    </WorkflowPanel>
  );
});

export default TestTool;
