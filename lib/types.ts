export type NavPage = 'home' | 'profile' | 'news' | 'services' | 'transparency' | 'tourism' | 'contact';

export interface NavConfig {
  title: string;
  sub: string;
  tabs: string[];
}
