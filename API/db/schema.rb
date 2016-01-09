# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20160104082010) do

  create_table "demo_models", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "locations", :force => true do |t|
    t.string   "name"
    t.string   "longitude"
    t.string   "latitude"
    t.datetime "visited_at"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.integer  "user_id",    :precision => 38, :scale => 0
    t.string   "city"
  end

  add_index "locations", ["user_id"], :name => "index_locations_on_user_id"

  create_table "photos", :force => true do |t|
    t.string   "facebook_id"
    t.integer  "user_id",       :precision => 38, :scale => 0
    t.integer  "location_id",   :precision => 38, :scale => 0
    t.datetime "facebook_time"
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
  end

  add_index "photos", ["location_id"], :name => "index_photos_on_location_id"
  add_index "photos", ["user_id"], :name => "index_photos_on_user_id"

  create_table "reviews", :force => true do |t|
    t.string   "type"
    t.integer  "rating",     :precision => 38, :scale => 0
    t.text     "comment"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
  end

  create_table "routes", :force => true do |t|
    t.string   "name"
    t.string   "duration"
    t.string   "type"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "user_photo_links", :force => true do |t|
    t.integer  "user_id",    :precision => 38, :scale => 0
    t.integer  "photo_id",   :precision => 38, :scale => 0
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

end
