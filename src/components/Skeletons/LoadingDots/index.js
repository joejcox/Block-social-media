import styles from "./dots.module.css"

const LoadingDots = () => (
  <div className="flex justify-center">
    <div
      className={`${styles.dot_flashing} text-main-700 bg-main-700 mb-10 -mt-10`}
    ></div>
  </div>
)

export default LoadingDots
