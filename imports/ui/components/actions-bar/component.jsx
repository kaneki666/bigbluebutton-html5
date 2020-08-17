import React, { PureComponent } from "react";
import cx from "classnames";
import ReactTooltip from "react-tooltip";
import { styles } from "./styles.scss";
import DesktopShare from "./desktop-share/component";
import ActionsDropdown from "./actions-dropdown/component";
import AudioControlsContainer from "../audio/audio-controls/container";
import JoinVideoOptionsContainer from "../video-provider/video-button/container";
import CaptionsButtonContainer from "/imports/ui/components/actions-bar/captions/container";
import PresentationOptionsContainer from "./presentation-options/component";
import IconButton from "@material-ui/core/IconButton";
import { IconContext } from "react-icons";
import { FcEndCall } from "react-icons/fc";
import { withModalMounter } from "/imports/ui/components/modal/service";
import EndMeetingConfirmationContainer from "/imports/ui/components/end-meeting-confirmation/container";

class ActionsBar extends PureComponent {
  render() {
    const {
      amIPresenter,
      handleShareScreen,
      handleUnshareScreen,
      isVideoBroadcasting,
      amIModerator,
      screenSharingCheck,
      enableVideo,
      isLayoutSwapped,
      toggleSwapLayout,
      handleTakePresenter,
      intl,
      currentSlidHasContent,
      parseCurrentSlideContent,
      isSharingVideo,
      screenShareEndAlert,
      stopExternalVideoShare,
      screenshareDataSavingSetting,
      isCaptionsAvailable,
      isMeteorConnected,
      isPollingEnabled,
      isThereCurrentPresentation,
      allowExternalVideo,
      presentations,
      setPresentation,
      podIds,
      mountModal,
    } = this.props;

    const actionBarClasses = {};

    actionBarClasses[styles.centerWithActions] = amIPresenter;
    actionBarClasses[styles.center] = true;
    actionBarClasses[styles.mobileLayoutSwapped] =
      isLayoutSwapped && amIPresenter;

    return (
      <div className={styles.actionsbar}>
        <div className={styles.left}>
          <ActionsDropdown
            {...{
              amIPresenter,
              amIModerator,
              isPollingEnabled,
              allowExternalVideo,
              handleTakePresenter,
              intl,
              isSharingVideo,
              stopExternalVideoShare,
              isMeteorConnected,
              presentations,
              setPresentation,
              podIds,
            }}
          />
          {isCaptionsAvailable ? (
            <CaptionsButtonContainer {...{ intl }} />
          ) : null}
        </div>
        <div className={cx(actionBarClasses)}>
          <AudioControlsContainer />
          {enableVideo ? <JoinVideoOptionsContainer /> : null}
          <DesktopShare
            {...{
              handleShareScreen,
              handleUnshareScreen,
              isVideoBroadcasting,
              amIPresenter,
              screenSharingCheck,
              screenShareEndAlert,
              isMeteorConnected,
              screenshareDataSavingSetting,
            }}
          />
        </div>
        <div className={styles.right}>
          {isLayoutSwapped ? (
            <PresentationOptionsContainer
              toggleSwapLayout={toggleSwapLayout}
              isThereCurrentPresentation={isThereCurrentPresentation}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default withModalMounter(ActionsBar);
