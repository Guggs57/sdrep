RailsAdmin.config do |config|
  # ✅ Utilisation de sprockets
  config.asset_source = :sprockets

  # 🔐 Authentification HTTP Basic
  config.authenticate_with do
    authenticate_or_request_with_http_basic('Admin') do |username, password|
      username == ENV["ADMIN_USER"] && password == ENV["ADMIN_PASSWORD"]
    end
  end

  # 🎯 Configuration du modèle Product
  config.model 'Product' do
    edit do
      field :name
      field :description
      field :price
      field :image, :active_storage do
        label "Image du produit"
        help "Téléverse une image depuis ton appareil"
      end
    end

    list do
      field :name
      field :price
      field :image do
        label "Aperçu"
        pretty_value do
          if bindings[:object].image.attached?
            bindings[:view].image_tag(
              bindings[:object].image.variant(resize_to_limit: [100, 100]).processed,
              alt: bindings[:object].name,
              class: 'img-thumbnail'
            )
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
        label "Image"
        pretty_value do
          if bindings[:object].image.attached?
            bindings[:view].image_tag(
              bindings[:object].image.variant(resize_to_limit: [400, 400]).processed,
              alt: bindings[:object].name
            )
          else
            "Aucune image"
          end
        end
      end
    end
  end

  # 📦 Actions disponibles
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
