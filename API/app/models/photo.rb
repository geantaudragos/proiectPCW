class Photo < ActiveRecord::Base
  belongs_to :user
  has_many :user_photo_links
  has_many :users, :through => :user_photo_links
end