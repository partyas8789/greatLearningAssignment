class ProductDetailsController < ApplicationController
    def product_details
        @eachProductDetails = Product.find_by(id: params[:id]) 
    end
end
