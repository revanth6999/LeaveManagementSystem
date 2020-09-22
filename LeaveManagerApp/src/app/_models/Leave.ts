export interface Leave {
    id: number;
    type: string;
    eId: number;
    fromDate: string;
    toDate: string;
    reason: string;
    status: string;
    managerId: number;
    applyDateTime: string;
    replyDateTime: string;
}
