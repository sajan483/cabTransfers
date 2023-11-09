import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    openCloseTrigger: trigger('openCloseAnim', [
        transition(':leave', [
            style({ height: '*', opacity: 1 }),
            animate('.250s linear', style({ height: 0, opacity: 0 }))
        ]),
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('.250s linear', style({ height: '*', opacity: 1 }))
        ])
    ])

}