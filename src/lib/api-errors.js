export function handleApiErrors (response) {
  if (response.status !== 201) throw Error(response.statusText)
  return response
}

export function handleApiMissionErrors (response) {
  console.log(response)
  if (response.status !== 200) throw Error(response.statusText)

  return response
}
