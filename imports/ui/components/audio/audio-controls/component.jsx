import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ReactTooltip from "react-tooltip";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import { IconContext } from "react-icons";
import { AiTwotoneAudio } from "react-icons/ai";
import { FiHeadphones } from "react-icons/fi";
import getFromUserSettings from "/imports/ui/services/users-settings";
import withShortcutHelper from "/imports/ui/components/shortcut-help/service";
import { styles } from "./styles";

const intlMessages = defineMessages({
  joinAudio: {
    id: "app.audio.joinAudio",
    description: "Join audio IconButton label",
  },
  leaveAudio: {
    id: "app.audio.leaveAudio",
    description: "Leave audio IconButton label",
  },
  muteAudio: {
    id: "app.actionsBar.muteLabel",
    description: "Mute audio IconButton label",
  },
  unmuteAudio: {
    id: "app.actionsBar.unmuteLabel",
    description: "Unmute audio IconButton label",
  },
});

const propTypes = {
  processToggleMuteFromOutside: PropTypes.func.isRequired,
  handleToggleMuteMicrophone: PropTypes.func.isRequired,
  handleJoinAudio: PropTypes.func.isRequired,
  handleLeaveAudio: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  showMute: PropTypes.bool.isRequired,
  inAudio: PropTypes.bool.isRequired,
  listenOnly: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  talking: PropTypes.bool.isRequired,
};

class AudioControls extends PureComponent {
  componentDidMount() {
    const { processToggleMuteFromOutside } = this.props;
    if (
      Meteor.settings.public.allowOutsideCommands.toggleSelfVoice ||
      getFromUserSettings("bbb_outside_toggle_self_voice", false)
    ) {
      window.addEventListener("message", processToggleMuteFromOutside);
    }
  }

  render() {
    const {
      handleToggleMuteMicrophone,
      handleJoinAudio,
      handleLeaveAudio,
      showMute,
      muted,
      disable,
      talking,
      inAudio,
      listenOnly,
      intl,
      shortcuts,
      isVoiceUser,
    } = this.props;

    let joinIcon = "audio_off";
    if (inAudio) {
      if (listenOnly) {
        joinIcon = "listen";
      } else {
        joinIcon = "audio_on";
      }
    }

    return (
      <span className={styles.container}>
        {showMute && isVoiceUser ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleToggleMuteMicrophone}
            data-tip
            data-for="mute"
          >
            Microphone
            <ReactTooltip id="mute">
              <span>মিউট অথবা আনমিউট</span>
            </ReactTooltip>
          </Button>
        ) : null}
        {/* <IconButton
          onClick={inAudio ? handleLeaveAudio : handleJoinAudio}
          data-tip
          data-for="joinaundio"
        >
          <IconContext.Provider
            value={{
              color: "white",
              size: "1.5em",
              className: "global-class-name",
            }}
          >
            <div>
              <FiHeadphones />
            </div>
          </IconContext.Provider>
          <ReactTooltip id="joinaundio">
            <span>অডিও ওপেন</span>
          </ReactTooltip>
        </IconButton> */}
      </span>
    );
  }
}

AudioControls.propTypes = propTypes;

export default withShortcutHelper(injectIntl(AudioControls), [
  "joinAudio",
  "leaveAudio",
  "toggleMute",
]);
