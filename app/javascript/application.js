import { Application } from "@hotwired/stimulus"
import CartController from "controllers/cart_controller"
import HelloController from "controllers/hello_controller"

const application = Application.start()
application.register("cart", CartController)
application.register("hello", HelloController)

application.debug = false
window.Stimulus = application
