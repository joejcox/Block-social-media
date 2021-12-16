const PageTitle = ({ children, mb }) => {
  return (
    <div className={`page-title text-center py-8 border-b mb-${mb ? mb : 20}`}>
      <h1 className="text-3xl text-main-700 py-2 px-6 inline-block break-words font-primary">
        {children}
      </h1>
    </div>
  )
}

export default PageTitle
