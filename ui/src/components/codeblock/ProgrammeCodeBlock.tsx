import * as React from "react";

import { AkCodeBlock } from "@atlaskit/code";
import Button from "@atlaskit/button";
import styled from "styled-components";
import VidPlayIcon from "@atlaskit/icon/glyph/vid-play";
import CopyIcon from "@atlaskit/icon/glyph/copy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ModalStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";
import { CodeExecService } from "../../services/code_exec/CodeExec";

const ButtonContent = styled.div`
  display: flex ${props => (props.hidden ? "none" : "block")};
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Container = styled.div`
  position: relative;
`;

export const ProgrammeCodeBlock: React.FunctionComponent<{
  language: string;
  text: string;
}> = props => {
  const [isHover, setIsHover] = React.useState(false);

  const modalDispatch = React.useContext(ModalStore.Dispatch);
  return (
    <Container
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <ButtonContent hidden={!isHover}>
        <Button
          iconBefore={<VidPlayIcon label="play" />}
          appearance="subtle"
          onClick={() => {
            CodeExecService().execute(props.language, props.text);

            modalDispatch({
              type: ModalActions.SHOW_CODE_EXEC_MODAL
            });
          }}
        >
          Run
        </Button>
        <CopyToClipboard text={props.text}>
          <Button iconBefore={<CopyIcon label="copy" />} appearance="subtle" />
        </CopyToClipboard>
      </ButtonContent>
      <AkCodeBlock language={props.language} text={props.text} />
    </Container>
  );
};
