import { Controller } from "stimulus"

export default class extends Controller {
  static values = { url: String }

  initialize() {
    this.intervalId = 0
  }

  connect() {
    this.intervalId = setInterval(() => {
      if (this.canReload()) {
        this.updateElements()
      } else {
        this.stopReloading()
      }
    }, 1000);
  }

  disconnect() {
    this.stopReloading()
  }

  updateElements() {
    fetch(this.urlValue, { headers: { 'Accept': 'text/vnd.turbo-stream.html' } })
      .then(response => response.text())
      .then(message => Turbo.renderStreamMessage(message))
      .catch (() => this.stopReloading())
  }

  canReload() {
    const reload = document.getElementById('reload').textContent
    return (reload === 'true')
  }

  stopReloading() {
    if (this.intervalId !== 0) {
      clearInterval(this.intervalId)
      this.intervalId = 0
    }
  }
}
