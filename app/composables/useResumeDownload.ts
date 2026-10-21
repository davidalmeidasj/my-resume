export function useResumeDownload() {
  const { locale } = useI18n()

  return () => {
    const filename = `david-almeida-resume-${locale.value}.pdf`
    const link = document.createElement('a')
    link.href = `/${filename}`
    link.download = filename
    link.click()
  }
}
