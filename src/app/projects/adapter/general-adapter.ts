import { GeneralHelper } from "../helper/general-helper";
import { GetAgentProfileRequest } from "../model/agentProfile/agentProfileRequest";
import { SignatureRequest } from "../model/signature/signature-request";
import { GeneralStateService } from "../services/general/general-state-service";


export class GeneralAdapter {

    constructor(public generalState: GeneralStateService, public generalHelper: GeneralHelper){}

    CreateSigantureRequest(): SignatureRequest {
        let signatureRequest = {} as SignatureRequest;
        signatureRequest.AgentCode = "";
        signatureRequest.ApiKey = "kXAY9yHARK";
        signatureRequest.BrowserKey = "30472c661fdd4f2271d17da58a9824f6";
        signatureRequest.ClientId = "bitest"
        signatureRequest.MerchantID = "300"
        signatureRequest.Password = "staging@1"

        return signatureRequest;
    }

    createGetAgentProfileRequest(username?: string, password?: string): GetAgentProfileRequest {
        let agentProfileRequest = {} as GetAgentProfileRequest;
        agentProfileRequest.TUI = this.generalState.TUI != "" ? this.generalState.TUI : this.generalHelper.getFromlocalStore('TUI')
        agentProfileRequest.Mode = ["A", "B"];
        return agentProfileRequest;
    }

    createTrasfersAvailabilityRequest() {
        
    }
}