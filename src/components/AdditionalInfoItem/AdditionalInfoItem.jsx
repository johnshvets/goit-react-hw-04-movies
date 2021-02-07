import PropTypes from "prop-types";
import s from "./AdditionalInfoItem.module.css";

const AdditionalInfoItem = ({ img, name, description, content }) => (
  <>
    <div className={s.wrapper}>
      {img && (
        <div className={s.imgBox}>
          <img src={`https://image.tmdb.org/t/p/w500${img}`} />
        </div>
      )}
      <div className={s.descriptionBox}>
        <h2 className={s.name}>{name}</h2>
        <p>
          {description}
          {content}
        </p>
      </div>
    </div>
  </>
);
export default AdditionalInfoItem;

AdditionalInfoItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
