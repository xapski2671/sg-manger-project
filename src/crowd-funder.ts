import { Address, BigInt, store, Bytes } from "@graphprotocol/graph-ts"
import {
  CrowdFunder,
  CampaignAdded as CampaignAddedEvent,
  CampaignCanceled as CampaignCanceledEvent
} from "../generated/CrowdFunder/CrowdFunder"
import { CampaignAdded, CampaignCanceled } from "../generated/schema"

export function handleCampaignAdded(event: CampaignAddedEvent): void {
  let id = event.params._campaignAddress.toHex()
  let campaignAdded = CampaignAdded.load(id)
  if(!campaignAdded){
    campaignAdded = new CampaignAdded(id)
  }

  campaignAdded.campaignAddress = event.params._campaignAddress
  campaignAdded.creator = event.params._creator
  campaignAdded.creatorName = event.params._creatorName
  campaignAdded.creatorType = event.params._creatorType
  campaignAdded.description = event.params._description
  campaignAdded.title = event.params._title
  campaignAdded.tags = event.params._tags
  campaignAdded.goalAmount = event.params._goalAmount
  campaignAdded.duration = event.params._duration
  campaignAdded.createdAt = event.block.timestamp

  campaignAdded.save()
}

export function handleCampaignCanceled(event: CampaignCanceledEvent): void {
  let id = event.params._campaignAddress.toHex()
  let campaignCanceled = CampaignCanceled.load(id)
  if(!campaignCanceled){
    campaignCanceled = new CampaignCanceled(id)
  }

  campaignCanceled.campaignAddress = event.params._campaignAddress
  campaignCanceled.createdAt = event.block.timestamp

  store.remove("CampaignAdded", id)
  campaignCanceled.save()
}
