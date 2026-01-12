type KeyOf<T extends readonly string[]> = T[number];

export interface UseOpenKeyReturn<TKey extends string> {
  /**
   * All possible keys that can be opened.
   */
  keys: readonly TKey[];

  /**
   * Currently open key, or `null` if none is open.
   */
  openKey: Ref<TKey | null>;

  /**
   * Check if the given key is currently open.
   */
  isOpen: (key: TKey) => boolean;

  /**
   * Open the given key.
   */
  open: (key: TKey) => void;

  /**
   * Toggle the given key open/closed.
   */
  toggleOpen: (key: TKey) => void;

  /**
   * Close all keys.
   */
  closeAll: () => void;
}

export function useOpenKey<const TKeys extends readonly string[]>(
  keys: TKeys,
  options?: {
    initial?: KeyOf<TKeys> | null;
  },
): UseOpenKeyReturn<KeyOf<TKeys>> {
  type Key = KeyOf<TKeys>;

  const openKey: Ref<Key | null> = ref(options?.initial ?? null);

  function isOpen(key: Key) {
    return openKey.value === key;
  }

  function open(key: Key) {
    openKey.value = key;
  }

  function toggleOpen(key: Key) {
    openKey.value = isOpen(key) ? null : key;
  }

  function closeAll() {
    openKey.value = null;
  }

  return {
    keys,
    openKey,
    isOpen,
    open,
    toggleOpen,
    closeAll,
  };
}
