class CartController < ApplicationController
    def cart
        @carts = Cart.all
    end
    
    def updatedCart
        @carts = Cart.all
        userId = params[:userId]
        @carts = @carts.where("user_id = ?", userId)
        partial=render_to_string(partial: "cart/partials/cartCard")
        render json: { success: true, cards: partial }
        
    end
end
