import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true
})
export class AppComponent implements OnInit {
  title = 'drumKit';

  ngOnInit(): void {
    // Attach click event listeners to buttons dynamically
    document.querySelectorAll(".drum").forEach((button) => {
      button.addEventListener("click", (event) => {
        const buttonInnerHTML = (event.target as HTMLElement).innerHTML;
        this.makeSound(buttonInnerHTML);
        this.buttonAnimation(buttonInnerHTML);
      });
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.makeSound(event.key);
    this.buttonAnimation(event.key);
  }

   makeSound(key: string): void {
    let audioSrc = `assets/sounds/${this.getAudioFileName(key)}`;
  
    const audio = new Audio(audioSrc);
    audio.load(); // Ensure the file is loaded before playing
    audio.play().catch(error => console.error("Audio play error:", error));
  }
  
   getAudioFileName(key: string): string {
    const soundMap: { [key: string]: string } = {
      'w': 'tom-1.mp3',
      'a': 'tom-2.mp3',
      's': 'tom-3.mp3',
      'd': 'tom-4.mp3',
      'j': 'snare.mp3',
      'k': 'crash.mp3',
      'l': 'kick-bass.mp3'
    };
    return soundMap[key] || '';
  }
  

  private buttonAnimation(currentKey: string): void {
    const activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
      activeButton.classList.add("pressed");
      setTimeout(() => {
        activeButton.classList.remove("pressed");
      }, 100);
    }
  }

}
