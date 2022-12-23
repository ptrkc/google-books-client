export const fetchData = async <T>(url: string) => {
  try {
    const response = await fetch(url)
    const json = (await response.json()) as T
    if (response.status >= 200 && response.status <= 299) {
      return json
    } else {
      console.log({ response })
      console.log({ json })
      throw Error()
    }
  } catch (err) {
    console.log({ err })
    throw Error()
  }
}
