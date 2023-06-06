class Api::Cart::V1::CartsController < ApplicationController
  def index
    cart = Cart.all
    render json: cart, status: 200
  end

  def show
    cart = Cart.find_by(id: params[:id])
    if cart
      render json: cart, status: 200
    else
      render json:{
        error: "cart not found"
      }
    end
  end

  def create
    cart = Cart.new(
      quantity: cart_params[:quantity],
      productDetails: cart_params[:productDetails],     
      user_id: cart_params[:user_id],   
      product_id: cart_params[:product_id]   
    )
    if cart.save
      render json: cart, status: 200
    else
      render json: {
        error: "Error Creating..."
      }
    end
  end

  def update
    cart = Cart.find_by(id: params[:id])
    if cart
      cart.update(quantity: params[:quantity])
      render json: cart, status: 200
    else
      render json:{
        error: "cart not found"
      }
    end
  end

  def destroy
    cart = Cart.find_by(id: params[:id])
    if cart
      cart.destroy
      render json: "cart deleted successfully", status: 200
    
    end
  end

  private
  def cart_params
    params.require(:cart).permit([
      :quantity,
      :productDetails,
      :user_id,
      :product_id
    ])
  end
end
