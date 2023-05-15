export interface IAppareil {
  id: number;
  name: string;
  status: AppareilStatus
}
export enum AppareilStatus {
  OFF = "éteint",
  ON = "allumé"
}