import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  CrowdFunder,
  CampaignAdded as CampaignAddedEvent,
  CampaignFunded as CampaignFundedEvent,
  CampaignRemoved as CampaignRemovedEvent,
  CampaignShrunk as CampaignShrunkEvent,
  UserAdded as UserAddedEvent
} from "../generated/CrowdFunder/CrowdFunder"
import { UserAdded, CampaignAdded, CampaignFunded, CampaignRemoved, CampaignShrunk } from "../generated/schema"

export function handleCampaignAdded(event: CampaignAddedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._creator.toHexString())

  if(!campaignAdded){
    campaignAdded = new CampaignAdded(event.params._campaignAddress.toHexString())
    campaignAdded.funderCount = BigInt.fromString("0")
    campaignAdded.funders = []
  }
  if(!userAdded){
    userAdded = new UserAdded(event.params._creator.toHexString())
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
  }

  campaignAdded.campaignAddress = event.params._campaignAddress
  campaignAdded.creator = event.params._creator
  campaignAdded.title = event.params._title
  campaignAdded.description = event.params._description
  campaignAdded.category = event.params._category
  campaignAdded.tags = event.params._tags
  campaignAdded.goalAmount = event.params._goalAmount
  campaignAdded.duration = event.params._duration
  campaignAdded.createdAt = event.block.timestamp

  userAdded.createdCount = userAdded.createdCount!.plus(BigInt.fromString("1"))

  campaignAdded.save()
  userAdded.save()
}

export function handleCampaignFunded(event: CampaignFundedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._funder.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._funder.toHexString())
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
  }

  campaignAdded!.funders!.push(event.params._funder)
  campaignAdded!.funderCount!.plus(BigInt.fromString("1"))

  userAdded.backedCount = userAdded.backedCount!.plus(BigInt.fromString("1"))

  campaignAdded!.save()
  userAdded.save()
}

export function handleCampaignRemoved(event: CampaignRemovedEvent): void {
  let id = event.params._campaignAddress.toHexString()
  store.remove("CampaignAdded", id)
}

export function handleCampaignShrunk(event: CampaignShrunkEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._withdrawer.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._withdrawer.toHexString())
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
  }

  campaignAdded!.funders!.filter(funder => funder != event.params._withdrawer)
  campaignAdded!.funderCount!.minus(BigInt.fromString("1"))

  userAdded.backedCount = userAdded.backedCount!.minus(BigInt.fromString("1"))
  
  campaignAdded!.save()
  userAdded.save()
}

export function handleUserAdded(event: UserAddedEvent): void {
  let userAdded = UserAdded.load(event.params._address.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._address.toHexString())
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
  }

  userAdded.address = event.params._address
  userAdded.username = event.params._username
  userAdded.twitter = event.params._twitter
  userAdded.email = event.params._email
  userAdded.bio = event.params._bio
  userAdded.createdAt = event.block.timestamp

  userAdded.save()
}
