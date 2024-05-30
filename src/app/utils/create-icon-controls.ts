import {
  ButtonWithIconComponent,
  IButtonWithIconAttributes,
} from '@components/button-with-icons';

export default function createIconControl(
  icon: string,
  onClick?: (event?: Event) => void
) {
  const attrs: IButtonWithIconAttributes = {
    icon,
    classList: ['waves-effect waves-light btn-small  red lighten-2'],
    onClick,
  };
  return new ButtonWithIconComponent(attrs);
}
