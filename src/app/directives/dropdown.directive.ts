import { OnInit, Directive, TemplateRef, ViewContainerRef, HostListener, HostBinding } from "@angular/core";
import { ViewContainerData } from "@angular/core/src/view";


@Directive({
    selector : '[appDropdown]'
})
export class DropdownDirective{

    @HostBinding('class.open') isOpen = false;
    @HostListener('click') toggleButton(){
        this.isOpen = !this.isOpen;
    }
}