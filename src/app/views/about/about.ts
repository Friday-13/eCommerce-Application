import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import dasha from '@assets/about/dasha.png';
import dima from '@assets/about/dima.png';
import anna from '@assets/about/anna.png';
import { ICardAttributes } from '@components/card-component';
import AboutUsCardComponent from './about-us-card';
import styles from './about.module.scss';

export default class AboutUsView extends View {
  private aboutContainer!: BaseComponent;

  constructor() {
    const attrs: IAttributes = {};
    super(attrs);
    this.initializeAboutContent();
  }

  private initializeAboutContent(): void {
    const aboutContainerAttrs: IAttributes = {
      classList: [styles['about-container']],
    };
    this.aboutContainer = new BaseComponent(aboutContainerAttrs);
    this.appendChild(this.aboutContainer);
    document.body.appendChild(this.htmlElement);

    const aboutTitleAttr: IAttributes = {
      tag: 'h5',
      content: 'Team members',
      classList: ['center-align'],
    };
    const aboutTitle = new BaseComponent(aboutTitleAttr);
    this.aboutContainer.appendChild(aboutTitle);

    const aboutSectionAttr: IAttributes = {
      tag: 'section',
      id: 'about',
      classList: ['row'],
    };
    const aboutSection = new BaseComponent(aboutSectionAttr);
    this.aboutContainer.appendChild(aboutSection);

    const cardAttr1: ICardAttributes = {
      imageSrc: dima,
      title: 'Dmitrii Samsonenko',
      href: 'https://github.com/Friday-13',
      bio: 'Bla lalalalalalala',
    };
    const card1 = new AboutUsCardComponent(cardAttr1);
    aboutSection.appendChild(card1);

    const cardAttr2: ICardAttributes = {
      imageSrc: anna,
      title: 'Anna Golosova',
      href: 'https://github.com/Golosova76',
      bio: 'Bla lalalalalalala',
    };
    const card2 = new AboutUsCardComponent(cardAttr2);

    aboutSection.appendChild(card2);

    const cardAttr3: ICardAttributes = {
      imageSrc: dasha,
      title: 'Daria Borzova',
      href: 'https://github.com/InStageTwo',
      bio: 'Bla lalalalalalala',
    };
    const card3 = new AboutUsCardComponent(cardAttr3);
    aboutSection.appendChild(card3);

    const contributionSectionAttr: IAttributes = {
      tag: 'section',
      id: 'contribution',
      classList: ['row'],
    };
    const contributionSection = new BaseComponent(contributionSectionAttr);
    this.aboutContainer.appendChild(contributionSection);

    const contributionTitleAttr: IAttributes = {
      tag: 'h5',
      content: 'Contributions',
      classList: ['center-align'],
    };
    const contributionTitle = new BaseComponent(contributionTitleAttr);
    contributionSection.appendChild(contributionTitle);

    const collabSectionAttr: IAttributes = {
      tag: 'section',
      id: 'collaboration',
      classList: ['row'],
    };
    const collabSection = new BaseComponent(collabSectionAttr);
    this.aboutContainer.appendChild(collabSection);

    const collabTitleAttr: IAttributes = {
      tag: 'h5',
      content: 'Collaboration',
      classList: ['center-align'],
    };
    const collabTitleTitle = new BaseComponent(collabTitleAttr);
    collabSection.appendChild(collabTitleTitle);
  }
}
