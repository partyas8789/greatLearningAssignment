class Api::Product::V1::ProductsController < ApplicationController
  def index
    product = Product.all
    render json: product, status: 200
  end
  
  def show
    product = Product.find_by(id: params[:id])
    if product
      render json: product, status: 200
    else
      render json:{
        error: "product not found"
      }
    end
  end

  def create
    product = Product.new(
      title: product_params[:title],
      price: product_params[:price],     
      description: product_params[:description],      
      category: product_params[:category],      
      image_link: product_params[:image_link],      
      rate: product_params[:rate],      
      total_person: product_params[:total_person]      
    )
    if product.save
      render json: product, status: 200
    else
      render json: {
        error: "Error Creating..."
      }
    end
  end

  def update
    product = Product.find_by(id: params[:id])
    if product
      product.update(title: params[:title],
                    price: params[:price],     
                    description: params[:description],      
                    category: params[:category],      
                    image_link: params[:image_link],      
                    rate: params[:rate],      
                    total_person: params[:total_person])
      render json: product, status: 200
    else
      render json:{
        error: "product not found"
      }
    end
  end

  def destroy
  end

  private
  def product_params
    params.require(:product).permit([
      :title,
      :price,
      :description,
      :category,
      :image_link,
      :rate,
      :total_person
    ])
  end
end
