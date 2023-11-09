export class AvailabilityAndBookingAdapter {

    constructor(){}

    createTrasfersAvailabilityRequest(searchRequest:any) {
        const request = {
            Lang: "en",
            Request: {
              TUI: "",
              AgentId: ""
            },
            Location: {
              PlaceFrom: searchRequest.pickUp,
              FromType: "",
              PlaceTo: searchRequest.dropOff,
              ToType: "",
              CountryCodeFrom: searchRequest.country_code,
              CountryCodeTo: searchRequest.country_code
            },
            Timings: {
              ArrDate: searchRequest.ArrDate.split('T')[0],
              ArrTime: "0100",
              RetDate: searchRequest.RetDate ? searchRequest.RetDate.split('T')[0] : "",
              RetTime: "0100",
              CalcJ1PickupTime: 1,
              CalcJ2PickupTime: 1
            },
            Adults: searchRequest.adult,
            Children: searchRequest.child,
            Infants: 0,
            IsReturn: searchRequest.RetDate ? 0 : 1,
            ResponseType: 0,
            OtherToLocations: ""
          };
        return request;
    }
}