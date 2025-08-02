import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener("submit", this.submitForm.bind(this))
  }

  async submitForm(event) {
    event.preventDefault()

    // Données formulaire
    const form = event.target
    const formData = new FormData(form)

    const userInfo = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      confirm_order: formData.get("confirm_order") === "yes"
    }

    // Données panier (depuis localStorage)
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    if (cart.length === 0) {
      alert("Votre panier est vide.")
      return
    }

    if (!userInfo.confirm_order) {
      alert("Vous devez cocher la case de confirmation.")
      return
    }

    try {
      const response = await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user: userInfo,
          cart: cart
        })
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url // redirection Stripe
      } else {
        alert("Une erreur est survenue.")
      }
    } catch (error) {
      console.error("Erreur lors de la commande :", error)
      alert("Erreur technique.")
    }
  }
}
