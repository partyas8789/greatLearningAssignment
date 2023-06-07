class ChangeTypeOfRateInProducts < ActiveRecord::Migration[7.0]
  def change
    change_column :products, :rate, :decimal
  end
end
