const Button = ({ children, click, type, submitting, outline }) => (
  <button
    type={type}
    onClick={() => click()}
    className={`${
      outline
        ? "text-purple-700 hover:bg-purple-700 hover:text-white mr-2"
        : "bg-purple-700 text-white hover:bg-purple-800 hover:border-purple-800"
    } mt-4 border-2 border-purple-700 text-sm py-3 rounded-full w-full md:w-auto md:px-8 cursor-pointer`}
    disabled={submitting}
  >
    {children}
  </button>
)

export default Button
