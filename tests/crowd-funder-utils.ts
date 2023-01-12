import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CampaignAdded,
  CampaignCanceled
} from "../generated/CrowdFunder/CrowdFunder"

export function createCampaignAddedEvent(
  _campaignAddress: Address,
  _creator: Address,
  _creatorType: BigInt,
  _creatorName: string,
  _title: string,
  _description: string,
  _tags: Array<string>,
  _goalAmount: BigInt,
  _duration: BigInt
): CampaignAdded {
  let campaignAddedEvent = changetype<CampaignAdded>(newMockEvent())

  campaignAddedEvent.parameters = new Array()

  campaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_campaignAddress",
      ethereum.Value.fromAddress(_campaignAddress)
    )
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam("_creator", ethereum.Value.fromAddress(_creator))
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_creatorType",
      ethereum.Value.fromUnsignedBigInt(_creatorType)
    )
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_creatorName",
      ethereum.Value.fromString(_creatorName)
    )
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam("_title", ethereum.Value.fromString(_title))
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_description",
      ethereum.Value.fromString(_description)
    )
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam("_tags", ethereum.Value.fromStringArray(_tags))
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_goalAmount",
      ethereum.Value.fromUnsignedBigInt(_goalAmount)
    )
  )
  campaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_duration",
      ethereum.Value.fromUnsignedBigInt(_duration)
    )
  )

  return campaignAddedEvent
}

export function createCampaignCanceledEvent(
  _campaignAddress: Address
): CampaignCanceled {
  let campaignCanceledEvent = changetype<CampaignCanceled>(newMockEvent())

  campaignCanceledEvent.parameters = new Array()

  campaignCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "_campaignAddress",
      ethereum.Value.fromAddress(_campaignAddress)
    )
  )

  return campaignCanceledEvent
}
