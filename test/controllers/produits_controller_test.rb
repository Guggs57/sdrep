require "test_helper"

class ProduitsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get produits_index_url
    assert_response :success
  end
end
