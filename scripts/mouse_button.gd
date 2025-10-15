extends TextureRect

func set_mouse_color(type: String) -> void:
	if type == 'blue': texture.region.position.x = 10
	if type == 'green': texture.region.position.x = 120
	if type == 'yellow': texture.region.position.x = 230
