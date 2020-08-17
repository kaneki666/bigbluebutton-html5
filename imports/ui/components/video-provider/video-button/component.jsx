import React, { memo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ReactTooltip from "react-tooltip";
import Button from "@material-ui/core/Button";
import VideoService from "../service";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { styles } from "./styles";
import { validIOSVersion } from "/imports/ui/components/app/service";

const intlMessages = defineMessages({
  joinVideo: {
    id: "app.video.joinVideo",
    description: "Join video button label",
  },
  leaveVideo: {
    id: "app.video.leaveVideo",
    description: "Leave video button label",
  },
  videoButtonDesc: {
    id: "app.video.videoButtonDesc",
    description: "video button description",
  },
  videoLocked: {
    id: "app.video.videoLocked",
    description: "video disabled label",
  },
  iOSWarning: {
    id: "app.iOSWarning.label",
    description: "message indicating to upgrade ios version",
  },
});

const propTypes = {
  intl: intlShape.isRequired,
  hasVideoStream: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  mountVideoPreview: PropTypes.func.isRequired,
};

const JoinVideoButton = ({
  intl,
  hasVideoStream,
  isDisabled,
  mountVideoPreview,
}) => {
  const exitVideo = () =>
    hasVideoStream && !VideoService.isMultipleCamerasEnabled();

  const handleOnClick = () => {
    if (!validIOSVersion()) {
      return VideoService.notify(intl.formatMessage(intlMessages.iOSWarning));
    }

    if (exitVideo()) {
      VideoService.exitVideo();
    } else {
      mountVideoPreview();
    }
  };

  const label = exitVideo()
    ? intl.formatMessage(intlMessages.leaveVideo)
    : intl.formatMessage(intlMessages.joinVideo);

  return (
   <Button variant="contained" size="small" color="primary"
      data-tip
      data-for="sharewebcam"
      onClick={handleOnClick}
      disabled={isDisabled}
    >
    Camera
      <ReactTooltip id="sharewebcam">
        <span>Camera On | Off</span>
      </ReactTooltip>
    </Button>
  );
};

JoinVideoButton.propTypes = propTypes;

export default injectIntl(memo(JoinVideoButton));
