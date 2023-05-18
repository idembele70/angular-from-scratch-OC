import { AppareilStatus, IAppareil } from 'src/app/models/appareil.model';

const appareilList: IAppareil[] = [
  {
    id: 0,
    name: 'Machine à laver',
    status: AppareilStatus.ON
  }, {
    id: 1,
    name: "Televions",
    status: AppareilStatus.OFF
  }, {
    id: 2,
    name: "Ordinateur",
    status: AppareilStatus.ON
  }
]
const appareilInitalText = appareilList.map(
  ({ name, status }) => `Appareil: ${name} -- Statut ${status}`
)
const appareilTurnOnText = appareilList.map(
  ({ name }) => `Appareil: ${name} -- Statut ${AppareilStatus.ON}`
)
const appareilTurnOffText = appareilList.map(
  ({ name }) => `Appareil: ${name} -- Statut ${AppareilStatus.OFF}`
)

export {
  appareilList,
  appareilInitalText,
  appareilTurnOnText,
  appareilTurnOffText,
}