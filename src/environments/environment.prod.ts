import packageInfo from '../../package.json';

export const environment = {
  VERSION: packageInfo.version,
  production: true,
  apiUrl: 'https://lupogryph.alwaysdata.net/api/conseil-cycle',
  defaultUser: 'cdc@edu.fr'
};
