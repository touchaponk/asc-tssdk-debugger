import * as Social from "./socialFunctions";
import * as Core from "./core";
import * as Chat from "./chatFunctions";
import * as Video from "./videoFunctions";
import { ChannelRepository, ChannelType } from "@amityco/js-sdk";
(async function () {
  try {
    // API key here
    const apiKey = "b0ecb95f6fd3a333493e8a1c540b158ad75c8de1bb333a2e";
    // Data center endpoint here (api.eu.amity.co, api.sg.amity.co, api.us.amity.co)
    const apiEndpoint = "https://api.sg.amity.co";
    // Init ASC Client object
    await Core.init(apiKey, apiEndpoint);
    // await Core.registerSession(
    //   "amity_support_x01",
    //   "amity_support_x01",
    //   "670cca53340202050faf123b76c3eaba45455618"
    // );

    // const response = await Chat.createMessage(
    //   "amity_support_channel_101",
    //   "Amity Support 101 Test"
    // );
    // console.log(response);

    // console.log(await Video.getStream("e7b7e90a97b88476d06e175eb4206204"));
    // const result = await Social.queryCommunityFeed(
    //   "164c708124a96fc04e42aa2a88609b2c"
    // );
    // console.log(await Social.getPostById("e3d840c43ce8bec2b4f6d0aaea9c2ffe"));

    // result.nextPage();
    // const channelId = "amitysupport-123xx2";
    // try {
    //   await ChannelRepository.joinChannel({
    //     channelId,
    //     type: ChannelType.Community
    //   });
    // } catch (err) {
    //   console.log(JSON.stringify(err));
    //   if (err.code === 400400) {
    //     await ChannelRepository.createChannel({
    //       channelId,
    //       type: ChannelType.Community,
    //       userIds: ["amitysupport_x095"]
    //     });
    //   }
    // }
    // await Chat.createChannel(channelId, ["amitysupport_x094"]);
    // const msgobj = await Chat.createMessage(channelId, "Hello!");
    // console.log(JSON.stringify(msgobj));
    // Chat.updateMessage(msgobj.messageId, "Hello2");
  } catch (e) {
    console.error(e);
  }
})().catch((err) => {
  console.error(err);
});
