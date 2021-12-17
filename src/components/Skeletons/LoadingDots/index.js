import styles from "./dots.module.css"

const LoadingDots = () => (
  <div
    class={`${styles.dot_flashing} text-main-700 bg-main-700 mb-10 -mt-10`}
  ></div>
)

export default LoadingDots
