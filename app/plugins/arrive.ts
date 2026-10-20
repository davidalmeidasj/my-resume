export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const observe = (el: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-arriving')
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px 8% 0px' },
    )
    observer.observe(el)
  }

  nuxtApp.vueApp.directive<HTMLElement>('arrive', {
    mounted: observe,
    unmounted: (el) => observer?.unobserve(el),
    getSSRProps: () => ({}),
  })
})
