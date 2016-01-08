class User < ActiveRecord::Base
  has_many :photos, :dependent => :destroy
  has_many :locations, :dependent => :destroy
end
