import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Spiner.module.css";

const Spiner = () => (
  <div className={s.container}>
    <Loader type="Puff" color="#2196f3" height={80} width={80} />
  </div>
);

export default Spiner;
