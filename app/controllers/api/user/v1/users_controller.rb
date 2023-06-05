class Api::User::V1::UsersController < ApplicationController
  def index
    user = User.all
    render json: user, status: 200
  end

  def show
  end

  def create
    user = User.new(
      name: user_params[:name],
      email: user_params[:email],     
      password: user_params[:password]      
    )
    if user.save
      render json: user, status: 200
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
  def user_params
    params.require(:user).permit([
      :name,
      :email,
      :password
    ])
  end
end
