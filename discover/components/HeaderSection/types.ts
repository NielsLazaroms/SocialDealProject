import type { TimerProps } from '../CountdownTimerHeader/types';
import type { FilterbarDefaultProps } from '../Filterbar/Default/types';
import type { SectionTitleProps } from '../SectionTitle/types';

export interface HeaderSectionProps {
  title: SectionTitleProps;
  countdownTimer: TimerProps;
  filter: FilterbarDefaultProps;
  backgroundImage?: string;
}

export interface HeaderSectionEmits {
  (e: 'submit'): void;
}
