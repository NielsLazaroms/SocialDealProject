interface RatingBlock {
  ratingNumber?: number;
  ratingAmount?: number;
}

export interface CardDetailRowProps {
  rating?: RatingBlock;
  duration?: number;
  amountSold: number;
}
