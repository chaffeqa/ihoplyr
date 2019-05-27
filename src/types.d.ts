export interface IPayload {
    $xmlns: $xmlns;
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    entryCount: number;
    title: string;
    entries: IEntriesItem[];
}
export interface $xmlns {
    ihopkc: string;
}
export interface IEntriesItem {
    guid: string;
    title: string;
    description: string;
    added: number;
    content: IContentItem[];
    thumbnails: IThumbnailsItem[];
    pubDate: number;
    defaultThumbnailUrl: string;
    ihopkc$sessionNumber: string;
    ihopkc$setType: string[];
    ihopkc$worshipLeader?: string[];
}
export interface IContentItem {
    bitrate: number;
    contentType: string;
    duration: number;
    fileSize: number;
    format: string;
    height: number;
    url: string;
    width: number;
    assetTypes: string[];
    downloadUrl: string;
    filePath: string;
    releases: IReleasesItem[];
    streamingUrl: string;
}
export interface IReleasesItem {
    pid: string;
}
export interface IThumbnailsItem {
    bitrate: number;
    contentType: string;
    duration: number;
    fileSize: number;
    format: string;
    height: number;
    url: string;
    width: number;
    assetTypes: string[];
    downloadUrl: string;
    filePath: string;
    releases: IReleasesItem[];
    streamingUrl: string;
}
