class CheckoutController < ApplicationController
  require 'stripe'
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    # Affiche le formulaire
  end

  def create
    # On attend un body JSON avec :user et :cart
    user_info = params[:user]
    cart_items = params[:cart]

    if user_info.blank? || cart_items.blank?
      render json: { error: "Informations manquantes" }, status: :unprocessable_entity
      return
    end

    line_items = cart_items.map do |item|
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item["nom"]
          },
          unit_amount: (item["prix"].to_f * 100).to_i # ✅ correction ici
        },
        quantity: item["quantite"].to_i # ✅ correction ici aussi
      }
    end

    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: "#{request.base_url}/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "#{request.base_url}/checkout/cancel",
      metadata: {
        user_email: user_info[:email],
        user_name: "#{user_info[:first_name]} #{user_info[:last_name]}"
      }
    )

    render json: { url: session.url }
  rescue => e
    Rails.logger.error "Erreur Stripe : #{e.message}"
    render json: { error: "Une erreur est survenue lors de la création du paiement." }, status: 500
  end
end

def success
  # Affiche une page de confirmation après le paiement Stripe
end