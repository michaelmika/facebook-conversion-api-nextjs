export declare type Arguments = {
    eventName: string;
    eventId: string;
    externalId: string;
    emails?: Array<string> | null;
    phones?: Array<string> | null;
    products?: {
        sku: string;
        quantity: number;
    }[] | [] | null;
    value?: number;
    currency?: string;
    userAgent: string;
    sourceUrl: string;
    testEventCode?: string;
    firstName?: string;
    lastName?: string;
};
