extends TextureRect

func set_mouse_color(type: String) -> void:
	if type == 'blue': texture.region.position.x = 10
	if type == 'green': texture.region.position.x = 120
	if type == 'yellow': texture.region.position.x = 230
	
func _process(delta: float) -> void:
	if get_parent().get_parent().can_skip:
		if modulate.a >= 1: return
		modulate.a += 0.05
	else:
		modulate.a = 0
