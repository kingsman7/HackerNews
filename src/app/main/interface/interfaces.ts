export interface News {
    hits:                   Hit[];
    nbHits:                 number;
    page:                   number;
    nbPages:                number;
    hitsPerPage:            number;
    exhaustiveNbHits:       boolean;
    exhaustiveTypo:         boolean;
    exhaustive?:            Exhaustive;
    query?:                 string;
    params:                 string;
    processingTimeMS:       number;
    processingTimingsMS?:   ProcessingTimingsMS;
}

export interface Hit {
    created_at:       Date | string;
    title:            null | string;
    url:              null | string;
    author:           string;
    points:           number | null;
    story_text:       null;
    comment_text:     null | string;
    num_comments:     number | null;
    story_id:         number | null;
    story_title:      null | string;
    story_url:        null | string;
    parent_id:        number | null;
    created_at_i:     number;
    _tags:            string[];
    objectID:         string;
    _highlightResult: HighlightResult;
}

export interface Author {
    value:             string;
    matchLevel:        MatchLevel | string;
    matchedWords:      Query[] | string[];
    fullyHighlighted?: boolean;
}

export enum MatchLevel {
    Full = "full",
    None = "none",
}

export enum Query {
    Angular = "angular",
    Reactjs = "reactjs",
    Vue = "vue",
}

export interface ProcessingTimingsMS {
    afterFetch: AfterFetch;
    fetch:      Fetch;
    total:      number;
}

export interface AfterFetch {
    format: Format;
    total:  number;
}

export interface Format {
    highlighting: number;
    total:        number;
}

export interface Fetch {
    total: number;
}


export interface Exhaustive {
    nbHits: boolean;
    typo:   boolean;
}


export interface HighlightResult {
    author:        Author;
    comment_text?: Author;
    story_title?:  Author;
    story_url?:    Author;
    title?:        Author;
    url?:          Author;
}


