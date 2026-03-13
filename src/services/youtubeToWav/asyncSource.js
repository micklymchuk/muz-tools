import AsyncSourceModule from 'async-source'

const AsyncSource = AsyncSourceModule?.default ?? AsyncSourceModule

export function createAsyncSource(serviceMethod, onError) {
  return new AsyncSource(serviceMethod, onError)
}
