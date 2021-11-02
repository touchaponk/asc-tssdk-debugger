export {};
declare global {
  export interface AmityMessage {
    messageId: string;
    channelId: string;
    userId: string;
    childrenNumber: number;
    type: string;
    channelSegment: number;
    tags: any[];
    metadata: any;
    syncState: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    hashFlag?: any;
    flagCount: number;
    reactions: any[];
    reactionsCount: number;
    myReactions: any[];
  }
}
