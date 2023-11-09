export class SearchRequrest {
    constructor(){}
    type: string ="Transfer";
    tripType: string = "Oneway"
    country: string = "Uae";
    country_code: string = "AE";
    pickUp: string ="Dubai Intl. Airport (DXB)";
    dropOff: string ="Al Ain";
    ArrDate: any = new Date();
    RetDate: string ="";
    ArrTime: string = "";
    RetTime: string ="";
    adult: number = 1;
    child: number = 0;
}
