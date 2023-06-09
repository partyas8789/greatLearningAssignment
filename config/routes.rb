Rails.application.routes.draw do
  namespace :api do
    namespace :productrate do
      namespace :v1 do
      resources :productrates, only: [:index, :show, :create, :update, :destroy]
      end
    end
    namespace :rate do
      namespace :v1 do
      resources :rates, only: [:index, :show, :create, :update, :destroy]
      end
    end
    namespace :cart do
      namespace :v1 do
      resources :carts, only: [:index, :show, :create, :update, :destroy]
      end
    end
    namespace :product do
      namespace :v1 do
      resources :products, only: [:index, :show, :create, :update, :destroy]
      end
    end
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
  get "/", :to=> "allproducts#allproducts"
  get "/signin", :to=> "signin#signin"
  get "/signup", :to=> "signup#signup"
  get "/cart", :to=> "cart#cart"
  get "/cart/updatedCart", :to=> "cart#updatedCart"
  get "/allproducts", :to=> "allproducts#allproducts"
  get "/allproducts/filtered_products", :to=> "allproducts#filtered_products"
  get "/allproductsDetails/giverate", :to=> "give_rate#give_rate"
  get "/addnewproduct", :to=> "add_new_product#add_new_product"
  get "/allproductsDetails/:id", :to=> "product_details#product_details"
  get "/:error", :to=> "error_page#error_page"
  get "/:error/:error", :to=> "error_page#error_page"
  get "/:error/:error/:error", :to=> "error_page#error_page"
end
