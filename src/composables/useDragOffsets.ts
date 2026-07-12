import { reactive } from 'vue'

interface DragState {
  dx: number
  dy: number
  dragging: boolean
  moved: boolean
}

// Per-item drag offsets for a v-for of floating elements. Offsets live only in memory (a plain
// reactive array), so a page refresh naturally resets everything to its authored position.
export function useDragOffsets(count: number) {
  const state = reactive<DragState[]>(Array.from({ length: count }, () => ({ dx: 0, dy: 0, dragging: false, moved: false })))

  let startX = 0
  let startY = 0
  let activeIndex = -1

  function onPointerDown(index: number, event: PointerEvent) {
    const item = state[index]
    if (!item) return
    activeIndex = index
    item.dragging = true
    startX = event.clientX - item.dx
    startY = event.clientY - item.dy
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }

  function onPointerMove(index: number, event: PointerEvent) {
    if (activeIndex !== index || !state[index]?.dragging) return
    state[index].dx = event.clientX - startX
    state[index].dy = event.clientY - startY
    state[index].moved = true
  }

  function onPointerUp(index: number) {
    if (state[index]) state[index].dragging = false
    activeIndex = -1
  }

  return { dragState: state, onPointerDown, onPointerMove, onPointerUp }
}
