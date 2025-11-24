export const windowStyleKeys = ['flugel1', 'flugel2', 'flugel3', 'oberlicht', 'unterlicht'];

export const windowTypeKeys = [
  'F',
  'K',
  'FF',
  'DR',
  'DL',
  'DKR',
  'DKL',
  'F_F',
  'FF_FF',
  'K_K',
  'F_DK',
  'DK_F',
  'DK_DK_POS',
  'DK_D_STULP',
  'DK_D_POS',
  'D_DK_STULP',
  'D_DK_POS',
  'DK_F_DK',
  'DK_DR_DK_STULP',
  'DK_DR_DK_POS',
  'DK_DL_DK_STULP',
  'DK_DL_DK_POS',
];

export const sonnenschutzApplicabilitySizes = {
  withInsektenschutz: {
    sonnenschutzMinHeight: 1000,
    sonnenschutzMaxHeight: 2700,
    sonnenschutzSectionMaxWidth: 1800,
    sonnenschutzSectionMinWidth: 800,
    sonnenschutzMaxSectionArea: 4_600_000,
  },
  withoutInsektenschutz: {
    sonnenschutzMinHeight: 1000,
    sonnenschutzMaxHeight: 2900,
    sonnenschutzSectionMaxWidth: 2600,
    sonnenschutzSectionMinWidth: 800,
    sonnenschutzMaxSectionArea: 4_600_000,
  }
}