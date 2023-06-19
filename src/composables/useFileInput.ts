import _once from 'lodash-es/once'

type FileInputOptions<T> = {
  onChange: (f: File[]) => T
  multiple?: boolean
  accept?: string
  reset?: boolean
}
type ComposableReturn = {
  files: Ref<FileList | null>
  open: () => void
  reset: () => void
}

function useFileInput<T>(options: FileInputOptions<T>): ComposableReturn {
  const files = ref<FileList | null>(null)

  let input: HTMLInputElement | undefined

  const init = _once(() => {
    if (document) {
      input = document.createElement('input')
      input.type = 'file'
      input.accept = options.accept ?? '*'
      input.multiple = options.multiple ?? true
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement
        if (target.files) {
          files.value = target.files
          options.onChange([...files.value])
        }
      }
    }
  })

  function open() {
    init()
    if (options.reset) {
      reset()
    }
    input.click()
  }

  function reset() {
    files.value = null
    if (input) {
      input.value = ''
    }
  }

  onBeforeUnmount(() => {
    if (input) {
      input.value = ''
      input.remove()
    }
  })

  return {
    files: readonly(files),
    open,
    reset
  }
}

export default useFileInput
