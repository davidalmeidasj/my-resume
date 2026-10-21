export function useProjectToggle(initial: number[] = [0]) {
  const open = ref<number[]>([...initial])

  const isOpen = (index: number) => open.value.includes(index)

  const toggle = (index: number) => {
    open.value = isOpen(index)
      ? open.value.filter((item) => item !== index)
      : [...open.value, index]
  }

  return { isOpen, toggle }
}
