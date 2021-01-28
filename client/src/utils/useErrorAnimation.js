import React from 'react'

function useErrorAnimation() {
  const [hasErrorAnimationClass, setHasErrorAnimationClass] = React.useState(false)
  const errorAnimation = () => {
    setHasErrorAnimationClass(true)
    setTimeout(() => setHasErrorAnimationClass(false), 820)
  }

  return { hasErrorAnimationClass, errorAnimation }
}

export default useErrorAnimation