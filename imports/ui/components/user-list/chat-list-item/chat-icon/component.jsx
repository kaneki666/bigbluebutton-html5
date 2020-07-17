import React from "react";
import PropTypes from "prop-types";
import Icon from "/imports/ui/components/icon/component";
import { IoMdChatbubbles } from "react-icons/io";
import { IconContext } from "react-icons";

import { styles } from "./styles";

const propTypes = {
  icon: PropTypes.string.isRequired,
};

const defaultProps = {};

const ChatIcon = (props) => (
  <div className={styles.chatThumbnail}>
    <IconContext.Provider
      value={{
        size: "0.7em",
      }}
    >
      <div>
        <IoMdChatbubbles />
      </div>
    </IconContext.Provider>
  </div>
);

ChatIcon.propTypes = propTypes;
ChatIcon.defaultProps = defaultProps;

export default ChatIcon;
