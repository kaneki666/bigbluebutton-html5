import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import cx from "classnames";
import Icon from "/imports/ui/components/icon/component";
import { IconContext } from "react-icons";
import {
  FcEndCall,
  FcConferenceCall,
  FcVoicePresentation,
  FcVideoCall,
} from "react-icons/fc";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {
  FaSortAlphaDown,
  FaVolumeMute,
  FaVolumeUp,
  FaDownload,
  FaCopy,
} from "react-icons/fa";
import {
  MdSettings,
  MdWarning,
  MdClosedCaption,
  MdLock,
  MdFullscreen,
  MdInfo,
  MdLiveHelp,
  MdFormatClear,
  MdDelete,
  MdPoll,
} from "react-icons/md";
import { styles } from "../styles";

const propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
};

const defaultProps = {
  icon: "",
  label: "",
  description: "",
  tabIndex: 0,
};

export default class DropdownListItem extends Component {
  constructor(props) {
    super(props);
    this.labelID = _.uniqueId("dropdown-item-label-");
    this.descID = _.uniqueId("dropdown-item-desc-");
  }

  renderDefault() {
    const { icon, label, iconRight } = this.props;

    return [
      icon ? (
        <IconContext.Provider
          value={{
            size: "1.2em",
          }}
        >
          <div className={styles.itemIcon}>
            {icon === "fullscreen" ? (
              <MdFullscreen />
            ) : icon === "settings" ? (
              <MdSettings />
            ) : icon === "about" ? (
              <MdInfo />
            ) : icon === "help" ? (
              <MdLiveHelp />
            ) : icon === "shortcuts" ? (
              <FaSortAlphaDown />
            ) : icon === "application" ? (
              <FcEndCall />
            ) : icon === "logout" ? (
              <RiLogoutCircleRLine />
            ) : icon === "clear_status" ? (
              <MdFormatClear />
            ) : icon === "mute" ? (
              <FaVolumeMute />
            ) : icon === "unmute" ? (
              <FaVolumeUp />
            ) : icon === "download" ? (
              <FaDownload />
            ) : icon === "lock" ? (
              <MdLock />
            ) : icon === "warning" ? (
              <MdWarning />
            ) : icon === "rooms" ? (
              <FcConferenceCall />
            ) : icon === "closed_caption" ? (
              <MdClosedCaption />
            ) : icon === "chatCopy" ? (
              <FaCopy />
            ) : icon === "chatClear" ? (
              <MdDelete />
            ) : icon === "polling" ? (
              <MdPoll />
            ) : icon === "presentation" ? (
              <FcVoicePresentation />
            ) : icon === "video" ? (
              <FcVideoCall />
            ) : (
              ""
            )}
          </div>
        </IconContext.Provider>
      ) : null,
      <span className={styles.itemLabel} key="label">
        {label}
      </span>,
      iconRight ? (
        <Icon
          iconName={iconRight}
          key="iconRight"
          className={styles.iconRight}
        />
      ) : null,
    ];
  }

  render() {
    const {
      id,
      label,
      description,
      children,
      injectRef,
      tabIndex,
      onClick,
      onKeyDown,
      className,
      style,
    } = this.props;

    return (
      <li
        id={id}
        ref={injectRef}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        aria-labelledby={this.labelID}
        aria-describedby={this.descID}
        className={cx(styles.item, className)}
        style={style}
        role="menuitem"
        data-test={this.props["data-test"]}
      >
        {children || this.renderDefault()}
        {label ? (
          <span id={this.labelID} key="labelledby" hidden>
            {label}
          </span>
        ) : null}
        <span id={this.descID} key="describedby" hidden>
          {description}
        </span>
      </li>
    );
  }
}

DropdownListItem.propTypes = propTypes;
DropdownListItem.defaultProps = defaultProps;
