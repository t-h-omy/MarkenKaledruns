/**
 * Request barrel — assembly-only.
 * Imports request definition arrays from sub-modules and re-exports the
 * four canonical arrays consumed by the picker and state engine.
 * No request objects are defined in this file.
 */

import type { Request } from '../models';
import { infoRequestDefs } from './info/infoRequests';
import { standaloneEventDefs } from './events/standaloneEvents';
import { authorityInfoRequestDefs } from './authority/authorityInfoRequests';
import { fireChainRequestDefs } from './fire/fireChainRequests';
import { runValidation } from './validation';
import { BLACKGEATChainDefs } from './chains/blackgeat';
import { banditTollChainDefs } from './chains/bandit_toll';
import { merchantGuildChainDefs } from './chains/merchant_guild';
import { plagueRumorsChainDefs } from './chains/plague_rumors';
import { nobleFeudChainDefs } from './chains/noble_feud';
import { harvestFestChainDefs } from './chains/harvest_fest';
import { diseaseRumorChainDefs } from './chains/disease_rumor';
import { palisadeChainDefs } from './chains/palisade';
import { arkanatInspectorChainDefs } from './chains/arkanat_inspector';
import { egoInsultChainDefs } from './chains/ego_insult';
import { riverPiratesChainDefs } from './chains/river_pirates';
import { wanderingHealerChainDefs } from './chains/wandering_healer';
import { smugglersOfferChainDefs } from './chains/smugglers_offer';
import { lostChildChainDefs } from './chains/lost_child';
import { foreignEnvoyChainDefs } from './chains/foreign_envoy';
import { desertersChainDefs } from './chains/deserters';
import { marketInspectionChainDefs } from './chains/market_inspection';
import { marketplaceCoreChainDefs } from './chains/marketplace_core';
import { tavernCoreChainDefs } from './chains/tavern_core';
import { garrisonCoreChainDefs } from './chains/garrison_core';
import { trainingYardCoreChainDefs } from './chains/training_yard_core';
import { shrineCoreChainDefs } from './chains/shrine_core';
import { healersHouseCoreChainDefs } from './chains/healers_house_core';
import { commerceGuildPressureChainDefs } from './chains/commerce_guild_pressure';
import { commerceProsperityChainDefs } from './chains/commerce_prosperity';
import { militaryMobilizationChainDefs } from './chains/military_mobilization';
import { militaryPoliticsChainDefs } from './chains/military_politics';
import { faithPilgrimageChainDefs } from './chains/faith_pilgrimage';
import { faithDoctrineChainDefs } from './chains/faith_doctrine';
import { prodigalSonChainDefs } from './chains/prodigal_son';
import { feverPilgrimChainDefs } from './chains/fever_pilgrim';
import { earlyGameChainDefs } from './chains/early_game';
import { lateGameChainDefs } from './chains/late_game';
import { sBatchChainDefs } from './chains/s_batch';
import { taintedGrainChainDefs } from './chains/tainted_grain';

/** Info/System Requests */
export const infoRequests: Request[] = [...infoRequestDefs];

/** Event Requests (standalone events + all event chains) */
export const eventRequests: Request[] = [
  ...standaloneEventDefs,
  ...BLACKGEATChainDefs,
  ...banditTollChainDefs,
  ...merchantGuildChainDefs,
  ...plagueRumorsChainDefs,
  ...nobleFeudChainDefs,
  ...harvestFestChainDefs,
  ...diseaseRumorChainDefs,
  ...palisadeChainDefs,
  ...arkanatInspectorChainDefs,
  ...egoInsultChainDefs,
  ...riverPiratesChainDefs,
  ...wanderingHealerChainDefs,
  ...smugglersOfferChainDefs,
  ...lostChildChainDefs,
  ...foreignEnvoyChainDefs,
  ...desertersChainDefs,
  ...marketInspectionChainDefs,
  ...marketplaceCoreChainDefs,
  ...tavernCoreChainDefs,
  ...garrisonCoreChainDefs,
  ...trainingYardCoreChainDefs,
  ...shrineCoreChainDefs,
  ...healersHouseCoreChainDefs,
  ...commerceGuildPressureChainDefs,
  ...commerceProsperityChainDefs,
  ...militaryMobilizationChainDefs,
  ...militaryPoliticsChainDefs,
  ...faithPilgrimageChainDefs,
  ...faithDoctrineChainDefs,
  ...prodigalSonChainDefs,
  ...feverPilgrimChainDefs,
  ...earlyGameChainDefs,
  ...lateGameChainDefs,
  ...sBatchChainDefs,
  ...taintedGrainChainDefs,
];

/** Authority Info Requests */
export const authorityInfoRequests: Request[] = [...authorityInfoRequestDefs];

/** Fire & Repair Chain Requests (generated) */
export const fireChainRequests: Request[] = [...fireChainRequestDefs];

/** Validate all requests — delegates to validation module */
export function validateRequests(): void {
  runValidation([...infoRequests, ...authorityInfoRequests, ...eventRequests, ...fireChainRequests]);
}
