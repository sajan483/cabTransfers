export interface GetAgentProfileResponse {
    tui: string;
    id: string;
    code: string;
    name: string;
    type: string;
    loginMessage: string;
    region: string;
    htdealCode: string;
    clientId: string;
    settings: Settings
    balance: Balance
    contacts: AgentContacts
    salesRep: SalesRep
    Code: string;
    Msg: string[];
    lastLoginDate: string;
    //curfinyear: string;
    companyDetails:CompanyDetailsRequest;
    userType:string
}

export interface Settings {
    sms: boolean;
    email: boolean;
    holdBilling: boolean;
    netFare: boolean;
    commission: boolean;
    balanceHide: boolean;
    gdsBalance: boolean;
    commonBalance: boolean;
    autoCreditRCH: boolean;
    gdsCreditRCH: boolean;
    creditRCHMessage: string;
    defaultPage:string;
    iataNumber:string;
    EnableOldRail:boolean;

}
export interface Balance {
    current: number;
    pendingDue: number;
    incentive: number;
    dueDate: string;
    subUserBalance: number;
    GDSBalance: number;
    GDSpendingDue: number;
    GDSpendingDueDate: string;
    commonCreditRCHLimit: number;
    gdsCreditRCHLimit: number;
}
export interface AgentContacts {
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    mobile: number;
    phone: number;
    email: string;
    countryMobCode:string
}

export interface SalesRep {
    name: string;
    phone: number;
    email: string;
    region:string;

}

/*
export interface AgentProfile {
    CompanyID:number;
    CompanyCode:string;
    CompanyName:string;
    City:string;
    Country:string;
    UserGrade:string;
    ContactPerson:string;
    LoginMessage:string;
    EmailId:string;
    CurrentBalance:string;
    LogoPath:string;
    EnableSMS:string;
    EnableEmail:string;
    DiscountGroup:string;
    DiscountGroupID:number;
    Address:string;
    State:string;
    PostalCode:string;
    NearestTown:string;
    MobileNumber:string;
    PhoneNumber1:string;
    PhoneNumber2:string;
    Region:string;
    RegionId:number;
    ViewNetFare:boolean;
    ViewCommission:boolean;
    RailEnabled:boolean;
    ActivationStatus:string;
    AgentUserLoginId:string;
    PendingDue:number;
    DueDate:string;
    HoldBillingEnabled:boolean;
    TransactionDetails:string;
    SubUserBalance:number;
    SubUserLimit:number;
    IncentiveBalance:number;
    GSTState:string;
    GSTNumber:string;
    GSTRegisteredAddress:string;
    GSTNature:string;
    GSTPanNo:string;
    GSTHolderName:string;
    GSTMobileNo:string;
    GSTEmail:string;
    SalesRepName:string;
    SalesRepEmail:string;
    SalesRepPhoneNo:string;
    CurrencyCode:string;
    UserMobile:string;
    UserEmailID:string;
    AdminLoginId:string;
    DMTEnabled:boolean;
}

*/

export interface CompanyDetailsRequest{
   
    email:string;
    contactperson:string;
    mobile:string;
    mobcountrycode:string;
    phone:string;
    phone1:string;
    panno:string;
    gstnumber:string;
    accountno:string;
    smsalertno:string;
    smsalertomobcountrycode:string;
}
