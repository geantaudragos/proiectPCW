Rails.application.routes.draw do

    scope module: 'api' do
      namespace :v1 do

        resources :user do
          collection do
            post 'login'
          end
          get 'data', to: "users#get_data"
          get 'locations', to: "users#get_locations"
          post 'locations', to: "users#save_locations"
          get 'photos', to: "users#get_photos"
          post 'photos', to: "users#save_photos"
          get 'most_traveled_period', to: "users#get_most_traveled_period"
          get 'most_visited_places', to: "users#get_most_visited_places"
          get 'most_visited_cities', to: "users#get_most_visited_cities"
          get 'top_travel_partners', to: "users#get_top_travel_partners"
        end
      end
    end



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
