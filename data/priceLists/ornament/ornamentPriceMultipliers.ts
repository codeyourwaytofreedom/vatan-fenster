export const ornamentPriceMultipliers = (ornamentKey: string, is3Layered: boolean) => {
  if(is3Layered){
  switch (ornamentKey) {
    case 'nein':
      return [];
    case 'reflektofloatBraun6':
      return [542, 731.7, 785.9, 867.2];
    case 'satinovo':
      return [127, 171.45, 184.15, 203.2];
    case 'antisolBraun4':
      return [85, 114.75, 123.25, 136];
    case 'antisolGrun4':
      return [85, 114.75, 123.25, 136];
    case 'ornamentglasCathedral':
      return [100, 135, 145, 160];
    case 'ornamentglasDelta':
      return [100, 135, 145, 160];
    case 'ornamentglasStreifen':
      return [100, 135, 145, 160];
    case 'milchglas':
      return [169, 228.15, 245.05, 270.4];
    case 'ornamentglasMasterCarre':
      return [162, 218.7, 234.9, 259.2];
    case 'ornamentglasSilvit':
      return [100, 135, 145, 160];
    case 'ornamentglasChinchilla':
      return [100, 135, 145, 160];
    default:
      return [];
  }
  }else{
  switch (ornamentKey) {
    case 'nein':
      return [];
    case 'reflektofloatBraun6':
      return [509, 687.15, 738.05, 814.4];
    case 'satinovo':
      return [94, 126.9, 136.3, 150.4];
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
  }
};
