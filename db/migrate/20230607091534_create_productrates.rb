class CreateProductrates < ActiveRecord::Migration[7.0]
  def change
    create_table :productrates do |t|
      t.decimal :rate_of_product
      t.references :user, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
