/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from 'nucleus';


@ProxyCmp({
})
@Component({
  selector: 'nucleus-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: false
})
export class NucleusAccordion {
  protected el: HTMLNucleusAccordionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusAccordion extends Components.NucleusAccordion {}


@ProxyCmp({
})
@Component({
  selector: 'nucleus-accordion-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: false
})
export class NucleusAccordionBody {
  protected el: HTMLNucleusAccordionBodyElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusAccordionBody extends Components.NucleusAccordionBody {}


@ProxyCmp({
})
@Component({
  selector: 'nucleus-accordion-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: false
})
export class NucleusAccordionHeader {
  protected el: HTMLNucleusAccordionHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusAccordionHeader extends Components.NucleusAccordionHeader {}


@ProxyCmp({
  inputs: ['alt', 'name', 'shape', 'size', 'src', 'type']
})
@Component({
  selector: 'nucleus-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alt', 'name', 'shape', 'size', 'src', 'type'],
  standalone: false
})
export class NucleusAvatar {
  protected el: HTMLNucleusAvatarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusAvatar extends Components.NucleusAvatar {}


@ProxyCmp({
  inputs: ['disabled', 'rounded', 'size', 'type']
})
@Component({
  selector: 'nucleus-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'rounded', 'size', 'type'],
  standalone: false
})
export class NucleusButton {
  protected el: HTMLNucleusButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusButton extends Components.NucleusButton {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'required', 'size', 'variant']
})
@Component({
  selector: 'nucleus-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'required', 'size', 'variant'],
  outputs: ['checkedChange'],
  standalone: false
})
export class NucleusCheckbox {
  protected el: HTMLNucleusCheckboxElement;
  @Output() checkedChange = new EventEmitter<CustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusCheckbox extends Components.NucleusCheckbox {

  checkedChange: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['items', 'label', 'open']
})
@Component({
  selector: 'nucleus-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['items', 'label', 'open'],
  outputs: ['dropdownToggle', 'itemSelect'],
  standalone: false
})
export class NucleusDropdown {
  protected el: HTMLNucleusDropdownElement;
  @Output() dropdownToggle = new EventEmitter<CustomEvent<boolean>>();
  @Output() itemSelect = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusDropdown extends Components.NucleusDropdown {

  dropdownToggle: EventEmitter<CustomEvent<boolean>>;

  itemSelect: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['copyright']
})
@Component({
  selector: 'nucleus-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['copyright'],
  standalone: false
})
export class NucleusFooter {
  protected el: HTMLNucleusFooterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusFooter extends Components.NucleusFooter {}


@ProxyCmp({
  inputs: ['brand', 'menuOpen']
})
@Component({
  selector: 'nucleus-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['brand', 'menuOpen'],
  outputs: ['menuToggle', 'menuClose'],
  standalone: false
})
export class NucleusHeader {
  protected el: HTMLNucleusHeaderElement;
  @Output() menuToggle = new EventEmitter<CustomEvent<boolean>>();
  @Output() menuClose = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusHeader extends Components.NucleusHeader {

  menuToggle: EventEmitter<CustomEvent<boolean>>;

  menuClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['disabled', 'invalid', 'placeholder', 'readonly', 'required', 'size', 'type', 'value', 'variant']
})
@Component({
  selector: 'nucleus-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'invalid', 'placeholder', 'readonly', 'required', 'size', 'type', 'value', 'variant'],
  outputs: ['valueChange'],
  standalone: false
})
export class NucleusInput {
  protected el: HTMLNucleusInputElement;
  @Output() valueChange = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusInput extends Components.NucleusInput {

  valueChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['options', 'placeholder', 'value']
})
@Component({
  selector: 'nucleus-multiselect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['options', 'placeholder', 'value'],
  outputs: ['valueChange'],
  standalone: false
})
export class NucleusMultiselect {
  protected el: HTMLNucleusMultiselectElement;
  @Output() valueChange = new EventEmitter<CustomEvent<string[]>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusMultiselect extends Components.NucleusMultiselect {

  valueChange: EventEmitter<CustomEvent<string[]>>;
}


@ProxyCmp({
  inputs: ['closed', 'removable', 'shape', 'type']
})
@Component({
  selector: 'nucleus-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closed', 'removable', 'shape', 'type'],
  outputs: ['pillClose'],
  standalone: false
})
export class NucleusPill {
  protected el: HTMLNucleusPillElement;
  @Output() pillClose = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusPill extends Components.NucleusPill {

  pillClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['indeterminate', 'max', 'size', 'value', 'variant']
})
@Component({
  selector: 'nucleus-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['indeterminate', 'max', 'size', 'value', 'variant'],
  standalone: false
})
export class NucleusProgress {
  protected el: HTMLNucleusProgressElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusProgress extends Components.NucleusProgress {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'name', 'required', 'size', 'value', 'variant']
})
@Component({
  selector: 'nucleus-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'name', 'required', 'size', 'value', 'variant'],
  outputs: ['checkedChange'],
  standalone: false
})
export class NucleusRadio {
  protected el: HTMLNucleusRadioElement;
  @Output() checkedChange = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusRadio extends Components.NucleusRadio {

  checkedChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['name', 'value']
})
@Component({
  selector: 'nucleus-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['name', 'value'],
  outputs: ['valueChange'],
  standalone: false
})
export class NucleusRadioGroup {
  protected el: HTMLNucleusRadioGroupElement;
  @Output() valueChange = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusRadioGroup extends Components.NucleusRadioGroup {

  valueChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['disabled', 'invalid', 'placeholder', 'readonly', 'required', 'rows', 'size', 'value', 'variant']
})
@Component({
  selector: 'nucleus-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'invalid', 'placeholder', 'readonly', 'required', 'rows', 'size', 'value', 'variant'],
  outputs: ['valueChange'],
  standalone: false
})
export class NucleusTextarea {
  protected el: HTMLNucleusTextareaElement;
  @Output() valueChange = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusTextarea extends Components.NucleusTextarea {

  valueChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'size', 'type']
})
@Component({
  selector: 'nucleus-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'size', 'type'],
  outputs: ['switchToggle'],
  standalone: false
})
export class NucleusToggle {
  protected el: HTMLNucleusToggleElement;
  @Output() switchToggle = new EventEmitter<CustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NucleusToggle extends Components.NucleusToggle {

  switchToggle: EventEmitter<CustomEvent<boolean>>;
}


