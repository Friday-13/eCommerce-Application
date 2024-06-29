import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import dasha from '@assets/about/dasha.jpg';
import dima from '@assets/about/dima.webp';
import anna from '@assets/about/anna.jpeg';
import rsschool from '@assets/about/rsschool.svg';
import { ICardAttributes } from '@components/card-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import AboutUsCardComponent from './about-us-card';
import styles from './about.module.scss';
import contributionList from './contributions';

export default class AboutUsView extends View {
  private aboutContainer!: BaseComponent;

  constructor() {
    const attrs: IAttributes = {
      classList: ['about-us-container'],
    };
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

    const logoContainerAttr: IAttributes = {
      tag: 'div',
      classList: ['logo-container'],
    };
    const logoContainer = new BaseComponent(logoContainerAttr);
    this.aboutContainer.appendChild(logoContainer);

    const logoLinkAttr: IAnchorAttrs = {
      href: 'https://rs.school/',
      id: 'logo',
    };
    const logoLink = new AnchorComponent(logoLinkAttr);
    logoContainer.appendChild(logoLink);

    const rsImageAttr: IImageAttributes = {
      src: rsschool,
      alt: 'RS School',
      classList: ['responsive-img', 'rs-school'],
    };
    const rsImage = new ImageComponent(rsImageAttr);
    logoLink.appendChild(rsImage);

    const logoTextAttr: IAttributes = {
      tag: 'h6',
      classList: ['title-text'],
      content:
        'This project is developed as part of the final task of the course JavaScript/Front-end (2023Q4) from the RS School.',
    };
    const logoText = new BaseComponent(logoTextAttr);
    logoContainer.appendChild(logoText);

    const aboutTitleAttr: IAttributes = {
      tag: 'h5',
      content: 'Team members',
      classList: ['center-align', 'title'],
    };
    const aboutTitle = new BaseComponent(aboutTitleAttr);
    this.aboutContainer.appendChild(aboutTitle);

    const aboutSectionAttr: IAttributes = {
      tag: 'section',
      id: 'about',
      classList: ['row', 'row-team'],
    };
    const aboutSection = new BaseComponent(aboutSectionAttr);
    this.aboutContainer.appendChild(aboutSection);

    const cardAttr1: ICardAttributes = {
      imageSrc: dima,
      title: 'Dmitrii Samsonenko',
      href: 'https://github.com/Friday-13',
      bio: "I'm a Python developer with a background in embedded systems, where I developed software in C for various devices and measurement systems.  I'm transitioning to web development with a focus on backend roles, while also cultivating an interest in frontend development and other web-related skills. Self-education is a key part of my professional development. I enjoy learning new skills and strive to communicate effectively with all team members. The most rewarding aspect of my work is creating new applications or features that are both functional and beneficial. ",
    };
    const card1 = new AboutUsCardComponent(cardAttr1);
    aboutSection.appendChild(card1);

    const cardAttr2: ICardAttributes = {
      imageSrc: anna,
      title: 'Anna Golosova',
      href: 'https://github.com/Golosova76',
      bio: "Hi! My name is Anna, and I'm a junior frontend developer at a large IT company. I'm studying at RS School and thoroughly enjoying my dive into the world of frontend development. My career has been a real adventure: I've had the chance to try different fields, which helped me develop a unique skill set. Now, I apply these skills in IT, creating interfaces that are user-friendly and visually appealing. When I'm not coding, I like to explore new technologies and experiment with design. To me, IT is a world of endless possibilities, and I'm excited to discover something new every day.",
    };
    const card2 = new AboutUsCardComponent(cardAttr2);

    aboutSection.appendChild(card2);

    const cardAttr3: ICardAttributes = {
      imageSrc: dasha,
      title: 'Daria Borzova',
      href: 'https://github.com/InStageTwo',
      bio: "Each day is a new chapter in my book of learning. I tried my hand at many jobs, yet in each, I encountered a plateau that beckoned me to seek more. Web development, with its ever-evolving landscape, promises a horizon that stretches beyond the mundane. Through the guidance of RSSchool, I envision a transformation in my professional life and hope to contribute to society. It's a field where stagnation is but a myth, and growth is the only constant—a realm where my passion for technology and my desire to make a difference can truly flourish.",
    };
    const card3 = new AboutUsCardComponent(cardAttr3);
    aboutSection.appendChild(card3);

    const contributionSectionAttr: IAttributes = {
      tag: 'section',
      id: 'contribution',
      classList: ['row', 'row-contribution'],
    };
    const contributionSection = new BaseComponent(contributionSectionAttr);
    this.aboutContainer.appendChild(contributionSection);

    const contributionTitleAttr: IAttributes = {
      tag: 'h5',
      content: 'Contributions',
      classList: ['center-align', 'contributions-title'],
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
        classList: ['member-item', 'card', 'col', 's12', 'm4', 'center-align'],
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
      classList: ['row', 'row-collaboration'],
    };
    const collabSection = new BaseComponent(collabSectionAttr);
    this.aboutContainer.appendChild(collabSection);

    const collabTitleAttr: IAttributes = {
      tag: 'h5',
      content: 'Collaboration',
      classList: ['center-align', 'collaboration-title'],
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
