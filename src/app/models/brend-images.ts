import brendDisney from '@assets/brend/disney.png';
import brendArchitecture from '@assets/brend/architecture.png';
import brendHarryPotter from '@assets/brend/harrypotter.png';
import brendJurassicWorld from '@assets/brend/jurassicWorld.png';
import brendStarWars from '@assets/brend/starWars.png';
import brendTechnic from '@assets/brend/technic.png';
import brendIdeas from '@assets/brend/ideas.png';
import brendIcons from '@assets/brend/icons.png';

export enum Theme {
  Disney = 'Disney',
  Architecture = 'Architecture',
  HarryPotter = 'Harry Potter',
  JurassicWorld = 'Jurassic World',
  StarWars = 'Star Wars',
  Technic = 'Technic',
  Ideas = 'Ideas',
  Icons = 'Icons',
}

export const themeToBrandImageMap = {
  [Theme.Disney]: brendDisney,
  [Theme.Architecture]: brendArchitecture,
  [Theme.HarryPotter]: brendHarryPotter,
  [Theme.JurassicWorld]: brendJurassicWorld,
  [Theme.StarWars]: brendStarWars,
  [Theme.Technic]: brendTechnic,
  [Theme.Ideas]: brendIdeas,
  [Theme.Icons]: brendIcons,
};
