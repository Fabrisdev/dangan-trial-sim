extends Node3D

var should_show_debug = false
var fov = [0]
var move_camera_freely = [false]

func show_debug_window():
	should_show_debug = true

func _ready() -> void:
	var camera = $"../Camera3D"
	fov[0] = camera.fov

func _process(_delta: float) -> void:
	if not should_show_debug: return
	var camera = $"../Camera3D"
	ImGui.Begin("Debug window")
	ImGui.SeparatorText("Camera")
	if ImGui.SliderFloat("FOV", fov, 0, 180):
		camera.fov = fov[0]
	if ImGui.Checkbox('Move freely', move_camera_freely):
		camera.move_camera_freely(move_camera_freely[0])
	ImGui.Text('Position: ' + str(camera.position))
	ImGui.End()
