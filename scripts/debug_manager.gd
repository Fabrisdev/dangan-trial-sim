extends Node3D

var should_show_debug = false
var fov = [0]
var distance_x = [0]
var move_camera_freely = [false]

func show_debug_window():
	should_show_debug = true

func _process(_delta: float) -> void:
	if not should_show_debug: return
	ImGui.Begin("Debug window")
	if ImGui.SliderFloat("FOV", fov, 0, 180):
		$"../Camera3D".fov = fov[0]
	if ImGui.SliderFloat("Distance", distance_x, -1, 6):
		$"../Camera3D".position.x = distance_x[0]
	if ImGui.Checkbox('Move camera freely', move_camera_freely):
		pass
	ImGui.End()
