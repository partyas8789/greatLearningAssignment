class Api::Rate::V1::RatesController < ApplicationController
  def index
    rate = Rate.all
    render json: rate
  end

  def show
  end

  def create
    rate = Rate.new(
      rate: rate_params[:rate],     
      user_id: rate_params[:user_id],   
      prooduct_id: rate_params[:prooduct_id]     
    )
    if rate.save
      render json: rate, status: 200
    else
      render json: {
        error: "Error Creating..."
      }
    end
  end

  def update
  end

  def destroy
  end

  private
  def rate_params
    params.require(:rate).permit([
      :rate,
      :user_id,
      :prooduct_id
    ])
  end
end
