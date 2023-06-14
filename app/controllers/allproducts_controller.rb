class AllproductsController < ApplicationController
    before_action :allProduct, only: [:allproducts, :filtered_products]

    def allproducts        
    end
    
    def filtered_products    
        category = params[:category]
        price = params[:price]
        rating = params[:rating]

        if category != "undefined"
            @products = @products.where("category LIKE ? ", "#{category}%")
        end

        if price == "asce"
            @products = @products.order("price ASC")
        end

        if price == "desc"
            @products = @products.order("price DESC")
        end

        case rating 
        when "0"
            @products = @products.where("rate > ?", rating)
        when "1"
            @products = @products.where("rate > ?", rating)
        when "2"
            @products = @products.where("rate > ?", rating)
        when "3"
            @products = @products.where("rate > ?", rating)
        when "4"
            @products = @products.where("rate > ?", rating)
        when "5"
            @products = @products.where("rate > ?", rating)
        end

        partial=render_to_string(partial: "allproducts/partials/productcard")
        render json: { success: true, cards: partial }      
    end 

    private
    def allProduct
        @products = Product.all
    end
end
