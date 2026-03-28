import { create } from 'storybook/theming';
import CoverImage from '../../src/assets/img/logo.svg';

export default create({
  base: 'light',
  brandTitle: 'Nucleus Design System - Angular',
  brandUrl: '#',
  brandImage: CoverImage,
  brandTarget: '_self',
  colorSecondary: '#7e5bef',
  appBg: '#f8fafc',
  appBorderColor: '#d9e2ec',
  appBorderRadius: 8,
  textColor: '#1f2937',
  barTextColor: '#374151'
});
