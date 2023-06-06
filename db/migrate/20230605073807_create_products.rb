class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :title
      t.integer :price
      t.string :description
      t.string :category
      t.string :image_link
      t.integer :rate
      t.integer :total_person

      t.timestamps
    end
  end
end
