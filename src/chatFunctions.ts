import {
  ChannelType,
  ChannelRepository,
  ChannelMembershipRepository,
  MessageEditorRepository,
  MessageRepository
} from "@amityco/js-sdk";
import * as Core from "./core";
export async function createChannel(channelId: string, userIds: string[]) {
  console.log("Creating channel: " + channelId);
  const liveChannel = ChannelRepository.createChannel({
    channelId: channelId,
    type: ChannelType.Community,
    userIds: userIds
  });
  await Core.bindLiveObject(liveChannel, "createChannel-" + channelId);
}
export async function joinChannel(channelId: string) {
  console.log("Joining channel: " + channelId);
  const liveChannel = ChannelRepository.joinChannel({
    channelId: channelId,
    type: ChannelType.Live
  });
  console.log("MODEL: ", liveChannel.model);
  return await Core.bindLiveObject(liveChannel, "joinchannel-" + channelId);
}
export async function leaveChannel(channelId: string) {
  console.log("Leaving channel: " + channelId);
  const channelMembershipRepo = new ChannelMembershipRepository(channelId);
  Core.bindLiveObject(channelMembershipRepo, "leaveChannel-" + channelId);
  await channelMembershipRepo.leave();
}
export async function getMembers(channelId: string) {
  console.log("Getting members: " + channelId);
  const channelMembershipRepo = new ChannelMembershipRepository(channelId);
  await Core.bindLiveObject(channelMembershipRepo, "getMembers-" + channelId);
  return await channelMembershipRepo.members();
}
export async function removeUsersFromChannel(
  channelId: string,
  userIds: string[]
) {
  console.log("Removing " + userIds + " from channel: " + channelId);
  const channelMembershipRepo = new ChannelMembershipRepository(channelId);
  await Core.bindLiveObject(
    channelMembershipRepo,
    "removeUserFromChannel-" + channelId + "-" + userIds
  );
  await channelMembershipRepo.removeUsers(userIds);
}
export async function addUsersToChannel(channelId: string, userIds: string[]) {
  console.log("Adding " + userIds + " to channel: " + channelId);
  const channelMembershipRepo = new ChannelMembershipRepository(channelId);
  await Core.bindLiveObject(
    channelMembershipRepo,
    "addUsersToChannel-" + channelId + "-" + userIds
  );
  await channelMembershipRepo.addMembers(userIds);
}

export async function createMessage(channelId: string, message: string) {
  console.log(`Creating message: ${message} to channel ${channelId}`);
  const messeageRepo = new MessageRepository();
  const liveChannel = messeageRepo.createTextMessage({
    channelId: channelId,
    text: message
  });
  return await Core.bindLiveObject(
    liveChannel,
    "createMessage-" + channelId + "-" + message
  );
}

export async function updateMessage2(messageId: string, newText: string) {
  console.log(`Updating message: ${messageId} to new text ${newText}`);
  const editor = new MessageEditorRepository(messageId);
  const result = await editor.editText(newText);
  console.log(`Message ${messageId} updated with result `, result);
  return result;
  // Core.bindLiveObject(liveObject, "updateMessage-" + messageId + "-" + newText);
}

export async function updateMessage(messageId: string, text: string) {
  console.log(`Updating message: ${messageId} to new text ${text}`);
  const result = await MessageRepository.updateMessage({
    messageId,
    data: { text }
  });
  console.log(`Message ${messageId} updated with result `, result);
  return result;
  // Core.bindLiveObject(liveObject, "updateMessage-" + messageId + "-" + newText);
}
