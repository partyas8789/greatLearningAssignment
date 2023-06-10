class AllproductsController < ApplicationController
    def allproducts
        @products = Product.all
    end
    
    def filtered_products
        @products = Product.all

        category = params[:category]
        price = params[:price]
        rating = params[:rating]

        @products = Product.where("category LIKE ? ", "#{category}%")

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
end
