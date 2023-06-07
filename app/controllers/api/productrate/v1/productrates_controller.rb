class Api::Productrate::V1::ProductratesController < ApplicationController
  def index
    productrate = Productrate.all
    render json: productrate, status: 200
  end

  def show
  end

  def create
    productrate = Productrate.new(
      rate_of_product: productrate_params[:rate_of_product],     
      user_id: productrate_params[:user_id],   
      product_id: productrate_params[:product_id]   
    )
    if productrate.save
      render json: productrate, status: 200
    else
      render json: {
        error: "Error Creating..."
      }
    end
  end

  def update
  end

  def destroy
    productrate = Productrate.find_by(id: params[:id])
    if productrate
      productrate.destroy
      render json: "productrate deleted successfully", status: 200  
    end
  end

  private
  def productrate_params
    params.require(:productrate).permit([
      :rate_of_product,
      :user_id,
      :product_id
    ])
  end
end
