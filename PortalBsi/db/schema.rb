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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140928000618) do

  create_table "oportunidades", force: true do |t|
    t.string   "company_name"
    t.string   "title"
    t.string   "description"
    t.date     "expiration_date"
    t.boolean  "is_approved"
    t.boolean  "has_partnership", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "picture"
  end

  create_table "professors", force: true do |t|
    t.string   "nome"
    t.string   "email"
    t.string   "lattes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "tags", force: true do |t|
    t.string   "nome"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tccs", force: true do |t|
    t.string   "titulo"
    t.string   "resumo"
    t.datetime "data"
    t.string   "orientador"
    t.string   "local"
    t.string   "coorientador"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nome_arquivo"
    t.boolean  "apresentado"
    t.integer  "user_id"
    t.string   "arquivo_file_name"
    t.string   "arquivo_content_type"
    t.integer  "arquivo_file_size"
    t.datetime "arquivo_updated_at"
    t.integer  "users_id"
    t.integer  "professor_id"
  end

  add_index "tccs", ["professor_id"], name: "index_tccs_on_professor_id"
  add_index "tccs", ["user_id"], name: "index_tccs_on_user_id"
  add_index "tccs", ["users_id"], name: "index_tccs_on_users_id"

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nome"
    t.string   "apelido"
    t.string   "matricula"
    t.string   "facebook_link"
    t.string   "github_link"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.boolean  "admin"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
