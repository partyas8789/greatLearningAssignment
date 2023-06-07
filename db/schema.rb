# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_07_091534) do
  create_table "carts", force: :cascade do |t|
    t.integer "quantity"
    t.string "productDetails"
    t.integer "user_id", null: false
    t.integer "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_carts_on_product_id"
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "productrates", force: :cascade do |t|
    t.decimal "rate_of_product"
    t.integer "user_id", null: false
    t.integer "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_productrates_on_product_id"
    t.index ["user_id"], name: "index_productrates_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "title"
    t.decimal "price"
    t.string "description"
    t.string "category"
    t.string "image_link"
    t.decimal "rate"
    t.integer "total_person"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rates", force: :cascade do |t|
    t.decimal "rate"
    t.integer "user_id", null: false
    t.integer "prooduct_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["prooduct_id"], name: "index_rates_on_prooduct_id"
    t.index ["user_id"], name: "index_rates_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.string "rating"
    t.integer "product_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_ratings_on_product_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "carts", "products"
  add_foreign_key "carts", "users"
  add_foreign_key "productrates", "products"
  add_foreign_key "productrates", "users"
  add_foreign_key "rates", "prooducts"
  add_foreign_key "rates", "users"
  add_foreign_key "ratings", "products"
  add_foreign_key "ratings", "users"
end
