# config/importmap.rb

pin "application"                                     # ton application.js principal
pin "@hotwired/stimulus", to: "stimulus.min.js"       # Stimulus core
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"  # utilitaire d'auto-chargement

pin_all_from "app/javascript/controllers", under: "controllers"  # Charge tous les contrôleurs
pin "controllers/application"                        # 💥 ← nécessaire pour que Stimulus démarre
