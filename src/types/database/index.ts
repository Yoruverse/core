export interface ReadDocumentsOptions {
    collection: string;
    query: string[];
}

export interface WriteDocumentOptions {
    collection: string;
    data: Object;
}