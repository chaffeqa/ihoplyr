export interface ISardiusPayload {
    total: number;
    hits: ISardiusHit[];
}

export interface ISardiusHit {
    id: string;
    title: string;
    airDate: string;
    media: ISardiusMedia;
    bios: ISardiusBios;
    files: ISardiusFile[];
}

export interface ISardiusMedia {
    url: string;
    mimeType: string;
}

export interface ISardiusBios {
    worshipLeaders: string[];
}

export interface ISardiusFile {
    url: string;
    isDefault?: boolean;
    mimeType: string;
}

// Legacy types (kept for reference or gradual migration if needed, but likely replaced)
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
