class User < ActiveRecord::Base
  has_many :photos
  has_many :locations
end
