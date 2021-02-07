import PropTypes from "prop-types";
import s from "./PageHeading.module.css";

const PageHeading = ({ text }) => <h1 className={s.title}>{text}</h1>;

export default PageHeading;

PageHeading.propTypes = {
  text: PropTypes.string.isRequired,
};
