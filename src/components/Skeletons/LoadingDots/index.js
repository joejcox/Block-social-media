import styles from "./dots.module.css"

const LoadingDots = () => (
  <div
    class={`${styles.dot_flashing} text-purple-700 bg-purple-700 mb-10 -mt-10`}
  ></div>
)

export default LoadingDots
