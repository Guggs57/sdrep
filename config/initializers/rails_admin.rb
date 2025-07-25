RailsAdmin.config do |config|
  # ✅ On utilise sprockets ici (cohérent avec ta config actuelle)
  config.asset_source = :sprockets

  # 🔐 Authentification via HTTP Basic (sans Devise)
  config.authenticate_with do
    authenticate_or_request_with_http_basic('Admin') do |username, password|
      username == ENV["ADMIN_USER"] && password == ENV["ADMIN_PASSWORD"]
    end
  end

  # 🎯 Configuration spécifique pour le modèle Product
  config.model 'Product' do
    edit do
      field :name
      field :description
      field :price
      field :image, :active_storage
    end

    list do
      field :name
      field :price
      field :image do
        pretty_value do
          if bindings[:object].image.attached?
            bindings[:view].image_tag(bindings[:object].image.variant(resize_to_limit: [100, 100]))
          else
            "Aucune image"
          end
        end
      end
    end

    show do
      field :name
      field :description
      field :price
      field :image do
        pretty_value do
          if bindings[:object].image.attached?
            bindings[:view].image_tag(bindings[:object].image.variant(resize_to_limit: [300, 300]))
          else
            "Aucune image"
          end
        end
      end
    end
  end

  # 📦 Actions disponibles dans l'interface admin
  config.actions do
    dashboard
    index
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end
end
