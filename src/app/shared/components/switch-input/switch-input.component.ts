import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.css']
})
export class SwitchInputComponent implements OnInit {

  isDark: boolean = false

  ngOnInit(): void {
    this.toggleTheme()
  }

  toggleTheme() {
    this.isDark = !this.isDark
    if (this.isDark) {
      document.querySelector("body")?.style.setProperty("--primary-color", "var(--background-dark)")
      document.querySelector("body")?.style.setProperty("--border-select", "var(--border-dark)")
      document.querySelector("body")?.style.setProperty("--ligth-border", "var(--border-dark)")
      document.querySelector("body")?.style.setProperty("--ligth-hr", "var(--border-dark)")
      document.querySelector("body")?.style.setProperty("--card-light", "var(--card-dark)")
      document.querySelector("body")?.style.setProperty("--top-gradient", "var(--background-dark)")
      document.querySelector("body")?.style.setProperty("--bottom-gradient", "var(--background-dark)")
      document.querySelector("body")?.style.setProperty("--brand-color", "darkgrey")
      document.querySelector("body")?.style.setProperty("--azure", "var(--azure-dark)")
      document.querySelector("body")?.style.setProperty("--azure-active", "var(--azure-dark)")
      document.querySelector("body")?.style.setProperty("--azure-text", "#fcfcfc")
      document.querySelector("body")?.style.setProperty("--border-nav", "var(--border-dark)")
    } else {
      document.querySelector("body")?.style.setProperty("--primary-color", "#fcfcfc")
      document.querySelector("body")?.style.setProperty("--border-select", "#dad8d8")
      document.querySelector("body")?.style.setProperty("--ligth-border", "#f5f5f5")
      document.querySelector("body")?.style.setProperty("--ligth-hr", "#f0f1f2")
      document.querySelector("body")?.style.setProperty("--card-light", "#ffffff")
      document.querySelector("body")?.style.setProperty("--top-gradient", "#ececec")
      document.querySelector("body")?.style.setProperty("--bottom-gradient", "#ffffff")
      document.querySelector("body")?.style.setProperty("--brand-color", "#000000")
      document.querySelector("body")?.style.setProperty("--azure", "#1797ff")
      document.querySelector("body")?.style.setProperty("--azure-active", "#fcfcfc")
      document.querySelector("body")?.style.setProperty("--azure-text", "#1797ff")
      document.querySelector("body")?.style.setProperty("--border-nav", "#d6d6d6")
    }
  }
}
