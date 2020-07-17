import React from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import Button from "/imports/ui/components/button/component";
import MediaService from "/imports/ui/components/media/service";
import ReactTooltip from "react-tooltip";
import IconButton from "@material-ui/core/IconButton";
import { IconContext } from "react-icons";
import { RiArtboardLine } from "react-icons/ri";

const propTypes = {
  intl: intlShape.isRequired,
  toggleSwapLayout: PropTypes.func.isRequired,
};

const intlMessages = defineMessages({
  restorePresentationLabel: {
    id: "app.actionsBar.actionsDropdown.restorePresentationLabel",
    description: "Restore Presentation option label",
  },
  restorePresentationDesc: {
    id: "app.actionsBar.actionsDropdown.restorePresentationDesc",
    description: "button to restore presentation after it has been closed",
  },
});

const shouldUnswapLayout = () =>
  MediaService.shouldShowScreenshare() ||
  MediaService.shouldShowExternalVideo();

const PresentationOptionsContainer = ({
  intl,
  toggleSwapLayout,
  isThereCurrentPresentation,
}) => {
  if (shouldUnswapLayout()) toggleSwapLayout();
  return (
    <IconButton
      data-test="joinVideo"
      onClick={toggleSwapLayout}
      id="restore-presentation"
      disabled={!isThereCurrentPresentation}
      data-tip
      data-for="presentation"
    >
      <IconContext.Provider
        value={{
          color: "#ff5e5e",
          size: "1.5em",
          className: "global-class-name",
        }}
      >
        <div>
          <RiArtboardLine />
        </div>
      </IconContext.Provider>
      <ReactTooltip id="presentation">
        <span>প্রেজেন্টেশন বড় করুন</span>
      </ReactTooltip>
    </IconButton>
  );
};

PresentationOptionsContainer.propTypes = propTypes;
export default injectIntl(PresentationOptionsContainer);
