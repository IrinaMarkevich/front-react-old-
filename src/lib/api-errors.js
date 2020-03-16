// because Fetch doesn't recognize error responses as
// actual errors since it's technically completing the response...
export function handleApiErrors (response) {
  if (response.status !== 201) throw Error(response.statusText)
  return response
}

export function handleApiMissionErrors (response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}
