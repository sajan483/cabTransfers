export interface recentGetRequest {
    TUI: string,
    GetRecentID: string,
    ClientID: "Trans123", 
    TravelDate: string
}

export interface recentSaveRequest {
    TUI: string,
    GetRecentID: string,
    ClientID: string, 
    TravelDate: string,
    ReturnDate: string,
    SearchData: string,
    Operation: string
}