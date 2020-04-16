import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DrumService } from "../drum.service";

@Component({
  selector: "app-drum-machine",
  templateUrl: "./drum-machine.component.html",
  styleUrls: ["./drum-machine.component.css"]
})
export class DrumMachineComponent implements OnInit {
  @ViewChild("audioRef") audio;

  @HostListener("window:keydown", ["$event"]) keyDown(event: KeyboardEvent) {
    this.playKeyCode(event.keyCode);
  }

  playing = false;
  banks = this.drumService.banks;
  banksLookup = this.drumService.getLookup(this.banks, 'id');

  banksMap = this.drumService.data;

  form = new FormGroup({
    bankControl: new FormControl(this.banks[0].id)
  });

  currentBankControl = this.form.get("bankControl");

  currentBank = this.banks.find(
    bank => bank.id === this.currentBankControl.value
  );

  currentBankMap = this.banksMap[this.currentBank.id];

  keycodeMap = this.drumService.getLookup(this.currentBankMap, "keyCode");

  currentKey = { };

  constructor(private drumService: DrumService) {}

  ngOnInit() {
    this.currentBankControl.valueChanges.subscribe(value => {
      // this.currentBank = this.banks.find(bank => bank.id === value);

      this.currentBank = this.banksLookup[value];
      
      this.currentBankMap = this.banksMap[value];

      this.keycodeMap = this.drumService.getLookup(
        this.currentBankMap,
        "keyCode"
      );
    });
  }

  play(key) {
    this.playing = true;
    this.currentKey = key;
    // let p = this.audio.find(player => player.nativeElement.id === key.id);
    this.audio.nativeElement.src = key.url;
    this.audio.nativeElement.play();
  }

  playKeyCode(keyCode) {
    let key = this.keycodeMap[keyCode];
    // this.currentKey = this.currentBankMap.find(map => map.keyCode === keyCode);

    if (key) {
      this.playing = true;
      this.currentKey = key;
      this.audio.nativeElement.src = this.currentKey.url;
      this.audio.nativeElement.play();
    }
  }
}
