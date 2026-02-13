const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  const loaderComponent = (
    <div className={`loader ${sizeClasses[size]}`} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        {loaderComponent}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      {loaderComponent}
    </div>
  )
}

export default Loader
