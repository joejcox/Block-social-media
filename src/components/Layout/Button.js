const Button = ({ children, click, type, submitting, outline }) => (
  <button
    type={type}
    onClick={() => click()}
    className={`${
      outline
        ? "text-main-700 hover:bg-main-700 hover:text-white mr-2"
        : "bg-main-700 text-white hover:bg-main-800 hover:border-main-800"
    } mt-4 border-2 border-main-700 text-sm py-3 rounded-full w-full xl:w-auto md:px-8 cursor-pointer`}
    disabled={submitting}
  >
    {children}
  </button>
)

export default Button
