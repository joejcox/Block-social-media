const Button = ({ children, click, type, submitting }) => {
  return (
    <button
      type={type}
      onClick={() => click()}
      className="bg-purple-700 mt-4 text-white text-sm py-3 rounded-full w-full md:w-auto md:px-8 cursor-pointer hover:bg-purple-800"
      disabled={submitting}
    >
      {children}
    </button>
  )
}

export default Button
