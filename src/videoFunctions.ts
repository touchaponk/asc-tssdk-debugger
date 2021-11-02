import { StreamRepository } from "@amityco/js-sdk";

import { bindLiveObject } from "./core";

export async function queryStreams(params?: {
  isDeleted?: boolean;
  statuses?: string[];
}) {
  console.log("Querying streams: " + JSON.stringify(params));
  return await bindLiveObject(
    StreamRepository.queryStreams(params),
    "queryStreams"
  );
}
export async function getStream(streamId: string) {
  console.log("Getting stream: " + streamId);
  return await bindLiveObject(
    StreamRepository.getStream(streamId),
    "getStream " + streamId
  );
}
