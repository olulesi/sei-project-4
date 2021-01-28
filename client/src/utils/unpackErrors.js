function unpackErrors(errors) {
  Object.keys(errors).forEach(error => errors[error] = errors[error][0])
  return errors
}

export default unpackErrors