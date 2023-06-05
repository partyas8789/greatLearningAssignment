Rails.application.routes.draw do
  namespace :api do
    namespace :user do
      namespace :v1 do
      resources :users, only: [:index, :show, :create, :update, :destroy]
        
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # root "signup#signup"
  get "/", :to=> "signup#signup"
  get "/signin", :to=> "signin#signin"
  get "/signup", :to=> "signup#signup"
  get "/cart", :to=> "cart#cart"
  get "/allproducts", :to=> "allproducts#allproducts"
  get "/allproductsDetails", :to=> "product_details#product_details"
end
