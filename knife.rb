# See http://docs.chef.io/config_rb_knife.html for more information on knife configuration options

current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                "mzemel"
client_key               "#{current_dir}/mzemel.pem"
validation_client_name   "masonbuilt-validator"
validation_key           "#{current_dir}/masonbuilt-validator.pem"
chef_server_url          "https://api.chef.io/organizations/masonbuilt"
cookbook_path            ["#{current_dir}/../cookbooks"]
