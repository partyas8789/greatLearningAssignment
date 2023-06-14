class CartController < ApplicationController
    before_action :allCart, only: [:cart, :updatedCart]
    def cart       
    end
    
    def updatedCart
        userId = params[:userId]
        @carts = @carts.where("user_id = ?", userId)
        partial=render_to_string(partial: "cart/partials/cartCard")
        render json: { success: true, cards: partial }        
    end

    private    
    def allCart
        @carts = Cart.all
    end
end
