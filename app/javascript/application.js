import { Application } from "@hotwired/stimulus"
import CartController from "controllers/cart_controller"
import HelloController from "controllers/hello_controller"
import CheckoutController from "controllers/checkout_controller"

const application = Application.start()
application.register("cart", CartController)
application.register("hello", HelloController)
application.register("checkout", CheckoutController)

application.debug = false
window.Stimulus = application
