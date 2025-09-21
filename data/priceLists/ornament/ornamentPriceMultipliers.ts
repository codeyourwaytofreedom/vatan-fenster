export const ornamentPriceMultipliers = (ornamentKey: string) => {
  switch (ornamentKey) {
    case 'nein':
      return [];
    case 'reflektofloatBraun6':
      return [509, 687.15, 738.05, 814.4];
    case 'antisolBlau6':
      return [8, 10.8, 11.6, 12.8];
    case 'antisolBraun4':
      return [85, 114.75, 123.25, 136];
    case 'antisolGrun4':
      return [85, 114.75, 123.25, 136];
    case 'ornamentglasCathedral':
      return [67, 90.45, 97.15, 107.2];
    case 'ornamentglasDelta':
      return [67, 90.45, 97.15, 107.2];
    case 'ornamentglasStreifen':
      return [67, 90.45, 97.15, 107.2];
    case 'milchglas':
      return [136, 183.6, 197.2, 217.6];
    case 'ornamentglasMasterCarre':
      return [129, 174.15, 187.05, 206.4];
    case 'ornamentglasSilvit':
      return [67, 90.45, 97.15, 107.2];
    case 'ornamentglasChinchilla':
      return [67, 90.45, 97.15, 107.2];
    default:
      return [];
  }
};
