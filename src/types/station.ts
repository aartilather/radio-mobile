// src/types/station.ts
export type Station = {
    id: string;
    name: string;
    country: string;
    language?: string;
    url_resolved: string;
    bitrate?: number;
    codec?: string;
    tags?: string;
    votes?: number;
    favicon?: string;
};
