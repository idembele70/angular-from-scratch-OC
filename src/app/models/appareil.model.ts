// used on test files
interface IAppareil {
  id: number;
  name: string;
  status: AppareilStatus;
  firebaseId?: string;
}
enum AppareilStatus {
  OFF = 'éteint',
  ON = 'allumé',
}

type ToggleStatus = 'ON' | 'OFF';

export { IAppareil, AppareilStatus, ToggleStatus };
