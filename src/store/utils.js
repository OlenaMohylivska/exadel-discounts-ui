const formattedData = (date) => {
  const periodEnd = new Date(date)
  const perionDate = periodEnd.getDate() < 10 ? "0" + periodEnd.getDate() : periodEnd.getDate()
  let perionMonth = periodEnd.getMonth() + 1
  perionMonth = perionMonth < 10 ? "0" + perionMonth : perionMonth
  return `${perionDate}-${perionMonth}-${periodEnd.getFullYear()}`
}

const logout = () => {
  // eslint-disable-next-line no-undef
  localStorage.clear()
}

export {
  formattedData,
  logout
}