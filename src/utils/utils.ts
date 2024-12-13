export function getLangFromUrl (pathname: string): string {
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  const supportedLangs = ['es']
  if (supportedLangs.includes(firstSegment)) {
    return firstSegment
  } else {
    return 'en'
  }
}