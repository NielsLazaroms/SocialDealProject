export interface InformationBlockDTO {
  title: {
    text: string;
    color?: string;
    position?: string;
    size?: string;
    textShadow?: string;
    showLines?: boolean;
    moreDealsTextButton?: string;
  };
  leadingHeader?: string;
  textPosition: string;
  description: string;
  buttonText: string;
  images: string[];
}
