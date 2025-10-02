extends Node3D

var fov := [70]
var distance_x := [0]

func _process(delta: float) -> void:
	$Camera3D.look_at($MakotosBigWackyHead.global_position)
	ImGui.Begin("Debug window")
	if ImGui.SliderFloat("FOV", fov, 0, 180):
		$Camera3D.fov = fov[0]
	if ImGui.SliderFloat("Distance", distance_x, -1, 6):
		$Camera3D.position.x = distance_x[0]
	ImGui.End()
