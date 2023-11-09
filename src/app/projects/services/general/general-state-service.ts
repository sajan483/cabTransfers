import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneralStateService {
    public tui: string = "";
    private token: string = '';
    clientId: any;

    constructor() { }

    public set TUI(val) {
        this.tui = val;
    }

    public get TUI(): string {
        return this.tui;
    }

    public get Token(): string {
        return this.token;
    }

    public set Token(val) {
        this.token = val;
    }

    public get ClientID(){
        return this.clientId;
    }

    public set ClientID(val){
        this.clientId = val;
    }
}