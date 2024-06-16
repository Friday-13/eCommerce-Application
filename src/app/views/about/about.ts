import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import dasha from '@assets/about/dasha.png';
import dima from '@assets/about/dima.png';
import anna from '@assets/about/anna.png';
import { ICardAttributes } from '@components/card-component';
import AboutUsCardComponent from './about-us-card';
import styles from './about.module.scss';
import contributionList from './contributions';

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
      bio: 'Every day I try to learn something new. I tried my hand at many jobs, but everywhere I felt stagnation at some point. I hope that with the help of RSSchool, I will be able to change my life.',
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

    const memberItemsContainer = new BaseComponent({
      tag: 'div',
      classList: ['member-items-container'],
    });
    contributionSection.appendChild(memberItemsContainer);

    contributionList.forEach((member) => {
      const memberItem = new BaseComponent({
        tag: 'div',
        classList: ['member-item'],
      });

      const memberTitle = new BaseComponent({
        tag: 'strong',
        content: member.name,
      });
      memberItem.appendChild(memberTitle);

      const contributionsList = new BaseComponent({
        tag: 'ul',
      });

      member.contributions.forEach((contribution) => {
        const contributionItem = new BaseComponent({
          tag: 'li',
          content: contribution,
        });
        contributionsList.appendChild(contributionItem);
      });

      memberItem.appendChild(contributionsList);
      memberItemsContainer.appendChild(memberItem);
    });

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

    const collabIntroAttr: IAttributes = {
      tag: 'p',
      content:
        'Throughout our project, our team adopted a set of essential tools and methodologies that significantly boosted our cooperative efforts and efficiency:',
    };
    const collabText = new BaseComponent(collabIntroAttr);
    collabSection.appendChild(collabText);

    const ulAttr: IAttributes = {
      tag: 'ul',
    };
    const ulElement = new BaseComponent(ulAttr);
    collabSection.appendChild(ulElement);

    const listItemsContent = [
      'Project Management via GitHub Projects: Our project was adeptly coordinated using GitHub Projects. This platform served as a comprehensive command center for overseeing tasks, delegating duties, charting milestones, and tracking our advancement. It was instrumental in maintaining our organizational structure and ensuring we remained on target to achieve our project objectives.',
      "Discord Servers as a Communication Backbone: Discord was integral to our team's communication, providing a platform for uninterrupted dialogue. We harnessed the power of Discord servers for hosting virtual meetings, brainstorming sessions, sharing educational content, and fostering discussions. The platform's instant messaging and voice chat capabilities were crucial in keeping our team connected and collaborative.",
      "Enhanced Code Quality through GitHub's Review Mechanisms: A rigorous code review routine was established for pull requests on GitHub, which was critical for maintaining high standards of code quality. Our team members engaged in peer reviews, pinpointing issues, and exchanging insights. This collective effort not only improved our codebase but also promoted a culture of shared learning and expertise among our team members.",
    ];

    listItemsContent.forEach((itemContent) => {
      const splitContent = itemContent.split(':');
      const boldText = splitContent[0];
      const regularText = splitContent.slice(1).join(':');

      const liAttr: IAttributes = {
        tag: 'li',
      };
      const liElement = new BaseComponent(liAttr);

      const boldAttr: IAttributes = {
        tag: 'strong',
        content: boldText,
      };
      const boldElement = new BaseComponent(boldAttr);

      const regularAttr: IAttributes = {
        content: regularText,
      };
      const regularElement = new BaseComponent(regularAttr);

      liElement.appendChild(boldElement);
      liElement.appendChild(regularElement);

      ulElement.appendChild(liElement);
    });
  }
}
