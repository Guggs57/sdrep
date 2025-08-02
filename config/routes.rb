Rails.application.routes.draw do
  get "checkout/new"
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: "home#index"

  resources :produits, only: [:index, :show]

  resource :panier, only: [:show]      # singleton, car un seul panier par utilisateur
  resources :commandes, only: [:new]   # future extension possible (create, show, etc.)

  get "/checkout", to: "checkout#new"
post "/checkout", to: "checkout#create"
get "/checkout/success", to: "checkout#success", as: :checkout_success
get "/checkout/cancel", to: "checkout#cancel", as: :checkout_cancel

end
