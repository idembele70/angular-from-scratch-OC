// used on test files
export interface IAppareil {
  id: number;
  name: string;
  status: AppareilStatus;
  firebaseId?: string;
}
export enum AppareilStatus {
  OFF = 'éteint',
  ON = 'allumé',
}
