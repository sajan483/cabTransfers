import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { PricingStateService } from "../../services/pricing/pricing-state-service";

export class PricingAdapter {

    constructor(
        private fb: FormBuilder,
        private pricingState: PricingStateService
    ) {}

    createPaxFormGroup() {
        const formgrp = this.fb.group({
            Adult: this.fb.array([
                this.fb.group({
                    Title: ['', [Validators.required]],
                    FirstName: ['', 
                    [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z]+$')
                    ],
                ],
                    LastName: ['', 
                    [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z]+$')
                    ],
                ],
                })
            ]),
        });
        this.pricingState.PaxDetailsFormGroup = formgrp;
        return formgrp
    }

    createChildFormGroup() {
        const formgroup = this.fb.group({
            Child: this.fb.array ([
                this.fb.group({
                    TitleChild: ['', [Validators.required]],
                    FirstNameChild: ['',
                    [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z]+$')
                    ],
                ],
                    LastNameChild: ['',
                    [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z]+$')
                    ],
                ],
                })
            ]),
        });
        this.pricingState.ChildDetailsFormGroup = formgroup;
        return formgroup
    }

    createAdult() {
        (<FormArray>(
            this.pricingState.PaxDetailsFormGroup.controls['Adult']
        )).push(
            this.fb.group({
                Title: ['', [Validators.required]],
                FirstName: ['', 
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]+$')
                ]
            ],
                LastName: ['', 
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]+$')
                ]
            ],
            })
        )  
    }

    createChild() {
        (<FormArray>(
            this.pricingState.ChildDetailsFormGroup.controls['Child']
        )).push(
            this.fb.group({
                TitleChild: ['', [Validators.required]],
                FirstNameChild: ['',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]+$')
                ]
            ],
                LastNameChild: ['',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]+$')
                ]
            ],
            })
        )
    }

    contactInfoFormGroupInState() {
        const formgroup = this.fb.group({
            // Travellers: this.pricingState.PaxDetailsFormGroup,
            MobileNo: ['', 
            [
                Validators.required,
                Validators.pattern('^[0-9]*$')
            ]
        ],
            EmailId: ['', 
            Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern(
                    '^[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z]{2,}$'
                ),
            ]),
        ],
            Reference: ['', [Validators.required]],
        })
        this.pricingState.ContactDetailsFormGroup = formgroup;
        return formgroup
    }
}