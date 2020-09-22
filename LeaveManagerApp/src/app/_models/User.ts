export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    usedCasualLeaves: number;
    usedEarnedLeaves: number;
    isManager: boolean;
    managerId: number;
}

