import {
  FeedType,
  UserRepository,
  PostRepository,
  PostTargetType
} from "@amityco/js-sdk";
import { bindLiveObject } from "./core";

export async function queryGlobalFeed() {
  console.log("Querying global feed");
  const results = PostRepository.queryAllPosts();
  bindLiveObject(results, "queryGlobalFeed");
  return results;
}

export async function queryCommunityFeed(communtyId: string) {
  console.log("Querying community feed " + communtyId);
  const results = PostRepository.queryCommunityPosts({
    communityId: communtyId
  });
  bindLiveObject(results, "queryCommunityFeed");
  return results;
}

export async function createTextPost(params: {
  text: string;
  targetType: string;
  targetId: string;
  tags?: string[];
}) {
  const live = PostRepository.createTextPost(params);
  return bindLiveObject(live, "Create text post");
}

export async function getPostById(postId: string) {
  return bindLiveObject(PostRepository.postForId(postId), "Get post " + postId);
}

export async function getFollowInfo(
  currentUserId: string,
  targetUserId: string
) {
  return bindLiveObject(
    UserRepository.getFollowInfo(currentUserId, targetUserId),
    "Get follow info current: " + currentUserId + " target: " + targetUserId
  );
}
