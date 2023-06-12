class User < ApplicationRecord
    has_many :carts
    has_many :productrates

    attribute :role, :string, default: "user"
end
