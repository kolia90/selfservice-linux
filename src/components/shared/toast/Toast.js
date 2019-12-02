// @flow
import toast from "toasted-notes";
import "./Toast.scss";

const Toast = (message) => {
  toast.notify(message, {
    duration: 2000,
    position: 'bottom'
  });
  return null
};

export default Toast;
