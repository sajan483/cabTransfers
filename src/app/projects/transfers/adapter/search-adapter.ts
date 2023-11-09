import { FormBuilder, Validators } from "@angular/forms";
import { SearchStateService } from "../../services/search/search-state-service";

export class SearchAdapter {

    constructor(
        private fb: FormBuilder,
        private searchstateService: SearchStateService
    ) {}

    FlightCodeFormGroupInState() {
        const formgroup = this.fb.group({
            FlightCode: ['', [Validators.required]],
            ArrivalTimeHour: ["", [Validators.required]],
            ArrivalTimeMinute: ["", [Validators.required]],
            ArrivalVesselName: ["",
            [
                Validators.required,
                Validators.pattern('^[a-zA-Z]+$')
            ],
        ],
            PickUpTimeHour: ["", [Validators.required]],
            PickUpTimeMinute: ["", [Validators.required]],
            FlightCodeArrivalTransfer: ["", [Validators.required]],
            ArrivalTransferDepartureHour: ["", [Validators.required]],
            ArrivalTransferDepartureMinute: ["", [Validators.required]],
            DepartureTransferFlightCode: [""],
            DepartureTransferDeptHour: [""],
            DepartureTransferDeptMinute: [""],
            DepartureTransferVesselName: ["",
            // [
            //     Validators.required,
            //     Validators.pattern('^[a-zA-Z]+$')
            // ],
        ]
        });
        this.searchstateService.FlightCodeTransferRequest = formgroup;
        return formgroup
    }
}