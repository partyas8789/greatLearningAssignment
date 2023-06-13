class CartController < ApplicationController
    def cart
        @carts = Cart.all
    end
end
