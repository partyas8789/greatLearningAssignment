class AllproductsController < ApplicationController
    def allproducts
        @products = Product.all
    end
end
