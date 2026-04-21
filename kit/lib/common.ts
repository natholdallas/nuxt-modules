export function downloadCurl(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.click()
}

export function scrollIntoView(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  })
}
