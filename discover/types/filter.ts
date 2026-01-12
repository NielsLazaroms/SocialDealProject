export type ArrayFilter<T> = (items: readonly T[]) => T[];

export interface FilterProps {
  key: string;
  state: Ref<unknown>;
  arrayFilter: ArrayFilter<any>;
  format(): string | undefined;
  clear(): void;
  getLabel?: () => string;
}

export interface DropDownProps {
  dropdownPlaceholder: string;
  dropdownLabel: string;
}
